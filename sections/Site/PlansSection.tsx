import PlansSectionIsland from "site/islands/Site/plans-section.tsx";
import { FnContext } from "deco/types.ts";

/** @titleBy name */
export interface IHospital {
    name: string;
    a100: boolean;
    a300: boolean;
    a500: boolean;
}

/** @titleBy region */
export interface HospitalsByRegion {
    region: string;
    a100Price: string;
    a300Price: string;
    a500Price: string;
    hospitals: IHospital[];
}

export interface Props {
    a100Coverage: string;
    a300Coverage: string;
    a500Coverage: string;
    regions: HospitalsByRegion[];
}

export default function PlansSection(
    props: ReturnType<typeof loader>,
) {
    return (
        <PlansSectionIsland
            a100Coverage={props.a100Coverage}
            a300Coverage={props.a300Coverage}
            a500Coverage={props.a500Coverage}
            regions={props.regions}
            cities={props.cities}
        />
    );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    const cities = props.regions.map((region) => (region.region));
    //console.log("cities loader", cities);
    return {
        ...props,
        cities,
    };
};
