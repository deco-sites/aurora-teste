import { signal } from "@preact/signals";

//const selectedPlan = signal<number[]>([1]);
const selectedPlan = signal(1);
const transformedArray = signal([]);

const state = {
  selectedPlan,
  transformedArray,
};

export const useSelectPlan = () => state;
