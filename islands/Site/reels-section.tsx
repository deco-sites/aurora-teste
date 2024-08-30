import { ImageWidget } from "apps/admin/widgets.ts";
import type { Video as LiveVideo } from "deco-sites/std/components/types.ts";
import { useState } from "preact/hooks";

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

import ReelsCard from "site/components/Site/reels-card.tsx";

export default function ReelsSectionIsland({ cards }: Props) {
    const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
    return (
        <>
            {cards.map((card, index) => (
                <ReelsCard
                    key={index}
                    id={index}
                    image={card.image}
                    video={card.video}
                    alt={card.alt}
                    title={card.title}
                    description={card.description}
                    currentPlaying={currentPlaying}
                    setCurrentPlaying={setCurrentPlaying}
                />
            ))}
        </>
    );
}
