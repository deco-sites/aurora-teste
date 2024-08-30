import { signal } from "@preact/signals";

const cd_lead = signal(0);
const cd_lead_dep = signal({});

const state = {
    cd_lead,
    cd_lead_dep,
};

export const useCdLead = () => state;
