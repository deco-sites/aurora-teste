import ProgressTracker from "../../components/Simulador/progress-tracker.tsx";
import NextStepBtn from "../../islands/Simulador/next-step-btn.tsx";
import FormTitleH1 from "../../components/Simulador/form-title-h1.tsx";
import PlanCard from "../../islands/Simulador/plan-card.tsx";
import { plansInfos } from "../../helpers/Simulador/plansInfos.ts";
import { whoWillUseThePlan } from "../../helpers/Simulador/whoWillUseThePlan.ts";
import PlanMobileButton from "../../islands/Simulador/PlanMobileButton.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSelectPlanButtons } from "../../sdk/Simulador/useSelectPlanButtons.ts";
import { handleNextStepFourthStep } from "../../sdk/Simulador/FourthStep/checkStepFourFields.ts";
import { plans } from "../../helpers/Simulador/plansCards.ts";
import PreviousStepBtn from "../../islands/Simulador/previous-step-btn.tsx";
import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import changeStep from "../../islands/Simulador/change-step-function.tsx";
import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { CheckFilledRanges } from "site/helpers/Simulador/checkFilledRanges.ts";
import { useUI } from "site/sdk/Simulador/useUI.ts";
import { useStepTwoOption1InputValues } from "site/sdk/Simulador/SecondStepOption1/useStepTwoOption1InputValues.ts";
import getCityCode from "site/actions/getCityCode.ts";
import { useStepTwoOption2InputValues } from "site/sdk/Simulador/SecondStepOption2/useStepTwoOption2InputValues.ts";
import { useSelectPlan } from "site/sdk/Simulador/useSelectPlan.ts";
import LoadinSpinner from "site/components/Simulador/loading-spinner.tsx";

/*interface FormStepFourProps {
  Component: React.ComponentType;
}*/

export default function FormStepFour() {
  const { activeStep } = useFormSteps();
  const { activeOption } = useUI();

  const {
    ufValue,
    cityValue,
  } = useStepTwoOption1InputValues();

  const {
    ufValue2,
    cityValue2,
  } = useStepTwoOption2InputValues();

  //const $PlansDiv = useRef<HTMLDivElement | null>(null);
  const plansDivRef = useRef<HTMLDivElement | null>(null);
  const { activePlanBtn } = useSelectPlanButtons();
  const [isScrolling, setIsScrolling] = useState(false);
  const [loading, setLoading] = useState(false);
  //const transformedArray = useSignal([]);
  const { transformedArray, fetchedPlans } = useSelectPlan();

  const handleScroll = () => {
    if (isScrolling || !plansDivRef.current) return;

    const cards = plansDivRef.current.children;
    const center = plansDivRef.current.scrollLeft +
      plansDivRef.current.clientWidth / 2;

    Array.from(cards).forEach((card, index) => {
      const cardElement = card as HTMLElement; // Asserção de tipo para HTMLElement
      const cardStart = cardElement.offsetLeft;
      const cardEnd = cardStart + cardElement.clientWidth;
      if (center >= cardStart && center <= cardEnd) {
        if (activePlanBtn.value !== transformedArray.value[index].id) {
          activePlanBtn.value = transformedArray.value[index].id;
        }
      }
    });
  };

  function transformData(arr) {
    const returnedArr = arr.map((plan, index) => {
      let color;
      const fetchedPlanName = plan.nome_ans.toLowerCase();
      if (fetchedPlanName.includes("a100")) {
        color = "orange";
      } else if (fetchedPlanName.includes("a300")) {
        color = "green";
      } else if (fetchedPlanName.includes("a500")) {
        color = "yellow";
      } else {
        color = "orange"; // Valor padrão caso nenhuma condição seja atendida
      }

      // Extrai a primeira palavra de `nome_ans`
      let title = plan.nome_ans.split(" ")[0].toLowerCase();

      // Verificar se "enfermaria" ou "apartamento" estão presentes e adicionar ao `title`
      if (plan.nome_ans.toLowerCase().includes("enfermaria")) {
        title += " enfermaria";
      } else if (plan.nome_ans.toLowerCase().includes("apartamento")) {
        title += " apartamento";
      }

      return {
        id: index + 1,
        title: title,
        description: plan.descricao_produto,
        segmentation: plan.acomodacao,
        coverage: plan.cobertura,
        coparticipation: plan.copay ? "com Copay" : "sem Copay",
        accommodation: "-", // Ajuste conforme necessário
        price: plan.a_partir_de.toFixed(2), // Converte o preço para string com duas casas decimais
        color: color,
        cd_plano: plan.cd_plano,
        register_ans: plan.registro_ans,
      };
    });

    //console.log("returnedArr", returnedArr);
    return returnedArr;
  }

  const handleGetPlans = async () => {
    //console.log("Chamou a handleGetPlans");
    const minRange = CheckFilledRanges(); //Essa função retorna a menor idade preenchida
    //console.log("Menor idade no meu componente", minRange);
    //console.log("Opção selecionada na primeira tela:", activeOption.value);

    //console.log("Cidade selecionada", cityValue.value.toUpperCase());

    // Definir a cidade selecionada com base no valor de activeOption.value
    let selectedCity;
    if (activeOption.value === 1) {
      selectedCity = cityValue.value.toUpperCase();
    } else if (activeOption.value === 2 || activeOption.value === 3) {
      selectedCity = cityValue2.value.toUpperCase();
    } else {
      console.error("Opção inválida para activeOption.value");
      return; // Saia da função se a opção for inválida
    }

    const city_code = await invoke.site.actions.getCityCode({
      selectedCity: selectedCity,
    });
    //console.log("Código da cidade selecionada", city_code.data[0].cd_cidade);

    const plan_type = activeOption.value === 1 ? 3 : 2;
    setLoading(true);

    try {
      const fetchedPlans = await invoke.site.actions.getPlans({
        age_range: minRange,
        plan_type: plan_type,
        city_code: city_code.data[0].cd_cidade,
      });
      transformedArray.value = transformData(fetchedPlans.data);
      //console.log("fetchedPlans", fetchedPlans);
    } catch (error) {
      console.error("Erro ao buscar os planos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPlans();
  }, []);

  useEffect(() => {
    const div = plansDivRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, [isScrolling]);

  const scrollToCard = (id: number) => {
    const index = transformedArray.value.findIndex((plan) => plan.id === id);
    if (index !== -1 && plansDivRef.current) {
      const card = plansDivRef.current.children[index] as HTMLElement; // Asserção de tipo para HTMLElement
      setIsScrolling(true);
      plansDivRef.current.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
      setTimeout(() => setIsScrolling(false), 500); // Ajuste o tempo conforme necessário
    }
  };

  useEffect(() => {
    const index = transformedArray.value.findIndex((plan) =>
      plan.id === activePlanBtn.value
    );
    if (index !== -1 && plansDivRef.current) {
      const card = plansDivRef.current.children[index] as HTMLElement; // Asserção de tipo para HTMLElement
      const cardStart = card.offsetLeft;
      const cardEnd = cardStart + card.clientWidth;
      const center = plansDivRef.current.scrollLeft +
        plansDivRef.current.clientWidth / 2;
      if (!(center >= cardStart && center <= cardEnd)) {
        scrollToCard(activePlanBtn.value);
      }
    }
  }, [activePlanBtn.value]);

  //console.log("transformedArray final", transformedArray.value);

  return (
    <>
      <div className="flex justify-center lg:width-calc mt-32">
        <div className="flex gap-6 lg:w-[1400px] overflow-x-hidden">
          <div className="bg-white lg:bg-gray1 rounded-2xl lg:px-8 lg:pb-8 w-full">
            <div className="fixed z-50 bg-white lg:bg-gray1 overflow-x-auto lg:overflow-x-visible pl-8 lg:pl-0 w-screen lg:max-w-[1368px] scrollbar-none rounded-tr-[20px]">
              <ProgressTracker currentStep={4} />
            </div>

            <div className="flex flex-col gap-4 lg:px-0 mt-40 lg:mt-44 w-screen lg:w-auto">
              <div className="pl-8 lg:pl-0 mb-12">
                <FormTitleH1 text1={"Escolha seu plano"} />
              </div>

              {loading && (
                <div className="h-full w-full flex justify-center items-center">
                  <div className="flex justify-center items-center">
                    <LoadinSpinner />
                  </div>
                </div>
              )}
              {!loading && (
                <>
                  <div
                    ref={plansDivRef}
                    className="flex px-8 lg:pl-0 gap-4 overflow-x-scroll lg:grid lg:grid-cols-2 lg:gap-10 scrollbar-none snap-mandatory snap-x"
                  >
                    {transformedArray.value.map((item) => (
                      <PlanCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        segmentation={item.segmentation}
                        coverage={item.coverage}
                        coparticipation={item.coparticipation}
                        accommodation={item.accommodation}
                        price={item.price}
                        color={item.color}
                        scrollToCard={scrollToCard}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col p-8 lg:hidden">
                    <FormTitleH1 text1="Selecione o seu plano" />
                    {/*ref={$PlansDiv}    scrolledDiv={$PlansDiv}*/}
                    <div className="grid grid-cols-2 gap-2">
                      {plans.map((plan) => (
                        <PlanMobileButton
                          key={plan.id}
                          text1={plan.text1}
                          text2={plan.text2}
                          id={plan.id}
                          color={plan.color}
                          scrollToCard={scrollToCard}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/*<Component />*/}

              <div className="flex gap-4 justify-center py-14 px-8 lg:justify-between lg:px-0">
                <PreviousStepBtn
                  options={whoWillUseThePlan}
                  executionFunc={() => changeStep(activeStep.value, "decrease")}
                />

                <NextStepBtn
                  options={whoWillUseThePlan}
                  executionFunc={handleNextStepFourthStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
