//Conheça os<br /> diferenciais em<br /> ser Aurora Saúde:
//Conheça os<br /> diferenciais<br /> em ser Aurora<br /> Saúde:

import { Section } from "deco/blocks/section.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import DiscoverDifferencesIsland from "site/islands/Site/discover-differences.tsx";

/** @titleBy text */
export interface Detail {
    icon: ImageWidget;
    text: string;
}

/** @titleBy title */
export interface Card {
    title: string;
    text: string;
    details: Detail[];
    cardColor: "Roxo" | "Laranja" | "Verde" | "Amarelo";
}

export interface DiscoverDifferencesProps {
    section: Section;
    cards: Card[];
}

export default function DiscoverDifferences(
    { section, cards }: DiscoverDifferencesProps,
) {
    return (
        <>
            <div className="flex justify-center bg-gray4 pt-10 lg:pt-20">
                <div className="lg:max-w-[1400px] w-full flex flex-col gap-14">
                    <section.Component {...section.props} />
                    <div className="px-10 lg:px-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 pb-9 lg:pb-28 h-full min-h-[calc(100vh-4rem)]">
                        <DiscoverDifferencesIsland cards={cards} />
                    </div>
                </div>
            </div>
        </>
    );
}
