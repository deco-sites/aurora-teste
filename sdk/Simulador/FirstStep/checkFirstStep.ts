import { useFormSteps } from "../useFormSteps.ts";

const { activeStep, changeStep } = useFormSteps();

export const handleNextStepFirstStep = () => {
  if (activeStep.value === 1) changeStep(activeStep.value, "increase");
};
