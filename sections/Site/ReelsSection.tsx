import { ImageWidget } from "apps/admin/widgets.ts";
import type { Video as LiveVideo } from "deco-sites/std/components/types.ts";
import ReelsSectionIsland from "site/islands/Site/reels-section.tsx";

/** @titleBy title */
export interface Banner {
    image: ImageWidget;
    video: LiveVideo;
    alt: string;
    title: string;
    description: string;
}

export interface Props {
    cards: Banner[];
}

export default function ReelsSection({ cards }: Props) {
    return (
        <>
            <div className="hidden lg:flex justify-center pt-8 pb-12 lg:pt-20  bg-orange4 lg:bg-gradient-to-b from-orange4 to-darkPurple">
                <div className="lg:max-w-[1400px] w-full flex flex-col gap-14">
                    <span className="text-white text-sm px-16">
                        Conheça a Aurora por quem faz a Aurora acontecer.{" "}
                        <strong>Assista aos vídeos:</strong>
                    </span>
                    <div className="flex gap-4">
                        <ReelsSectionIsland cards={cards} />
                    </div>
                </div>
            </div>
        </>
    );
}
