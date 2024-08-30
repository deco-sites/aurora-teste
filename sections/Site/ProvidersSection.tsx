import ColorfullButton from "site/components/Site/colorfull-btn.tsx";
import { Section } from "deco/blocks/section.ts";

export interface Props {
    title: string;
    description: string;
    buttonText: string;
    section: Section;
}

export default function ProvidersSection(
    { title, description, buttonText, section }: Props,
) {
    return (
        <>
            <div className="flex justify-center bg-aquagreen2">
                <div className="flex flex-col lg:flex-row gap-20 lg:w-[1400px] w-full py-24 lg:pt-32 lg:pb-36 px-10 lg:px-0">
                    <div className="px-8 lg:px-0 flex flex-col gap-10 lg:w-1/3">
                        <div className="flex flex-col gap-5 text-white font-sora">
                            <span
                                className="text-5xl"
                                dangerouslySetInnerHTML={{ __html: title }}
                            >
                            </span>
                            <span
                                className="text-lg"
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            >
                            </span>
                        </div>
                        <ColorfullButton
                            bgColor="yellow"
                            textColor="green"
                            text={buttonText}
                            link="https://6167prd-plano.cloudmv.com.br/mvsaudeweb/#/guia-medico"
                            targetBlank
                        />
                    </div>
                    <div className="flex relative justify-center h-80 lg:h-auto items-center w-full py-5 lg:w-2/3 bg-white rounded-[20px]">
                        <section.Component {...section.props} />
                    </div>
                </div>
            </div>
        </>
    );
}
