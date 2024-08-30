import { signal } from "@preact/signals";

const socialReasonValue4 = signal("");
const cnpjValue4 = signal("");
const nameValue4 = signal("");
const emailValue4 = signal("");
const telValue4 = signal("");
const lifesqtyValue4 = signal("");
const ufValue4 = signal("");
const cityValue4 = signal("");

const socialReasonError4 = signal(false);
const cnpjError4 = signal(false);
const nameError4 = signal(false);
const emailError4 = signal(false);
const telError4 = signal(false);
const lifesqtyError4 = signal(false);
const ufError4 = signal(false);
const cityError4 = signal(false);

const state = {
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
};

export const useFourthStepInputValues = () => state;
