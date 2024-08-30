import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";
import DpoPageIsland from "site/islands/Site/dpo-page.tsx";

/** @titleBy sectionName */
export interface Section {
    sectionName: string;
    sectionTitle: string;
    /**
     * @format rich-text
     * @description Conteúdo da seção
     */
    sectionText: string;
}

export interface DpoPageProps {
    sections: Section[];
    device: Device;
}

export interface Props {
    sections: Section[];
}

export default function DpoPage({ sections, device }: DpoPageProps) {
    return <DpoPageIsland sections={sections} device={device} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
