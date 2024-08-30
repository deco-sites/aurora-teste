import { signal } from "@preact/signals";
import changeStep from "../../islands/Simulador/change-step-function.tsx";

const activeStep = signal(1);
const StepComponent = signal(null);

const state = {
  activeStep,
  changeStep,
  StepComponent,
};

export const useFormSteps = () => state;
