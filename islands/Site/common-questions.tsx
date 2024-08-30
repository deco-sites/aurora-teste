import { useSignal } from "@preact/signals";
import CommonQuestionTheme from "site/components/Site/common-question-theme.tsx";
import CommmonQuestionOption from "site/components/Site/common-question-option.tsx";
import { Device } from "apps/website/matchers/device.ts";

export interface Theme {
    themeName: string;
    themeQuestions: Question[];
}

export interface Question {
    questionTitle: string;
    questionText: string;
}

export interface CommonQuestionsIslandProps {
    themes: Theme[];
    device: Device;
}

export default function CommonQuestionsIsland(
    { themes, device }: CommonQuestionsIslandProps,
) {
    const activeQuestionsTheme = useSignal(0);
    const activeQuestion = useSignal<number | null>(null);

    return (
        <div className="flex justify-center px-10 lg:px-0 bg-white">
            <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                    <div className="lg:w-1/4 flex flex-col pt-8 lg:sticky lg:top-8 lg:h-full">
                        {themes.map((theme, index) => (
                            <CommonQuestionTheme
                                key={index}
                                index={index}
                                text={theme.themeName}
                                activeQuestionsTheme={activeQuestionsTheme}
                                device={device}
                            />
                        ))}
                    </div>

                    <div className="lg:w-3/4 flex flex-col gap-4">
                        {themes[activeQuestionsTheme.value].themeQuestions.map((
                            question,
                            index,
                        ) => (
                            <CommmonQuestionOption
                                key={index}
                                activeQuestion={activeQuestion}
                                index={index}
                                question={question}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
