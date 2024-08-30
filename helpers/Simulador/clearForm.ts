import { useStepTwoOption1InputValues } from "site/sdk/Simulador/SecondStepOption1/useStepTwoOption1InputValues.ts";
import { useStepTwoOption2InputValues } from "site/sdk/Simulador/SecondStepOption2/useStepTwoOption2InputValues.ts";
import {
    thirdStepSchema,
    useStepThreeInputValues,
} from "site/sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";
import { useFourthStepInputValues } from "site/sdk/Simulador/FourthStep/useFourthStepInputValues.ts";
import { useSelectPlanButtons } from "site/sdk/Simulador/useSelectPlanButtons.ts";
import { useSelectPlan } from "site/sdk/Simulador/useSelectPlan.ts";
import { useCdLead } from "site/sdk/Simulador/useCdLead.ts";

export default function ClearForm() {
    //console.log("Limpando os campos do formulário");

    const { cd_lead, cd_lead_dep } = useCdLead();
    cd_lead.value = 0;
    cd_lead_dep.value = {};

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

    nameValue.value = "";
    cpfValue.value = "";
    emailValue.value = "";
    telValue.value = "";
    ufValue.value = "";
    cityValue.value = "";
    ageRangeValue.value = "";
    alreadyHavePlanValue.value = "";
    nameError.value = false;
    cpfError.value = false;
    emailError.value = false;
    telError.value = false;
    ufError.value = false;
    cityError.value = false;
    ageRangeError.value = false;
    alreadyHavePlanError.value = false;

    const {
        socialReasonValue,
        name2Value,
        ufValue2,
        cityValue2,
        tel2Value,
        email2Value,

        socialReasonError,
        name2Error,
        ufError2,
        cityError2,
        tel2Error,
        email2Error,
    } = useStepTwoOption2InputValues();

    socialReasonValue.value = "";
    name2Value.value = "";
    ufValue2.value = "";
    cityValue2.value = "";
    tel2Value.value = "";
    email2Value.value = "";
    socialReasonError.value = false;
    name2Error.value = false;
    ufError2.value = false;
    cityError2.value = false;
    tel2Error.value = false;
    email2Error.value = false;

    const {
        thirdStepSignal,
        idsWithEmptyRange,
        filledBeneficiaries,
        lessThirtyLives,
    } = useStepThreeInputValues();

    thirdStepSignal.value = {
        whoUseThePlan: "somente_eu",
        beneficiariesValuesArr: [{
            id: 1,
            name: "agerange-1",
            range: "",
            qty: 1,
        }],
        idsWithEmptyRange: [],
        filledBeneficiaries: [],
        lessThirtyLives: false,
    };
    idsWithEmptyRange.value = [];
    filledBeneficiaries.value = [];
    lessThirtyLives.value = false;

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

    socialReasonValue4.value = "";
    cnpjValue4.value = "";
    nameValue4.value = "";
    emailValue4.value = "";
    telValue4.value = "";
    lifesqtyValue4.value = "";
    ufValue4.value = "";
    cityValue4.value = "";

    socialReasonError4.value = false;
    cnpjError4.value = false;
    nameError4.value = false;
    emailError4.value = false;
    telError4.value = false;
    lifesqtyError4.value = false;
    ufError4.value = false;
    cityError4.value = false;

    const { activePlanBtn } = useSelectPlanButtons();
    activePlanBtn.value = 1;

    const { selectedPlan } = useSelectPlan();
    selectedPlan.value = 1;
}
