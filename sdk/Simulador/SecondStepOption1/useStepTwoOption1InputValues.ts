import { signal } from "@preact/signals";

const nameValue = signal("");
const cpfValue = signal("");
const emailValue = signal("");
const telValue = signal("");
const ufValue = signal("");
const cityValue = signal("");
const ageRangeValue = signal("");
const alreadyHavePlanValue = signal("");

const nameError = signal(false);
const cpfError = signal(false);
const emailError = signal(false);
const telError = signal(false);
const ufError = signal(false);
const cityError = signal(false);
const ageRangeError = signal(false);
const alreadyHavePlanError = signal(false);

const state = {
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
};

export const useStepTwoOption1InputValues = () => state;
