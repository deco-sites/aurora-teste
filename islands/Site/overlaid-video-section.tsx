import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";

export default function OverlaidVideoSectionIsland({ image, title, device }) {
    const { alt, mobile, desktop } = image;
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    return (
        <>
            <div className="flex items-center flex-col gap-10 h-[300px]">
                <div className="flex px-10 lg:px-0 justify-center lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-10 w-full max-w-[1400px]">
                    <div className="relative flex justify-center w-full">
                        {!isPlaying
                            ? (
                                <div className="absolute inset-0 flex items-start justify-center w-full h-[400px] lg:h-[500px]">
                                    {device !== "desktop" && (
                                        <Image
                                            className="rounded-3xl w-full h-full object-cover"
                                            src={mobile.image}
                                            alt={alt}
                                            width={mobile.width ?? 360}
                                            height={mobile.height ?? 600}
                                            decoding="async"
                                        />
                                    )}
                                    {device === "desktop" && (
                                        <Image
                                            className="rounded-3xl w-full h-full object-cover"
                                            src={desktop.image}
                                            alt={alt}
                                            width={desktop.width ?? 1440}
                                            height={desktop.height ?? 600}
                                            decoding="async"
                                        />
                                    )}
                                    <div className="absolute flex w-full justify-between px-4 md:px-16 bottom-4 md:bottom-12">
                                        <span
                                            className="text-white font-sora text-xs lg:text-2xl font-bold"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                        <div className="flex gap-3 lg:gap-6 items-center">
                                            <span className="text-sm text-white">
                                                Assista ao manifesto
                                            </span>
                                            <button
                                                onClick={handlePlayClick}
                                                className=""
                                            >
                                                <img
                                                    src={"/Site/play-circle-icon.svg"}
                                                    alt="Play Button"
                                                    className="w-6 h-6 lg:w-12 lg:h-12"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                            : (
                                <div className="absolute inset-0 w-full h-[400px] lg:h-[500px]">
                                    <video
                                        className="rounded-3xl w-full h-full object-cover"
                                        controls
                                    >
                                        <source
                                            src="/Site/Videos/Manifesto.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
