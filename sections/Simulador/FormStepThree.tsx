import ProgressTracker from "../../components/Simulador/progress-tracker.tsx";
import NextStepBtn from "../../islands/Simulador/next-step-btn.tsx";
import { whoWillUseThePlan } from "../../helpers/Simulador/whoWillUseThePlan.ts";
import { handleNextStepThirdStep } from "../../sdk/Simulador/ThirdStep/checkStepThreeFields.ts";
import PreviousStepBtn from "../../islands/Simulador/previous-step-btn.tsx";
import changeStep from "../../islands/Simulador/change-step-function.tsx";
import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";

interface FormStepTwoProps {
  Component: React.ComponentType;
}

const { activeStep } = useFormSteps();

export default function FormStepThree({ Component }: FormStepTwoProps) {
  return (
    <>
      <div className="flex justify-center lg:width-calc mt-32">
        <div className="flex gap-6 lg:w-[1400px] overflow-x-hidden">
          <div className="bg-white lg:bg-gray1 rounded-2xl lg:px-8 lg:pb-8 w-full">
            <div className="fixed z-50 bg-white lg:bg-gray1 overflow-x-auto lg:overflow-x-visible pl-8 lg:pl-0 w-screen lg:max-w-[1368px] scrollbar-none rounded-tr-[20px]">
              <ProgressTracker currentStep={3} />
            </div>
            <div className="flex flex-col gap-4 px-8 lg:px-0 mt-40 lg:mt-44">
              {<Component />}
            </div>
            <div className="flex gap-4 justify-center py-14 px-8 lg:justify-between lg:px-0">
              <PreviousStepBtn
                options={whoWillUseThePlan}
                executionFunc={() => changeStep(activeStep.value, "decrease")}
              />
              <NextStepBtn
                options={whoWillUseThePlan}
                executionFunc={handleNextStepThirdStep}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
