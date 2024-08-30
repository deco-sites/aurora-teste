import { ImageWidget } from "apps/admin/widgets.ts";
import NewsSectionIsland from "site/islands/Site/news-section.tsx";

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

export default function NewsSection({ newsArr }: Props) {
    return (
        <>
            <div className="flex justify-center bg-white">
                <div className="lg:max-w-[1400px] w-full pt-12 lg:pb-16 lg:py-16 flex flex-col">
                    <div className="lg:mt-16 flex flex-col gap-10 px-10 lg:px-0 pb-10 lg:pb-0">
                        <span className="block lg:hidden font-sora font-bold text-2xl text-orange4">
                            Últimas Notícias
                        </span>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
                            <NewsSectionIsland newsArr={newsArr} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
