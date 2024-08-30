import IAmANewBeneficiaryIsland from "site/islands/Site/i-am-a-new-beneficiary.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";
import { Section } from "deco/blocks/section.ts";

export interface Props {
    segments: Segment[];
}

export interface IAmANewBeneficiaryProps {
    segments: Segment[];
    device: Device;
}

/** @titleBy dataCel1 */
export interface Line {
    dataCel1: string;
    dataCel2: string;
}

export interface Table {
    column1Name?: string;
    column2Name?: string;
    line?: Line[];
    textBehindTable?: string;
}

/** @titleBy topicTitle */
export interface Topic {
    topicTitle: string;
    /**
     * @format rich-text
     * @description Conteúdo da seção
     */
    topicText: string;
    //childrenComponent?: Section;
    hasTable?: boolean;
    table?: Table;
}

/** @titleBy segmentName */
export interface Segment {
    segmentName: string;
    topics: Topic[];
}

export default function IAmANewBeneficiary(
    { segments, device }: IAmANewBeneficiaryProps,
) {
    return <IAmANewBeneficiaryIsland segments={segments} device={device} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
