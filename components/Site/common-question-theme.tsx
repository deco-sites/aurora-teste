import Image from "apps/website/components/Image.tsx";
import { Signal } from "@preact/signals";
import { Device } from "apps/website/matchers/device.ts";

export interface CommonQuestionThemeProps {
    index: number;
    text: string;
    activeQuestionsTheme: Signal<number>;
    device: Device;
}

export default function CommonQuestionTheme(
    { index, text, activeQuestionsTheme, device }: CommonQuestionThemeProps,
) {
    function handleChangeActiveOption() {
        activeQuestionsTheme.value = index;
    }

    return (
        <div
            className="flex justify-between pb-3 mb-14 border-b border-b-black border-opacity-15 cursor-pointer pr-9"
            onClick={handleChangeActiveOption}
        >
            <span
                className={`${
                    activeQuestionsTheme.value === index
                        ? "text-orange1"
                        : "text-black text-opacity-40"
                } font-sora`}
            >
                {text}
            </span>
            {device !== "desktop"
                ? (
                    <Image
                        src={`${
                            activeQuestionsTheme.value === index
                                ? "/Site/orange-arrow-down.svg"
                                : "/Site/gray-arrow-right.svg"
                        }`}
                        alt="Arrow Right"
                    />
                )
                : (
                    <Image
                        src={`${
                            activeQuestionsTheme.value === index
                                ? "/Site/orange-arrow-right.svg"
                                : "/Site/gray-arrow-right.svg"
                        }`}
                        alt="Arrow Right"
                    />
                )}
        </div>
    );
}
