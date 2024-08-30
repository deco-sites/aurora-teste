import { signal } from "@preact/signals";

const inputs = signal<React.ReactNode[]>(["New Beneficiary"]);
const selectedBeneficiaryInput = signal("somente_eu");

const state = {
  inputs,
  selectedBeneficiaryInput,
};

export const useBeneficiaryInputs = () => state;
