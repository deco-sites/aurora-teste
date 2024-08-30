import { ImageWidget } from "apps/admin/widgets.ts";

import { FnContext } from "deco/types.ts";
import { Device } from "apps/website/matchers/device.ts";
import OverlaidVideoSectionIsland from "site/islands/Site/overlaid-video-section.tsx";

export interface Banner {
    /** @description desktop optimized image */
    desktop: {
        image: ImageWidget;
        width?: number;
        height?: number;
    };
    /** @description mobile optimized image */
    mobile: {
        image: ImageWidget;
        width?: number;
        height?: number;
    };
    /** @description Image's alt text */
    alt: string;
}

export interface Props {
    image: Banner;
    title: string;
}

export interface OverlaidVideoSectionProps {
    image: Banner;
    title: string;
    device: Device;
}

export default function OverlaidVideoSection(
    { image, title, device }: OverlaidVideoSectionProps,
) {
    return (
        <OverlaidVideoSectionIsland
            image={image}
            title={title}
            device={device}
        />
    );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
