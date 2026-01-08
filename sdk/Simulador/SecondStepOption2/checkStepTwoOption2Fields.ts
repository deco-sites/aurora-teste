import { useStepTwoOption2InputValues } from "./useStepTwoOption2InputValues.ts";
import { useFormSteps } from "../useFormSteps.ts";

const { activeStep, changeStep } = useFormSteps();

const {
  socialReasonValue,
  name2Value,
  tel2Value,
  email2Value,

  socialReasonError,
  name2Error,
  tel2Error,
  email2Error,
} = useStepTwoOption2InputValues();

export const CheckFields = () => {
  //activeStep.value - É o passo atual do formulário
  //activeOption.value - É a opção escolhida no primeiro step

  //console.log("Razão Social", socialReasonValue.value);
  //console.log("Nome2", name2Value.value);
  //console.log("Tel2", tel2Value.value);
  //console.log("Email2", email2Value.value);

  changeStep(activeStep.value, "increase");
};

export const handleNextStepSecondStepOp2 = () => {
  // Se o passo atual é 1, sempre permita avançar
  if (activeStep.value === 1) {
    changeStep(activeStep.value, "increase");
    return;
  }

  // Validação dos campos do passo atual
  if (activeStep.value === 2) {
    socialReasonValue.value.trim() === ""
      ? socialReasonError.value = true
      : socialReasonError.value = false;

    name2Value.value.trim() === ""
      ? name2Error.value = true
      : name2Error.value = false;

    tel2Value.value.trim() === ""
      ? tel2Error.value = true
      : tel2Error.value = false;

    email2Value.value.trim() === ""
      ? email2Error.value = true
      : email2Error.value = false;

    // Se todos os campos do passo 2 estão preenchidos, avance para o próximo passo
    if (
      socialReasonError.value === false && name2Error.value === false &&
      tel2Error.value === false && email2Error.value === false
    ) {
      changeStep(activeStep.value, "increase");
    }
  }

  // Adicione outras validações para passos adicionais conforme necessário
  // if (activeStep.value === 3) {
  //   // validações para o passo 3
  // }
};
