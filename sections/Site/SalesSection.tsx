import SalesSectionIsland from "site/islands/Site/sales-section.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";

export interface Material {
    date: string;
    name: string;
    category: string;
    city: string;
    link: string;
}

export interface Section {
    id: number;
    label: string;
    textColor: "text-white" | "text-pink1";
    bgColor:
        | "bg-orange1"
        | "bg-pink1"
        | "bg-purple"
        | "bg-aquagreen"
        | "bg-yellow";
    materials: Material[];
}

export interface Props {
    sections: Section[];
}

export interface ISalesSectionProps {
    sections: Section[];
    device: Device;
}

export default function SalesSection({ sections, device }: ISalesSectionProps) {
    return <SalesSectionIsland sections={sections} device={device} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
