import { ImageWidget } from "apps/admin/widgets.ts";
import LatestNewsIsland from "site/islands/Site/latest-news.tsx";

/** @titleBy title */
export interface New {
    image: ImageWidget;
    altImage: string;
    date: string;
    title: string;
    link: string;
}

export interface Props {
    newsArr: New[];
}

export default function LatestNews({ newsArr }: Props) {
    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col gap-16 lg:w-[1400px] w-full pt-14 pb-16 px-9 lg:px-0">
                    <span className="font-sora text-orange4 text-2xl font-bold lg:pl-14">
                        Últimas Notícias
                    </span>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <LatestNewsIsland newsArr={newsArr} />
                    </div>
                </div>
            </div>
        </>
    );
}
