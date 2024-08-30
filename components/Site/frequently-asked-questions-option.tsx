import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

export default function QuestionBox({ question, index }) {
    const activeAsk = useSignal<number | null>(null);
    const questionRef = useRef<HTMLDivElement | null>(null);

    function handleClickAskIcon(index: number) {
        if (activeAsk.value === index) {
            activeAsk.value = null;
        } else {
            activeAsk.value = index;
            questionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    return (
        <>
            <div
                ref={questionRef}
                onClick={() => handleClickAskIcon(index)}
                className={`flex flex-col gap-9 ${
                    activeAsk.value === index ? "bg-white pb-8" : "bg-pink6"
                }  rounded-[20px] px-10 lg:px-14 pt-9 lg:pt-14 cursor-pointer transition-all duration-300`}
            >
                <div className="flex justify-between">
                    <span
                        className={`font-sora ${
                            activeAsk.value === index
                                ? "text-pink6"
                                : "text-white"
                        } font-bold text-lg lg:text-2xl`}
                    >
                        {question.questionTitle}
                    </span>
                    <svg className="h-8 w-8 lg:h-6 lg:w-6 min-w-8">
                        <use
                            className=""
                            href={`${
                                activeAsk.value === index
                                    ? "/sprites.svg#PinkMinusSquare"
                                    : "/sprites.svg#PinkPlusSquare"
                            }`}
                        />
                    </svg>
                </div>
                <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                        activeAsk.value === index ? "max-h-screen" : "max-h-0"
                    }`}
                >
                    <span
                        className={`text-gray11 ${
                            activeAsk.value === index ? "block" : "hidden"
                        }`}
                    >
                        {question.questionText}
                    </span>
                </div>
            </div>
        </>
    );
}
