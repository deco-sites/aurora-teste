import Image from "apps/website/components/Image.tsx";
import type { Video as LiveVideo } from "deco-sites/std/components/types.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { useState } from "preact/hooks";

export interface ReelsCardProps {
    id: number;
    image: ImageWidget;
    video: LiveVideo;
    alt: string;
    title: string;
    description: string;
    currentPlaying: number | null;
    setCurrentPlaying: (id: number | null) => void;
}

export default function ReelsCard(
    {
        id,
        image,
        video,
        alt,
        title,
        description,
        currentPlaying,
        setCurrentPlaying,
    }: ReelsCardProps,
) {
    const isPlaying = currentPlaying === id;

    const handlePlayClick = () => {
        if (isPlaying) {
            setCurrentPlaying(null); // Pausa o vídeo atual
        } else {
            setCurrentPlaying(id); // Reproduz o vídeo atual e pausa os outros
        }
    };

    return (
        <div className="relative w-full h-full">
            {!isPlaying
                ? (
                    <Image
                        src={image}
                        alt={alt}
                        className="rounded-2xl w-full h-full object-cover"
                    />
                )
                : (
                    <div className="w-full h-full">
                        <video
                            className="w-full h-full rounded-2xl object-cover"
                            controls
                            autoPlay
                        >
                            <source
                                src={video}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

            {!isPlaying && (
                <div className="w-full absolute bottom-4 flex items-center justify-between pl-14 pr-6">
                    <div className="flex flex-col text-white font-sora">
                        <span className="font-bold">
                            {title}
                        </span>
                        <span className="font-light">
                            {description}
                        </span>
                    </div>

                    <Image
                        src={"/Site/play-circle-icon.svg"}
                        alt={alt}
                        className="rounded-2xl cursor-pointer w-10 h-10"
                        onClick={handlePlayClick}
                    />
                </div>
            )}
        </div>
    );
}
