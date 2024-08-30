import { signal } from "@preact/signals";

interface Beneficiary {
  id: number;
  name: string;
  range: string;
  qty: number;
}

interface IThirdStepSchema {
  whoUseThePlan: string;
  beneficiariesValuesArr: Beneficiary[];
  idsWithEmptyRange: number[];
  filledBeneficiaries: Beneficiary[];
  lessThirtyLives: boolean;
}

export const thirdStepSchema: IThirdStepSchema = {
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

//SecondStep Option 1
const thirdStepSignal = signal(thirdStepSchema);
const idsWithEmptyRange = signal<number[]>([]);
const filledBeneficiaries = signal<Beneficiary[]>([]);
const lessThirtyLives = signal(false);

const state = {
  thirdStepSignal,
  idsWithEmptyRange,
  filledBeneficiaries,
  lessThirtyLives,
};

export const useStepThreeInputValues = () => state;
