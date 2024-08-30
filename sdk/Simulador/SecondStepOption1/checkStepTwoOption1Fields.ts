import { useStepTwoOption1InputValues } from "./useStepTwoOption1InputValues.ts";
import { useFormSteps } from "../useFormSteps.ts";

const { activeStep, changeStep } = useFormSteps();

const {
  nameValue,
  cpfValue,
  emailValue,
  telValue,
  ufValue,
  cityValue,
  ageRangeValue,
  alreadyHavePlanValue,

  nameError,
  cpfError,
  emailError,
  telError,
  ufError,
  cityError,
  ageRangeError,
  alreadyHavePlanError,
} = useStepTwoOption1InputValues();

export const CheckFields = () => {
  //activeStep.value - É o passo atual do formulário
  //activeOption.value - É a opção escolhida no primeiro step

  //console.log("Nome", nameValue.value);
  //console.log("CPF:", cpfValue.value);
  //console.log("Email", emailValue.value);
  //console.log("Tel", telValue.value);
  //console.log("UF", ufValue.value);
  //console.log("Cidade", cityValue.value);
  //console.log("Faixa Etária", ageRangeValue.value);
  //console.log("Possui plano", alreadyHavePlanValue.value);

  if (activeStep.value === 1) changeStep(activeStep.value, "increase");

  nameValue.value.trim() === ""
    ? nameError.value = true
    : nameError.value = false;

  cpfValue.value.trim() === "" ? cpfError.value = true : cpfError.value = false;

  emailValue.value.trim() === ""
    ? emailError.value = true
    : emailError.value = false;

  telValue.value.trim() === "" ? telError.value = true : telError.value = false;

  if (
    nameError.value === false && cpfError.value === false &&
    emailError.value === false &&
    telError.value === false
  ) {
    changeStep(activeStep.value, "increase");
  }
};

export const handleNextStepSecondStepOp1 = () => {
  // Se o passo atual é 1, sempre permita avançar
  if (activeStep.value === 1) {
    changeStep(activeStep.value, "increase");
    return;
  }

  // Validação dos campos do passo atual
  if (activeStep.value === 2) {
    nameValue.value.trim() === ""
      ? nameError.value = true
      : nameError.value = false;

    cpfValue.value.trim() === ""
      ? cpfError.value = true
      : cpfError.value = false;

    emailValue.value.trim() === ""
      ? emailError.value = true
      : emailError.value = false;

    telValue.value.trim() === ""
      ? telError.value = true
      : telError.value = false;

    ufValue.value.trim() === "" ? ufError.value = true : ufError.value = false;

    cityValue.value.trim() === ""
      ? cityError.value = true
      : cityError.value = false;

    ageRangeValue.value.trim() === ""
      ? ageRangeError.value = true
      : ageRangeError.value = false;

    alreadyHavePlanValue.value.trim() === ""
      ? alreadyHavePlanError.value = true
      : alreadyHavePlanError.value = false;

    // Se todos os campos do passo 2 estão preenchidos, avance para o próximo passo
    if (
      nameError.value === false && cpfError.value === false &&
      emailError.value === false &&
      telError.value === false && ufError.value === false &&
      cityError.value === false &&
      ageRangeError.value === false && alreadyHavePlanError.value === false
    ) {
      changeStep(activeStep.value, "increase");
    }
  }

  // Adicione outras validações para passos adicionais conforme necessário
  // if (activeStep.value === 3) {
  //   // validações para o passo 3
  // }
};

/*const handlePreviousStep = () => {
  if (activeStep.value > 1) {
    changeStep(activeStep.value, "decrease");
  }
};*/
