import { ImageWidget } from "apps/admin/widgets.ts";
import DiscoverOurPlansIsland from "site/islands/Site/discover-our-plans.tsx";

/** @titleBy phrase */
export interface Benefit {
    phrase: string;
}

/** @titleBy planName */
export interface Plan {
    cardImage: ImageWidget;
    planName: string;
    benefits: Benefit[];
    basePrice: string;
    bgColor: "Laranja" | "Amarelo" | "Verde" | "Cinza";
    textColor: "Amarelo" | "Branco" | "Laranja" | "Rosa" | "Verde";
    titleColor: "Amarelo" | "Rosa";
    buttonTextColor: "Amarelo" | "Verde" | "Laranja";
    buttonBgColor: "Amarelo" | "Laranja";
}

export interface Props {
    sectionTitle: string;
    plans: Plan[];
}

export default function DiscoverOurPlans({ sectionTitle, plans }: Props) {
    return <DiscoverOurPlansIsland sectionTitle={sectionTitle} plans={plans} />;
}
