import Image from "apps/website/components/Image.tsx";
import { useUI } from "../../sdk/Simulador/useUI.ts";
import { signal, useSignal } from "@preact/signals";
import { useFormSteps } from "site/sdk/Simulador/useFormSteps.ts";
import ClearForm from "site/helpers/Simulador/clearForm.ts";
import { useStepTwoOption1InputValues } from "site/sdk/Simulador/SecondStepOption1/useStepTwoOption1InputValues.ts";
import { getCityCode } from "site/helpers/Simulador/getCityCode.ts";
import { getAgeRangeCodeFunction } from "site/helpers/Simulador/getAgeRangeCode.ts";
import { extractNumbers } from "site/helpers/Simulador/extractNumbers.ts";
import { invoke } from "../../runtime.ts";
import { useStepTwoOption2InputValues } from "site/sdk/Simulador/SecondStepOption2/useStepTwoOption2InputValues.ts";
import { useStepThreeInputValues } from "site/sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";
import { useEffect, useState } from "preact/hooks";
import { useCdLead } from "site/sdk/Simulador/useCdLead.ts";
import { useSelectPlan } from "site/sdk/Simulador/useSelectPlan.ts";

interface INextStep {
  executionFunc?: () => void;
}

export const previousActiveOption = signal(1);

export default function NextStepBtn({ options, executionFunc }: INextStep) { //Aqui era passado como primeira prop "options", mas não sei pq
  const { activeOption } = useUI();
  const { activeStep } = useFormSteps();
  //const { activeStep, changeStep } = useFormSteps();

  const {
    nameValue,
    cpfValue,
    emailValue,
    telValue,
    ufValue,
    cityValue,
    ageRangeValue,
    alreadyHavePlanValue,
  } = useStepTwoOption1InputValues();

  const {
    socialReasonValue,
    name2Value,
    ufValue2,
    cityValue2,
    tel2Value,
    email2Value,
  } = useStepTwoOption2InputValues();

  const {
    thirdStepSignal,
  } = useStepThreeInputValues();

  const cd_cidade = signal(0);
  async function fetchCityCode(value: string) {
    const cityCode = await getCityCode(value);
    cd_cidade.value = cityCode;
    console.log("CD_CIDADE AQUI ERICK", cd_cidade.value);
  }

  const cd_range = signal(0);
  async function fetchAgeRangeCode(value: string) {
    const ageRangeCode = await getAgeRangeCodeFunction(value);
    cd_range.value = ageRangeCode;
    console.log("CD_FAIXA AQUI ERICK", cd_range.value);
  }

  const { cd_lead, cd_lead_dep } = useCdLead();
  const dependentsArr = useSignal([]);
  //const cd_lead = useSignal(0);

  const { selectedPlan, transformedArray } = useSelectPlan();
  const cd_plano = useSignal(0);
  const rangesArr = useSignal<string[]>([]);
  const cd_tab_preco = useSignal(0);

  return (
    <button
      className="bg-orange1 lg:bg-transparent rounded-full flex items-center justify-center px-8 py-3 lg:p-0 gap-2 lg:gap-6"
      onClick={async (e) => {
        //console.log(e);
        //console.log("clicou", activeOption.value);
        //console.log("envio p servidor", options[activeOption.value - 1]);
        //console.log("aqqui", options);
        //CheckFields();

        if (executionFunc) {
          executionFunc();
        }

        //O if abaixo é responsável por resetar os campos do formulário quando altero a opção escolhida na primeira tela
        if (previousActiveOption.value !== activeOption.value) {
          ClearForm();
        }

        //O if abaixo checa se estamos indo pro segundo passo e guarda o valor da opção escolhida na primeira tela em outra variável
        if (
          activeStep.value === 2 &&
          (previousActiveOption.value !== activeOption.value)
        ) {
          previousActiveOption.value = activeOption.value;
          //console.log("Passou pro step2", previousActiveOption.value);
        }

        //Salvando informações da tela Sobre você na opção Você e sua Família
        if (activeStep.value === 3 && activeOption.value === 1) {
          //Se o usuário ainda não foi inserido no banco iserre a primeira vez
          await fetchCityCode(cityValue.value);
          await fetchAgeRangeCode(ageRangeValue.value);

          const lead_data = {
            nome: nameValue.value,
            cpf_cnpj: extractNumbers(cpfValue.value),
            cidade: cd_cidade.value,
            estado: ufValue.value,
            telefone: extractNumbers(telValue.value),
            email: emailValue.value,
            possui_plano: alreadyHavePlanValue.value === "yes" ? true : false,
            cd_faixa: cd_range.value,
          };

          if (cd_lead.value === 0) {
            console.log("Usuário inserido primeira vez");
            const leadSaved = await invoke.site.actions.saveStep2Option1({
              leadToSave: lead_data,
            });
            cd_lead.value = leadSaved.data?.[0].cd_lead;
            console.log("Código retornado:", cd_lead.value);
          } else {
            //faz o update do usuário já inserido
            console.log("Fazer update");
            await invoke.site.actions.updateLead({
              dataToUpdate: lead_data,
              leadId: cd_lead.value,
            });
          }
        }

        //Salvando informações da tela Sobre você nas opções 2 e 3 MEI
        if (
          activeStep.value === 3 && activeOption.value === 2 ||
          activeOption.value === 3
        ) {
          await fetchCityCode(cityValue2.value);

          const lead_data = {
            razao_social: socialReasonValue.value,
            nome: name2Value.value,
            //cpf_cnpj: extractNumbers(cpfValue.value),
            estado: ufValue2.value,
            cidade: cd_cidade.value,
            telefone: extractNumbers(tel2Value.value),
            email: email2Value.value,
          };

          //Se o usuário ainda não existe no banco
          if (cd_lead.value === 0) {
            const leadSaved = await invoke.site.actions.saveStep2Option2({
              leadToSave: lead_data,
            });
            cd_lead.value = leadSaved.data?.[0].cd_lead;
            console.log("Código retornado:", cd_lead.value);
          } else {
            //Se já existe, faz o update
            //faz o update do usuário já inserido
            console.log("Fazer update", lead_data, cd_lead.value);
            await invoke.site.actions.updateLead({
              dataToUpdate: lead_data,
              leadId: cd_lead.value,
            });
          }
        }

        //Salvando informações da tela Beneficiários na opção Você e sua família
        if (
          activeStep.value === 4 &&
          activeOption.value === 1
        ) {
          const lead_data = {
            somente_titular:
              thirdStepSignal.value.whoUseThePlan === "somente_eu"
                ? true
                : false,
            outra_pessoa: thirdStepSignal.value.whoUseThePlan === "outra_pessoa"
              ? true
              : false,
          };

          //Aqui eu atualizo a informação somente_eu e outra_pessoa para true ou false
          await invoke.site.actions.updateLead({
            dataToUpdate: lead_data,
            leadId: cd_lead.value,
          });

          //Se a resposta for outra_pessoa ou eu_e_meus_dependentes, salva os leads
          if (thirdStepSignal.value.whoUseThePlan !== "somente_eu") {
            console.log(
              "Array dos benefíciários para salvar:",
              thirdStepSignal.value.beneficiariesValuesArr,
            );

            const dependentsArr = await Promise.all(
              thirdStepSignal.value.beneficiariesValuesArr.map(
                async (dependent) => {
                  const dependent_range = await getAgeRangeCodeFunction(
                    dependent.range,
                  );

                  return {
                    cd_faixa: dependent_range,
                    quantidade: dependent.qty,
                    cd_lead: cd_lead.value,
                  };
                },
              ),
            );

            console.log("Array de dependentes transformado:", dependentsArr);

            //Se aida não inseriu dependentes
            if (!cd_lead_dep.value?.data) {
              console.log("Insere dependentes 1 vez");
              cd_lead_dep.value = await invoke.site.actions.saveLeadDependents({
                dependentLead: dependentsArr,
              });
              {
                /*
              console.log(
                "Códigos dos dependentes salvos",
                cd_lead_dep.value.data,
              );*/
              }
            } else {
              console.log("Atualiza dependentes");
              await invoke.site.actions.updateDependents({
                dependentLead: dependentsArr,
                leadId: cd_lead.value,
              });
            }
          }
        }

        //Salvando as informações da tela Beneficiários nas opções 2 e 3 MEI
        if (
          activeStep.value === 4 && activeOption.value === 2 ||
          activeOption.value === 3
        ) {
          console.log(
            "Array de Bene",
            thirdStepSignal.value.beneficiariesValuesArr,
          );

          const dependentsArr = await Promise.all(
            thirdStepSignal.value.beneficiariesValuesArr.map(
              async (dependent) => {
                const dependent_range = await getAgeRangeCodeFunction(
                  dependent.range,
                );

                return {
                  cd_faixa: dependent_range,
                  quantidade: dependent.qty,
                  cd_lead: cd_lead.value,
                };
              },
            ),
          );

          console.log("Array de dependentes 2 transformado:", dependentsArr);
          //Se não salvou ainda dependentes, salva pela 1 vez
          if (!cd_lead_dep.value?.data) {
            console.log("Salvou pela 1 vez");
            cd_lead_dep.value = await invoke.site.actions.saveLeadDependents({
              dependentLead: dependentsArr,
            });
          } else {
            console.log("Atualiza dependentes");
            await invoke.site.actions.updateDependents({
              dependentLead: dependentsArr,
              leadId: cd_lead.value,
            });
          }
        }

        //Salvando as informações da tela de escolha do plano da opção Você e sua família
        if (activeStep.value === 5 && activeOption.value === 1) {
          console.log("Entrou aqui lindo", selectedPlan.value);
          console.log("transformedArr", transformedArray.value);
          //leads salvar cd_plano e cd_tab_preco
          //lead_dependente salvar cd_tab_preco

          const selectedPlanObject = transformedArray.value.find(
            (plan) => plan.id === selectedPlan.value,
          );

          // Capturando cd_plano
          if (selectedPlanObject) {
            cd_plano.value = selectedPlanObject.cd_plano;
          } else {
            console.error(
              "Plano não encontrado para o id:",
              selectedPlan.value,
            );
          }
          console.log("cd_plano.value:", cd_plano.value);

          //Capturando cd_tab_preco
          console.log("Idade de quem preencheu:", ageRangeValue.value);
          console.log(
            "Idades no array",
            thirdStepSignal.value.beneficiariesValuesArr,
          );

          if (thirdStepSignal.value.whoUseThePlan === "somente_eu") {
            rangesArr.value = [ageRangeValue.value];
          } else {
            rangesArr.value = [
              ageRangeValue.value,
              ...thirdStepSignal.value.beneficiariesValuesArr.map(
                (beneficiary) => beneficiary.range,
              ),
            ];
          }

          console.log("rangesArr:", rangesArr.value);

          const prices = await invoke.site.actions.getPrices({
            plan_code: cd_plano.value,
            ageranges: rangesArr.value,
          });

          console.log("Prices:", prices.data);

          cd_tab_preco.value = prices.data.find((el) =>
            el.faixa === ageRangeValue.value
          );

          console.log("CD_TAB:", cd_tab_preco.value.cd_tab_preco);

          const leadToUpdate = {
            cd_plano: cd_plano.value,
            cd_tab_preco: cd_tab_preco.value.cd_tab_preco,
          };

          //Aqui eu atualizo o cd_plano e cd_tab_preco na tabela leads
          await invoke.site.actions.updateLead({
            dataToUpdate: leadToUpdate,
            leadId: cd_lead.value,
          });

          //Aqui eu atualizo cd_tab_preco na lead_dependente
          console.log("To mexendo aqui:", cd_lead_dep.value.data);
          console.log("Mexendo no prices", prices.data);

          const resultArray = await Promise.all(
            cd_lead_dep.value.data.map(async (item) => {
              // Obtenha o código da faixa usando a função assíncrona
              const correspondingPrice = await Promise.all(
                prices.data.map(async (priceItem) => {
                  const code = await getAgeRangeCodeFunction(priceItem.faixa);
                  return code === item.cd_faixa
                    ? priceItem.cd_tab_preco
                    : undefined;
                }),
              );

              // Filtra os valores undefined
              const validPrice = correspondingPrice.find((price) =>
                price !== undefined
              );

              // Retorne o novo objeto com cd_lead_dep e cd_tab_preco
              return {
                cd_lead_dep: item.cd_lead_dep,
                cd_tab_preco: validPrice || null, // se não encontrar, retorna null
              };
            }),
          );

          console.log("ResultArray", resultArray);

          await invoke.site.actions.realUpdateDependents({
            dependentsToUpdate: resultArray,
          });
        }

        //Salvando as informações da tela de escolha do plano das opções 2 e 3 Mei
        if (
          activeStep.value === 5 && activeOption.value === 2 ||
          activeOption.value === 3
        ) {
          console.log("Entrou nesse if aki Erick");
          console.log("transformedArr", transformedArray.value);

          const selectedPlanObject = transformedArray.value.find(
            (plan) => plan.id === selectedPlan.value,
          );

          // Capturando cd_plano
          if (selectedPlanObject) {
            cd_plano.value = selectedPlanObject.cd_plano;
          } else {
            console.error(
              "Plano não encontrado para o id:",
              selectedPlan.value,
            );
          }
          console.log("cd_plano.value:", cd_plano.value);

          const leadToUpdate = {
            cd_plano: cd_plano.value,
          };

          //Atualizando cd_plano na tabela leads
          await invoke.site.actions.updateLead({
            dataToUpdate: leadToUpdate,
            leadId: cd_lead.value,
          });

          //Capturando cd_tab_preco dos dependentes
          console.log(
            "Idades no array",
            thirdStepSignal.value.beneficiariesValuesArr,
          );

          rangesArr.value = [
            ageRangeValue.value,
            ...thirdStepSignal.value.beneficiariesValuesArr.map(
              (beneficiary) => beneficiary.range,
            ),
          ];

          console.log("rangesArr:", rangesArr.value);

          const prices = await invoke.site.actions.getPrices({
            plan_code: cd_plano.value,
            ageranges: rangesArr.value,
          });

          console.log("Prices:", prices.data);
          console.log("CD_LEAD_DEP:", cd_lead_dep.value.data);

          const resultArray = await Promise.all(
            cd_lead_dep.value.data.map(async (item) => {
              // Obtenha o código da faixa usando a função assíncrona
              const correspondingPrice = await Promise.all(
                prices.data.map(async (priceItem) => {
                  const code = await getAgeRangeCodeFunction(priceItem.faixa);
                  return code === item.cd_faixa
                    ? priceItem.cd_tab_preco
                    : undefined;
                }),
              );

              // Filtra os valores undefined
              const validPrice = correspondingPrice.find((price) =>
                price !== undefined
              );

              // Retorne o novo objeto com cd_lead_dep e cd_tab_preco
              return {
                cd_lead_dep: item.cd_lead_dep,
                cd_tab_preco: validPrice || null, // se não encontrar, retorna null
              };
            }),
          );
          console.log("Resultado final", resultArray);

          await invoke.site.actions.realUpdateDependents({
            dependentsToUpdate: resultArray,
          });
        }

        //changeStep(activeStep.value, "increase"); //ESSE É O QUE ESTAVA FUNCIONANDO PERFEITAMENTE
        //changeStep(currentStep + 1, e);
        //console.log(activeOption); //Dou um console.log na opção escolhida inicialmente
      }}
    >
      <span className="text-white lg:text-orange1">Próximo</span>
      <div className="bg-orange1 rounded-full w-9 h-9 flex items-center justify-center">
        <Image
          src={"/Simulador/arrow-right-icon.png"}
          alt=""
          className="w-6"
          width=""
          height=""
        />
      </div>
    </button>
  );
}
