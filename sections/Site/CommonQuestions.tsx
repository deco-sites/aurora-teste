import CommonQuestionsIsland from "site/islands/Site/common-questions.tsx";
import { FnContext } from "deco/types.ts";
import { Device } from "apps/website/matchers/device.ts";

/** @titleBy questionTitle */
export interface Question {
    questionTitle: string;
    /**
     * @format rich-text
     * @description the text of button
     */
    questionText: string;
}

/** @titleBy themeName */
export interface Theme {
    themeName: string;
    themeQuestions: Question[];
}

export interface Props {
    themes: Theme[];
}

export interface CommonQuestionsProps {
    themes: Theme[];
    device: Device;
}

export default function CommonQuestions(
    { themes, device }: CommonQuestionsProps,
) {
    return (
        <>
            <div className="flex justify-center px-10 lg:px-0">
                <div className="lg:max-w-[1400px] w-full pt-12 lg:pb-16 flex flex-col pb-16 lg:py-32">
                    <div className="mb-14 flex flex-col px-8 gap-5 lg:gap-0 lg:flex-row lg:items-center justify-between lg:px-64 lg:pb-16 lg:border-b border-b-black border-opacity-15 ">
                        <span className="font-sora text-2xl text-orange1 font-bold">
                            Perguntas <br /> Frequentes
                        </span>
                        <div className="flex flex-col gap-4 lg:max-w-[500px] text-black text-opacity-50">
                            <span>
                                Bem-vindo(a) ao FAQ da Aurora Saúde! Aqui, você
                                encontrará respostas rápidas e esclarecedoras
                                para as perguntas mais comuns sobre nossos
                                serviços e planos de saúde.
                            </span>
                            <span>
                                Nosso objetivo é simplificar sua jornada em
                                busca de informações confiáveis e relevantes. Se
                                você tiver alguma dúvida que não está listada
                                aqui, não hesite em nos contatar.
                            </span>
                            <span>
                                Estamos à disposição para ajudar a cuidar de sua
                                saúde e de seu bem-estar.
                            </span>
                        </div>
                    </div>
                    <CommonQuestionsIsland themes={themes} device={device} />
                </div>
            </div>
        </>
    );
}

export const loader = (
    props: Props,
    req: Request,
    ctx: FnContext,
) => {
    return {
        ...props,
        device: ctx.device,
    };
};
