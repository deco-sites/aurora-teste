import { Device } from "apps/website/matchers/device.ts";
import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import TableTopic from "site/sections/Site/TableTopic.tsx";

type Segment = {
    segmentName: string;
};

type Props = {
    segments: Segment[];
    device: Device;
};

export default function IAmANewBeneficiaryIsland({ segments, device }: Props) {
    const activeSegment = useSignal(0);
    const activeTopic = useSignal<number | null>(0);

    const mobileActiveSegment = useSignal<number | null>(null);
    const mobileActiveTopic = useSignal<number | null>(null);

    const handleSectionClick = (index: number) => {
        if (device === "desktop") {
            activeSegment.value = index;
            activeTopic.value = 0;
        } else {
            mobileActiveSegment.value = index;
            mobileActiveTopic.value = 0;
        }
    };

    const handleClickExpandIcon = (index: number, event: Event) => {
        event.stopPropagation();
        if (device === "desktop") {
            activeTopic.value = activeTopic.value === index ? null : index;
        } else {
            mobileActiveTopic.value = mobileActiveTopic.value === index
                ? null
                : index;
        }
    };

    const handleClickExpandSection = (index: number, event: Event) => {
        event.stopPropagation();
        mobileActiveSegment.value = mobileActiveSegment.value === index
            ? null
            : index;
    };

    const desktopComponent = (
        <>
            <div className="flex justify-center px-10 lg:px-0 bg-white">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                        <div className="lg:w-1/4 flex flex-col pt-8 lg:sticky lg:top-8 lg:h-full">
                            {segments.map((segment, index) => (
                                <div
                                    key={index}
                                    className="flex gap-7 justify-between pb-3 mb-14 border-b border-b-black border-opacity-15 cursor-pointer pr-9"
                                    onClick={() => handleSectionClick(index)}
                                >
                                    <span
                                        className={`text-lg ${
                                            activeSegment.value === index
                                                ? "text-orange1"
                                                : "text-black text-opacity-40"
                                        } font-sora`}
                                        dangerouslySetInnerHTML={{
                                            __html: segment.segmentName,
                                        }}
                                    />
                                    <Image
                                        src={`${
                                            activeSegment.value === index
                                                ? "/Site/orange-arrow-right.svg"
                                                : "/Site/gray-arrow-right.svg"
                                        }`}
                                        alt="Arrow Right"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="lg:w-3/4 flex flex-col gap-4">
                            {segments[activeSegment.value].topics.map((
                                topic,
                                index,
                            ) => (
                                <div
                                    onClick={(event) =>
                                        handleClickExpandIcon(index, event)}
                                    className={`flex flex-col gap-9 ${
                                        activeTopic.value === index
                                            ? "bg-black bg-opacity-[0.02] pb-8"
                                            : "bg-orange1"
                                    }  rounded-[20px] px-10 lg:px-14 pt-9 lg:pt-10 cursor-pointer transition-all duration-300`}
                                >
                                    <div className="flex justify-between">
                                        <span
                                            className={`font-sora ${
                                                activeTopic.value === index
                                                    ? "text-orange1"
                                                    : "text-white"
                                            } font-bold text-lg`}
                                            dangerouslySetInnerHTML={{
                                                __html: topic.topicTitle,
                                            }}
                                        >
                                        </span>

                                        {activeTopic.value === index
                                            ? (
                                                <Icon
                                                    class="h-5 w-5 text-gray-400"
                                                    id="OrangeMinusSquare"
                                                    strokeWidth={1}
                                                    size={12}
                                                />
                                            )
                                            : (
                                                <Icon
                                                    class="h-5 w-5 text-gray-400"
                                                    id="OrangePlusSquare"
                                                    strokeWidth={1}
                                                    size={12}
                                                />
                                            )}
                                    </div>
                                    <div
                                        className={`transition-[max-height] duration-500 ease-in-out ${
                                            activeTopic.value === index
                                                ? "h-max"
                                                : "max-h-0 overflow-hidden"
                                        }`}
                                    >
                                        <span
                                            className={`text-gray11 ${
                                                activeTopic.value === index
                                                    ? "block"
                                                    : "hidden"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: topic.topicText,
                                            }}
                                        >
                                        </span>
                                        {topic.hasTable && (
                                            <TableTopic topic={topic} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const mobileComponent = (
        <>
            <div className="flex justify-center px-10 lg:px-0 bg-white">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                        <div className="lg:w-1/4 flex flex-col pt-8 lg:sticky lg:top-8 lg:h-full">
                            {segments.map((segment, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col"
                                    onClick={(event) =>
                                        handleClickExpandSection(index, event)}
                                >
                                    <div className="flex gap-7 justify-between pb-3 mb-7 border-b border-b-black border-opacity-15 cursor-pointer pr-9 transition-[max-height] duration-500 ease-in-out">
                                        <span
                                            className={`text-lg ${
                                                mobileActiveSegment.value ===
                                                        index
                                                    ? "text-orange1"
                                                    : "text-black text-opacity-40"
                                            } font-sora`}
                                            dangerouslySetInnerHTML={{
                                                __html: segment.segmentName,
                                            }}
                                        />
                                        <Image
                                            src={`${
                                                mobileActiveSegment.value ===
                                                        index
                                                    ? "/Site/orange-arrow-down.svg"
                                                    : "/Site/gray-arrow-right.svg"
                                            }`}
                                            alt="Arrow Right"
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            mobileActiveSegment.value === index
                                                ? "flex"
                                                : "hidden"
                                        } flex-col gap-4 pb-6`}
                                    >
                                        {segment.topics
                                            .map((
                                                topic,
                                                index,
                                            ) => (
                                                <div
                                                    onClick={(event) =>
                                                        handleClickExpandIcon(
                                                            index,
                                                            event,
                                                        )}
                                                    className={`flex flex-col gap-9 ${
                                                        mobileActiveTopic
                                                                .value ===
                                                                index
                                                            ? "bg-black bg-opacity-[0.02] pb-8"
                                                            : "bg-orange1"
                                                    }  rounded-[20px] px-10 pt-9 cursor-pointer transition-all duration-300`}
                                                >
                                                    <div className="flex justify-between">
                                                        <span
                                                            className={`font-sora ${
                                                                mobileActiveTopic
                                                                        .value ===
                                                                        index
                                                                    ? "text-orange1"
                                                                    : "text-white"
                                                            } font-bold text-lg`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: topic
                                                                    .topicTitle,
                                                            }}
                                                        >
                                                        </span>

                                                        {mobileActiveTopic
                                                                .value ===
                                                                index
                                                            ? (
                                                                <Icon
                                                                    class="h-5 w-12 text-gray-400"
                                                                    id="OrangeMinusSquare"
                                                                    strokeWidth={1}
                                                                    size={12}
                                                                />
                                                            )
                                                            : (
                                                                <Icon
                                                                    class="h-5 w-12 text-gray-400"
                                                                    id="OrangePlusSquare"
                                                                    strokeWidth={1}
                                                                    size={12}
                                                                />
                                                            )}
                                                    </div>
                                                    <div
                                                        className={`transition-[max-height] duration-500 ease-in-out ${
                                                            mobileActiveTopic
                                                                    .value ===
                                                                    index
                                                                ? "h-max"
                                                                : "max-h-0 overflow-hidden"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`text-gray11 ${
                                                                mobileActiveTopic
                                                                        .value ===
                                                                        index
                                                                    ? "block"
                                                                    : "hidden"
                                                            }`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: topic
                                                                    .topicText,
                                                            }}
                                                        >
                                                        </span>
                                                        {topic.hasTable && (
                                                            <TableTopic
                                                                topic={topic}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return device === "desktop" ? desktopComponent : mobileComponent;
}
