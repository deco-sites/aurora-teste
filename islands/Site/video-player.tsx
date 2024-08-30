import { useState } from "preact/hooks";

export default function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    return (
        <div
            className={`relative flex justify-center w-full ${
                !isPlaying ? "pb-[56.25%]" : ""
            }`}
        >
            {!isPlaying
                ? (
                    <div className="absolute inset-0 flex items-center justify-center w-full lg:h-full">
                        <img
                            src={"/Site/background-video-image.png"}
                            alt="Background"
                            className="rounded-3xl w-full h-full object-cover"
                        />
                        <div className="absolute flex w-full justify-between px-4 md:px-16 bottom-4 md:bottom-12">
                            <span className="text-white font-sora text-xl md:text-3xl font-bold">
                                Estar junto <br />é andar lado a lado
                            </span>
                            <button onClick={handlePlayClick} className="">
                                <img
                                    src={"/Site/play-circle-icon.svg"}
                                    alt="Play Button"
                                    className="w-12 h-12"
                                />
                            </button>
                        </div>
                    </div>
                )
                : (
                    <video
                        className="w-full h-full rounded-3xl"
                        controls
                    >
                        <source
                            src="/Site/Videos/Manifesto.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                )}
        </div>
    );
}
