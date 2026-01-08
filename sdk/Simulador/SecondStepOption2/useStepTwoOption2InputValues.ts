import { signal } from "@preact/signals";

//SecondStep Option 1
const socialReasonValue = signal("");
const name2Value = signal("");
const ufValue2 = signal("");
const cityValue2 = signal("");
const tel2Value = signal("");
const email2Value = signal("");

const socialReasonError = signal(false);
const name2Error = signal(false);
const ufError2 = signal(false);
const cityError2 = signal(false);
const tel2Error = signal(false);
const email2Error = signal(false);

const state = {
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
};

export const useStepTwoOption2InputValues = () => state;
