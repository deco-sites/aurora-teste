import PrivacyPoliciesIsland from "site/islands/Site/privacy-policies.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";

export interface Props {
    sections: Section[];
}

export interface PrivacyPoliciesProps {
    sections: Section[];
    device: Device;
}

/** @titleBy sectionName */
export interface Section {
    sectionName: string;
    /**
     * @format rich-text
     * @description Conteúdo da seção
     */
    sectionText: string;
}

export default function PrivacyPolicies(
    { sections, device }: PrivacyPoliciesProps,
) {
    return <PrivacyPoliciesIsland sections={sections} device={device} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
