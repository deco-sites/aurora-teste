import { signal } from "@preact/signals";

const ageRangesSignal = signal([]);
const ufsSignal = signal([]);

const state = {
    ageRangesSignal,
    ufsSignal,
};

export const useLoaderInfos = () => state;
