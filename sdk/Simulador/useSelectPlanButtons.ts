import { signal } from "@preact/signals";

const activePlanBtn = signal(1);

const state = {
  activePlanBtn,
};

export const useSelectPlanButtons = () => state;
