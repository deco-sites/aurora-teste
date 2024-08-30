import VideoPlayer from "site/islands/Site/video-player.tsx";

export default function VideoSection() {
    return (
        <>
            <div className="flex items-center flex-col gap-10 py-8 bg-orange4 lg:bg-gradient-to-b from-orange4 to-darkPurple">
                <div className="flex px-10 lg:px-0 justify-center lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-10 w-full max-w-[1400px]">
                    <VideoPlayer />
                </div>
            </div>
        </>
    );
}
