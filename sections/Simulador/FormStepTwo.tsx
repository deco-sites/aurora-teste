import FormTitleH1 from "../../components/Simulador/form-title-h1.tsx";
import ProgressTracker from "../../components/Simulador/progress-tracker.tsx";
import NextStepBtn from "../../islands/Simulador/next-step-btn.tsx";
import {
  handleNextStepSecondStepOp1,
} from "../../sdk/Simulador/SecondStepOption1/checkStepTwoOption1Fields.ts";

import { handleNextStepSecondStepOp2 } from "../../sdk/Simulador/SecondStepOption2/checkStepTwoOption2Fields.ts";
import { useUI } from "../../sdk/Simulador/useUI.ts";
import PreviousStepBtn from "../../islands/Simulador/previous-step-btn.tsx";
import changeStep from "../../islands/Simulador/change-step-function.tsx";
import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";

interface FormStepTwoProps {
  Component: React.ComponentType;
}

export default function FormStepTwo({ Component }: FormStepTwoProps) {
  const { activeStep } = useFormSteps();

  const alreadyhaveplanoptions = [
    { value: "option1", text: "Opção 1" },
    { value: "option2", text: "Opção 2" },
    { value: "option3", text: "Opção 3" },
  ];

  const { activeOption } = useUI();

  //console.log("TESTE 1 - BOTÃO VOLTAR", activeStep.value);
  return (
    <>
      <div className="flex justify-center lg:width-calc mt-28 lg:mt-32">
        <div className="flex gap-6 lg:w-[1400px] overflow-x-hidden">
          <div className="bg-white lg:bg-gray1 rounded-2xl lg:px-8 lg:pb-8 w-full">
            <div className="fixed z-50 bg-white lg:bg-gray1 overflow-x-auto lg:overflow-x-visible pl-8 lg:pl-0 w-screen lg:max-w-[1368px] scrollbar-none rounded-tr-[20px]">
              <ProgressTracker currentStep={2} />
            </div>
            <div className="flex flex-col gap-4 px-8 lg:px-0 mt-32 lg:mt-36">
              <FormTitleH1
                text1={"Faça a simulação para você"}
                text2={"ou para outra pessoa."}
              />

              {<Component />}
            </div>
            <div className="flex gap-4 justify-center py-14 px-8 lg:justify-between lg:px-0">
              <PreviousStepBtn
                options={alreadyhaveplanoptions}
                executionFunc={() => changeStep(activeStep.value, "decrease")}
              />

              <NextStepBtn
                options={alreadyhaveplanoptions}
                executionFunc={activeOption.value === 1
                  ? handleNextStepSecondStepOp1
                  : handleNextStepSecondStepOp2}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
