import { useFormSteps } from "../useFormSteps.ts";
import { useFourthStepInputValues } from "site/sdk/Simulador/FourthStep/useFourthStepInputValues.ts";

const { activeStep, changeStep } = useFormSteps();

export const handleNextStepFourthStep = () => {
  const {
    socialReasonValue4,
    cnpjValue4,
    nameValue4,
    emailValue4,
    telValue4,
    lifesqtyValue4,
    ufValue4,
    cityValue4,

    socialReasonError4,
    cnpjError4,
    nameError4,
    emailError4,
    telError4,
    lifesqtyError4,
    ufError4,
    cityError4,
  } = useFourthStepInputValues();

  //console.log("Verificação quarto passo", activePlanBtn.value);

  changeStep(activeStep.value, "increase");

  // Validação dos campos do passo atual
  {
    /*
    if (activeStep.value === 3) {
        selectedBeneficiaryInput.value.trim() === "option1"
            ? whoUseThePlanError.value = true
            : whoUseThePlanError.value = false;

        // Se todos os campos do passo 2 estão preenchidos, avance para o próximo passo
        if (
            whoUseThePlanError.value === false
        ) {
            changeStep(activeStep.value, "increase");
        }
    }*/
  }
};
