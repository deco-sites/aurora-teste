import CareJourneyIsland from "site/islands/Site/care-journey-island.tsx";
import { FnContext } from "deco/types.ts";
import { Device } from "apps/website/matchers/device.ts";

export default function CareJourney({ device }: Device) {
    return <CareJourneyIsland device={device} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
