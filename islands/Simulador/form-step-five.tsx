import ProgressTracker from "../../components/Simulador/progress-tracker.tsx";
import FormTitleH1 from "../../components/Simulador/form-title-h1.tsx";
import SelectedPlan from "../../islands/Simulador/selected-plan.tsx";
import SelectedPlanDetails from "../../components/Simulador/selected-plan-details.tsx";
import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import NewSimulationButton from "../../islands/Simulador/new-simulation-btn.tsx";
import ReceiveContactButton from "../../islands/Simulador/receive-contact-btn.tsx";
import PreviousStepBtn from "../../islands/Simulador/previous-step-btn.tsx";
import { whoWillUseThePlan } from "../../helpers/Simulador/whoWillUseThePlan.ts";
import { useUI } from "../../sdk/Simulador/useUI.ts";
import { useStepTwoOption1InputValues } from "../../sdk/Simulador/SecondStepOption1/useStepTwoOption1InputValues.ts";
import { useStepTwoOption2InputValues } from "../../sdk/Simulador/SecondStepOption2/useStepTwoOption2InputValues.ts";
import { useStepThreeInputValues } from "../../sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";
import { useSelectPlanButtons } from "../../sdk/Simulador/useSelectPlanButtons.ts";
import { plansInfos } from "../../helpers/Simulador/plansInfos.ts";
import { useSelectPlan } from "site/sdk/Simulador/useSelectPlan.ts";
import { useEffect, useMemo, useState } from "preact/hooks";
import getPrices from "site/actions/getPrices.ts";
import { invoke } from "../../runtime.ts";
import { signal, useSignal, useSignalEffect } from "@preact/signals";
import { extractNumbers } from "site/helpers/Simulador/extractNumbers.ts";
import { getCityCode } from "site/helpers/Simulador/getCityCode.ts";
import { useLoaderInfos } from "site/sdk/Simulador/useLoaderInfos.ts";
import LoadinSpinner from "site/components/Simulador/loading-spinner.tsx";

export default function FormStepFiveIsland() {
    const fetchedPrices = useSignal(null);
    const [loading, setLoading] = useState(false);
    const filledRanges = signal([]);
    const cd_plano = useSignal(0);
    const { activeStep, changeStep } = useFormSteps();

    const { activeOption } = useUI(); //Step 1

    const {
        nameValue,
        cpfValue,
        emailValue,
        telValue,
        ufValue,
        cityValue,
        ageRangeValue,
        alreadyHavePlanValue,
    } = useStepTwoOption1InputValues(); //Step 2

    {
        /*
    console.log(
        "Step2",
        nameValue.value,
        emailValue.value,
        telValue.value,
        cityValue.value,
        ageRangeValue.value,
        alreadyHavePlanValue.value,
    );*/
    }

    //Step 2 option 2
    const {
        socialReasonValue,
        name2Value,
        ufValue2,
        cityValue2,
        tel2Value,
        email2Value,
    } = useStepTwoOption2InputValues();

    {
        /*
    console.log(
        "step2 option 2",
        socialReasonValue.value,
        name2Value.value,
        tel2Value.value,
        email2Value.value,
    );*/
    }

    const {
        thirdStepSignal,
    } = useStepThreeInputValues(); //Step 3
    {
        /*
    console.log(
        "step 3",
        thirdStepSignal.value.whoUseThePlan,
        thirdStepSignal.value.beneficiariesValuesArr,
    );*/
    }

    const { activePlanBtn } = useSelectPlanButtons(); //Step 4
    //console.log("Step4", activePlanBtn.value);

    const { selectedPlan, transformedArray } = useSelectPlan();

    //console.log("Opção escolhida na primeira tela:", activeOption.value);
    //console.log("Estado digitado na segunda tela:", ufValue.value);
    //console.log("Cidade digitada na segunda tela:", cityValue.value);
    //console.log("Estado digitado na segunda tela:", ufValue2.value);
    //console.log("Cidade digitada na segunda tela:", cityValue2.value);
    //console.log("Idade selecionada na segunda tela:", ageRangeValue.value);
    //console.log("Quem utilizará o plano:", thirdStepSignal.value.whoUseThePlan);
    //console.log("Array de Beneficiários:", thirdStepSignal.value.beneficiariesValuesArr);
    //console.log("Id do plano selecionado:", selectedPlan.value);
    //console.log("Planos puxados do banco:", transformedArray.value);

    // Primeiro useEffect para atualizar cd_plano e filledRanges
    useEffect(() => {
        const selectedPlanObject = transformedArray.value.find(
            (plan) => plan.id === selectedPlan.value,
        );

        if (selectedPlanObject) {
            cd_plano.value = selectedPlanObject.cd_plano;
            //console.log("CD_PLANO", cd_plano.value);
        } else {
            console.log("Plano não encontrado");
        }

        filledRanges.value = thirdStepSignal.value.beneficiariesValuesArr.map(
            (item) => item.range,
        );
        filledRanges.value = [...new Set(filledRanges.value)];
        //console.log("Array de idades no formato que preciso", filledRanges.value);
    }, [selectedPlan.value, transformedArray.value, thirdStepSignal.value]);

    // Segundo useEffect para chamar fetchPrices quando cd_plano e filledRanges estiverem prontos
    useEffect(() => {
        if (cd_plano.value && filledRanges.value.length > 0) {
            fetchPrices();
        }
    }, [cd_plano.value, filledRanges.value]);

    async function fetchPrices() {
        setLoading(true);

        try {
            const prices = await invoke.site.actions.getPrices({
                plan_code: cd_plano.value,
                ageranges:
                    (thirdStepSignal.value.whoUseThePlan === "somente_eu" &&
                            activeOption.value === 1)
                        ? [ageRangeValue.value]
                        : filledRanges.value,
            });

            //console.log("AQUI ESTÃO OS PRICES:", prices.data);

            {
                /*
            const pricesWithRanges = prices.data.map((price, index) => ({
                ...price,
                range: filledRanges.value[index], // Associa o range correspondente
            }));*/
            }

            fetchedPrices.value = prices.data;
            //console.log("Fetched Prices antes do update:", fetchedPrices.value);
            updatePricesBasedOnRange(fetchedPrices.value);
            //console.log("Fetched Prices:", fetchedPrices.value);
        } catch (error) {
            console.error("Erro ao buscar preços:", error);
        } finally {
            setLoading(false);
        }
    }

    // Condicional para renderizar o conteúdo após carregar os preços
    if (loading) {
        return (
            <div className="flex justify-center lg:width-calc mt-32">
                <div className="flex gap-6 lg:w-[1400px]">
                    <div className="bg-white lg:bg-gray1 rounded-2xl lg:p-8 w-full flex justify-center items-center">
                        <LoadinSpinner />
                    </div>
                </div>
            </div>
        );
    }

    const zeroTo18Prices = useSignal<number | null>(null);
    const nineteenTo23Prices = useSignal<number | null>(null);
    const twentyFourTo28Prices = useSignal<number | null>(null);
    const twentyNineTo33Prices = useSignal<number | null>(null);
    const thirtyFourTo38Prices = useSignal<number | null>(null);
    const thirtyNineTo43Prices = useSignal<number | null>(null);
    const fortyFourTo48Prices = useSignal<number | null>(null);
    const fortyNineTo53Prices = useSignal<number | null>(null);
    const fiftyFourTo58Prices = useSignal<number | null>(null);
    const fiftyNinePlusPrices = useSignal<number | null>(null);

    function updatePricesBasedOnRange(fetchedPrices) {
        fetchedPrices.forEach((priceObj) => {
            //console.log("priceObj:", priceObj);
            switch (priceObj.faixa) {
                case "0 a 18 anos":
                    zeroTo18Prices.value = priceObj.valor_mensalidade;
                    break;
                case "19 a 23 anos":
                    nineteenTo23Prices.value = priceObj.valor_mensalidade;
                    break;
                case "24 a 28 anos":
                    twentyFourTo28Prices.value = priceObj.valor_mensalidade;
                    break;
                case "29 a 33 anos":
                    twentyNineTo33Prices.value = priceObj.valor_mensalidade;
                    break;
                case "34 a 38 anos":
                    thirtyFourTo38Prices.value = priceObj.valor_mensalidade;
                    break;
                case "39 a 43 anos":
                    thirtyNineTo43Prices.value = priceObj.valor_mensalidade;
                    break;
                case "44 a 48 anos":
                    fortyFourTo48Prices.value = priceObj.valor_mensalidade;
                    break;
                case "49 a 53 anos":
                    fortyNineTo53Prices.value = priceObj.valor_mensalidade;
                    break;
                case "54 a 58 anos":
                    fiftyFourTo58Prices.value = priceObj.valor_mensalidade;
                    break;
                case "59 anos ou mais":
                    fiftyNinePlusPrices.value = priceObj.valor_mensalidade;
                    break;
                default:
                    console.warn(
                        `Faixa etária não reconhecida: ${priceObj.range}`,
                    );
            }
        });
    }

    const propertyPrice = useSignal<number | null>(null);

    const selectedObject = transformedArray.value.find(
        (plan) => plan?.id === selectedPlan.value,
    );
    propertyPrice.value = selectedObject?.price;

    //console.log("Faixa de preço da idade de quem preencheu:", propertyPrice.value);
    //console.log("Fetched Prices:", fetchedPrices.value);
    //console.log("Preço 0-18:", zeroTo18Prices.value);
    //console.log("Preço 19-23:", nineteenTo23Prices.value);
    //console.log("Preço 24-28:", twentyFourTo28Prices.value);
    //console.log("Preço 29-33:", twentyNineTo33Prices.value);
    //console.log("Preço 34-38:", thirtyFourTo38Prices.value);
    //console.log("Preço 39-43:", thirtyNineTo43Prices.value);
    //console.log("Preço 44-48:", fortyFourTo48Prices.value);
    //console.log("Preço 49-53:", fortyNineTo53Prices.value);
    //console.log("Preço 54-58:", fiftyFourTo58Prices.value);
    //console.log("Preço 59-mais:", fiftyNinePlusPrices.value);

    const priceRanges = {
        propertyPrice,
        zeroTo18Prices,
        nineteenTo23Prices,
        twentyFourTo28Prices,
        twentyNineTo33Prices,
        thirtyFourTo38Prices,
        thirtyNineTo43Prices,
        fortyFourTo48Prices,
        fortyNineTo53Prices,
        fiftyFourTo58Prices,
        fiftyNinePlusPrices,
    };

    const totalvalueBeneficiaries = sumTotalofBeneficiaries(
        thirdStepSignal.value.beneficiariesValuesArr,
        fetchedPrices.value,
    );

    const cd_tab_preco = signal(null);
    const cd_faixa = useSignal(null);
    const { ageRangesSignal, ufsSignal } = useLoaderInfos();
    //console.log("Aqui tenho as faixas e códigos", ageRangesSignal.value);
    //console.log("Aqui tenho a idade do usuário", ageRangeValue.value);
    cd_faixa.value = ageRangesSignal.value.find((range) =>
        range.value === ageRangeValue.value
    );
    //console.log("Código da faixa do usuário", cd_faixa.value.cd_faixa);

    function sumTotalofBeneficiaries(beneficiaries, prices) {
        //console.log("Array de Beneficiários:", thirdStepSignal.value.beneficiariesValuesArr);
        //console.log("Fetched Prices dentro da função:", fetchedPrices.value);
        //console.log("CD_TAB_PRECO:", fetchedPrices.value?.[0].cd_tab_preco);
        //cd_tab_preco.value = fetchedPrices.value?.[0].cd_tab_preco;

        // Primeiro, criar um objeto para armazenar a soma total de beneficiários por faixa etária
        const totalBeneficiariesByRange = beneficiaries.reduce(
            (acc, beneficiary) => {
                // Se a faixa já existir no acumulador, somar o qty
                if (acc[beneficiary.range]) {
                    acc[beneficiary.range] += beneficiary.qty;
                } else {
                    // Se a faixa não existir, inicializar com o qty atual
                    acc[beneficiary.range] = beneficiary.qty;
                }
                return acc;
            },
            {},
        );

        //console.log("totalBeneficiariesByRange:", totalBeneficiariesByRange);

        // Agora, calcular o valor total somando os preços multiplicados pelos totais de beneficiários
        const totalValue = Object.keys(totalBeneficiariesByRange).reduce(
            (total, range) => {
                // Encontrar o preço correspondente para essa faixa etária
                const priceObj = prices?.find((price) => price.faixa === range);
                if (priceObj) {
                    // Multiplicar o valor da mensalidade pela quantidade total de beneficiários
                    total += priceObj.valor_mensalidade *
                        totalBeneficiariesByRange[range];
                }
                return total;
            },
            0,
        );

        // Retornar o valor total calculado
        return totalValue;
    }

    function returnTotalValue() {
        if (activeOption.value === 1) {
            if (thirdStepSignal.value.whoUseThePlan === "somente_eu") {
                return propertyPrice.value;
            } else if (
                thirdStepSignal.value.whoUseThePlan === "eu_e_meus_dependentes"
            ) {
                return Number(propertyPrice.value) +
                    Number(totalvalueBeneficiaries);
            } else if (thirdStepSignal.value.whoUseThePlan === "outra_pessoa") {
                return totalvalueBeneficiaries;
            }
        } else {
            return totalvalueBeneficiaries;
        }
    }
    const finalValue = returnTotalValue();
    //console.log("Valor total dos beneficiários:", finalValue);

    const cd_cidade = useSignal(null);
    useEffect(() => {
        async function fetchCityCode() {
            let cityCode;
            if (activeOption.value === 1) {
                cityCode = await getCityCode(cityValue.value);
            } else if (activeOption.value === 2 || activeOption.value === 3) {
                cityCode = await getCityCode(cityValue2.value);
            }
            cd_cidade.value = cityCode;
            //console.log("CD_CIDADE AQUI ERICK", cd_cidade.value);
        }

        fetchCityCode();
    }, [activeOption.value, cityValue.value, cityValue2.value]);

    const mainLead = {
        nome: activeOption.value === 1
            ? nameValue.value
            : activeOption.value === 2 || activeOption.value === 3
            ? name2Value.value
            : null,
        cpf_cnpj: activeOption.value === 1
            ? extractNumbers(cpfValue.value)
            : null,
        razao_social: activeOption.value === 2 || activeOption.value === 3
            ? socialReasonValue.value
            : null,
        cidade: cd_cidade.value,
        estado: activeOption.value === 1
            ? ufValue.value
            : activeOption.value === 2 || activeOption.value === 3
            ? ufValue2.value
            : null,
        telefone: activeOption.value === 1
            ? extractNumbers(telValue.value)
            : activeOption.value === 2 || activeOption.value === 3
            ? extractNumbers(tel2Value.value)
            : null,
        email: activeOption.value === 1
            ? emailValue.value
            : activeOption.value === 2 || activeOption.value === 3
            ? email2Value.value
            : null,
        cd_plano: cd_plano.value,
        somente_titular: thirdStepSignal.value.whoUseThePlan === "somente_eu"
            ? true
            : false,
        possui_plano: alreadyHavePlanValue.value === "yes" ? true : false,
        cd_faixa: activeOption.value === 1 ? cd_faixa.value?.cd_faixa : null,
        cd_tab_preco: fetchedPrices.value?.[0].cd_tab_preco,
        outra_pessoa: thirdStepSignal.value.whoUseThePlan === "outra_pessoa"
            ? true
            : false,
    };

    //Montando o array de dependentes para salvar no banco
    {
        /*
    const lead_dependents = useSignal([]);
    useEffect(() => {
        thirdStepSignal.value.beneficiariesValuesArr.forEach((dependent) => {
            const dependentRange = ageRangesSignal.value.find((range) =>
                range.value === dependent.range
            );
            console.log("DEPENDENT RANGE", dependent.range);

            // Encontrando o preço correspondente à faixa de idade
            const priceData = fetchedPrices.value.find((price) =>
                price.faixa === dependent.range
            );

            const newDependent = {
                cd_faixa: dependentRange.cd_faixa,
                quantidade: dependent.qty,
                //cd_lead: 1,
                cd_tab_preco: priceData ? priceData.cd_tab_preco : null,
            };
            lead_dependents.value = [...lead_dependents.value, newDependent];
        });

        console.log("SALVAR DEPENDENTE", lead_dependents.value);
        console.log("CODIGOS TAB PRECO:", fetchedPrices.value);
    }, [fetchedPrices.value]);*/
    }

    function createLeadDependents() {
        const lead_dependents = [];
        thirdStepSignal.value.beneficiariesValuesArr
            .forEach((dependent) => {
                const dependentRange = ageRangesSignal.value.find((range) =>
                    range.value === dependent.range
                );
                //console.log("DEPENDENT RANGE", dependent.range);

                // Encontrando o preço correspondente à faixa de idade
                const priceData = fetchedPrices.value?.find((price) =>
                    price.faixa === dependent.range
                );

                const newDependent = {
                    cd_faixa: dependentRange?.cd_faixa,
                    quantidade: dependent.qty,
                    //cd_lead: 1,
                    cd_tab_preco: priceData ? priceData.cd_tab_preco : null,
                };
                lead_dependents.push(newDependent);
            });
        return lead_dependents;
    }
    const leads_dependents = createLeadDependents();

    return (
        <>
            {/*<Component />*/}

            <div className="flex justify-center lg:width-calc mt-32">
                <div className="flex gap-6 lg:w-[1400px] overflow-x-hidden">
                    <div className="bg-white lg:bg-gray1 rounded-2xl lg:px-8 lg:pb-8 w-full">
                        <div className="fixed z-50 bg-white lg:bg-gray1 overflow-x-auto lg:overflow-x-visible pl-8 lg:pl-0 w-screen lg:max-w-[1368px] scrollbar-none rounded-tr-[20px]">
                            <ProgressTracker currentStep={5} />
                        </div>
                        <div className="flex flex-col gap-4 lg:gap-0 px-8 lg:px-0 mt-40 lg:mt-44 w-screen lg:w-auto">
                            <div className="mb-16">
                                {/*{fetchedPrices.value.data[0].valor_mensalidade}*/}
                                <FormTitleH1 text1={"Seu plano"} />
                            </div>

                            <SelectedPlan
                                selectedPlanName={plansInfos[
                                    activePlanBtn.value - 1
                                ].title}
                                totalValue={finalValue}
                                fetchedPrices={fetchedPrices}
                                propertyPrice={propertyPrice}
                            />
                            <SelectedPlanDetails
                                simulationType={activeOption.value}
                                name={nameValue.value}
                                email={emailValue.value}
                                alreadyHavePlan={alreadyHavePlanValue.value}
                                whoUseThePlan={thirdStepSignal.value
                                    .whoUseThePlan}
                                beneficiariesArr={thirdStepSignal.value
                                    .beneficiariesValuesArr}
                                priceRanges={priceRanges}
                            />
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                {
                                    /*<button
                onClick={(e) => {
                  changeStep(activeStep.value, "increase");
                  //changeStep(currentStep + 1, e);
                  //console.log(activeOption); //Dou um console.log na opção escolhida inicialmente
                }}
                className="flex items-center gap-8 bg-orange1 rounded-full text-white text-left px-12 py-4 text-sm"
              >
                <img
                  src={"/yellow-phone-icon.png"}
                  alt="Icon"
                  className="w-7"
                />
                Receber contato de <br /> um especialista
              </button>*/
                                }
                                <PreviousStepBtn
                                    options={whoWillUseThePlan}
                                    executionFunc={() =>
                                        changeStep(
                                            activeStep.value,
                                            "decrease",
                                        )}
                                />
                                <div className="flex flex-col lg:flex-row justify-end gap-8 my-8">
                                    <ReceiveContactButton
                                        number={activeStep.value}
                                        mission={"increase"}
                                        leadToSave={mainLead}
                                        dependentLead={leads_dependents}
                                        whoUseThePlan={thirdStepSignal.value
                                            .whoUseThePlan}
                                        activeOption={activeOption.value}
                                    />
                                    <NewSimulationButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
