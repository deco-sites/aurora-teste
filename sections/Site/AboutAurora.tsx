import Image from "apps/website/components/Image.tsx";

export interface Props {
    title: string;
    /**
     * @format rich-text
     */
    text: string;
}

export default function AboutAurora({ title, text }: Props) {
    return (
        <>
            <div className="flex justify-center px-10 lg:px-0">
                <div className="lg:max-w-[1400px] w-full my-32 lg:pt-32">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex flex-col gap-7 lg:w-1/3 rounded-[20px] bg-pink1 p-12 lg:p-20">
                            <span
                                className="text-yellow font-sora text-2xl font-bold"
                                dangerouslySetInnerHTML={{ __html: title }}
                            >
                            </span>
                            <span
                                className="text-white"
                                dangerouslySetInnerHTML={{ __html: text }}
                            >
                            </span>
                        </div>

                        <div className="lg:w-2/3 flex items-stretch">
                            <Image
                                src={"/Site/casalbanner3.png"}
                                alt={"Marcela e Liliane"}
                                className="rounded-[20px] object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center text-center items-center mt-20 mb-14">
                        <span className="text-lg text-gray11 max-w-[500px]">
                            A Aurora Saúde tem um compromisso de proximidade e
                            confiança em todas as nossas relações, por meio de
                            uma escuta ativa e transparente, com objetivo de
                            sempre oferecer suporte contínuo aos nossos
                            principais pilares:
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center font-sora text-white text-xl text-center font-bold">
                        <div className="flex justify-center items-center bg-pink1 w-[276px] h-[276px] rounded-full transform transition-transform duration-300 hover:scale-110">
                            <span>
                                Clientes
                            </span>
                        </div>
                        <div className="flex justify-center items-center bg-aquagreen w-[276px] h-[276px] rounded-full -mt-10 lg:mt-0 lg:-ml-10 transform transition-transform duration-300 hover:scale-110">
                            <span>
                                Prestadores<br /> de Serviços<br />{" "}
                                Médico-<br />hospitalares
                            </span>
                        </div>
                        <div className="flex justify-center items-center bg-purple w-[276px] h-[276px] rounded-full -mt-10 lg:mt-0 lg:-ml-10 transform transition-transform duration-300 hover:scale-110">
                            <span>
                                Canal de vendas
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
