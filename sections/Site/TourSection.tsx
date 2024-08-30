import TourSectionIsland from "site/islands/Site/tour-section.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";

/** @titleBy itemText */
export interface Item {
    itemText: string;
}

/** @titleBy buttonText */
export interface Button {
    buttonText: string;
    buttonLink: string;
}

export interface Division {
    /**
     * @format rich-text
     * @description Texto da seção
     */
    text: string;
    items: Item[];
    buttonsSectionTitle?: string;
    buttons: Button[];
    /**
     * @format rich-text
     * @description Texto da seção
     */
    finalText?: string;
}

/** @titleBy sectionName */
export interface Section {
    sectionName: string;
    divisions: Division[];
}

export interface TourSectionProps {
    sections: Section[];
    device: Device;
}

export interface Props {
    sections: Section[];
}

export default function TourSection({ sections, device }: TourSectionProps) {
    return <TourSectionIsland sections={sections} device={device} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
