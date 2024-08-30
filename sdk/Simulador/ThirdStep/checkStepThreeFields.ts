import { useFormSteps } from "site/sdk/Simulador/useFormSteps.ts";
import { useUI } from "site/sdk/Simulador/useUI.ts";
import { useStepThreeInputValues } from "site/sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";

const { activeStep, changeStep } = useFormSteps();

const {
  thirdStepSignal,
  idsWithEmptyRange,
  filledBeneficiaries,
  lessThirtyLives,
} = useStepThreeInputValues();

const { activeOption } = useUI();

export const checkSingleSelect = (id: number) => {
  idsWithEmptyRange.value = idsWithEmptyRange.value.filter((el) => id !== el);
};

export const checkFieldsForThirdStep = () => {
  filledBeneficiaries.value = thirdStepSignal.value.beneficiariesValuesArr
    .filter((el) => el.range !== "");

  const totalQty = filledBeneficiaries.value.reduce(
    (sum, item) => sum + item.qty,
    0,
  );

  if (activeOption.value === 3 && totalQty < 30) {
    lessThirtyLives.value = true;
  } else {
    lessThirtyLives.value = false;
  }

  if (activeStep.value === 3) {
    idsWithEmptyRange.value = thirdStepSignal.value
      .beneficiariesValuesArr
      .filter((item) => item.range === "")
      .map((item) => item.id);
  }
};

export const handleNextStepThirdStep = () => {
  if (
    thirdStepSignal.value.whoUseThePlan !== "somente_eu" ||
    activeOption.value !== 1
  ) {
    checkFieldsForThirdStep();
  }

  //TO-DO

  if (
    (activeOption.value === 2 && idsWithEmptyRange.value.length === 0) ||
    (activeOption.value === 1 &&
      thirdStepSignal.value.whoUseThePlan === "somente_eu") ||
    (activeOption.value === 1 && idsWithEmptyRange.value.length === 0) ||
    (activeOption.value === 3 && idsWithEmptyRange.value.length === 0 &&
      lessThirtyLives.value === false)
  ) {
    changeStep(activeStep.value, "increase");
  }

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
