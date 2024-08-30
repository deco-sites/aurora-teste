import { Section } from "deco/blocks/section.ts";

export interface BrokersHomeDivisorProps {
    section: Section;
}

export default function BrokersHomeDivisor(
    { section }: BrokersHomeDivisorProps,
) {
    return (
        <>
            <div className="relative -mt-[2px] flex flex-col items-center h-[600px] lg:h-[280px] bg-pink6 lg:bg-gray4">
                <div className="flex px-10 lg:px-0 justify-center lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-10 w-full max-w-[1400px]">
                    <div className="absolute px-10 lg:px-0 inset-0 flex h-auto lg:h-[350px] justify-center -mt-28">
                        <div className="flex gap-6 max-w-[1400px] overflow-hidden rounded-[20px]">
                            <div className="flex flex-col lg:flex-row gap-7 pb-96 lg:pb-0">
                                <div className="flex flex-col justify-center items-center text-white lg:w-1/3 gap-9 bg-aquagreen rounded-[20px] py-11 lg:py-16 px-9 lg:px-20">
                                    <span>
                                        A Aurora Saúde nasceu para inovar e
                                        trazer uma experiência única de cuidado
                                        e bem-estar à vida das pessoas. Nosso
                                        propósito é oferecer a você e aos nossos
                                        clientes planos de saúde que traduzem
                                        uma forma de cuidado exclusiva e
                                        surpreendente.
                                    </span>
                                    <a href="/seja-um-corretor">
                                        <button className="w-fit bg-white text-aquagreen2 rounded-[20px] py-2 px-6">
                                            Quero ser um corretor
                                        </button>
                                    </a>
                                </div>
                                <div className="absolute left-10 right-10 -bottom-28 lg:static flex flex-col lg:flex-row items-center justify-center gap-4 lg:w-2/3 bg-white rounded-[20px] pt-14 pb-20 lg:py-28">
                                    <span className="text-aquagreen font-sora font-bold text-xl lg:w-max flex-shrink-0 px-10 lg:pl-16 lg:pr-0">
                                        Conheça a rede de<br />{" "}
                                        atendimento com os<br />
                                        melhores prestadores<br />{" "}
                                        médico-hospitalares<br />
                                        do seu plano.
                                    </span>

                                    <div className="flex relative h-auto w-full">
                                        <section.Component {...section.props} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden bg-gray4 h-32 w-full">
            </div>
        </>
    );
}
