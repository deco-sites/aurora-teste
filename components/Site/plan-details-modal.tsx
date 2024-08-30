import Image from "apps/website/components/Image.tsx";
import { useEffect } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export default function PlanDetailsModal(
    { isModalOpen, setIsModalOpen, plans },
) {
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isModalOpen]);

    const selectedPlan = plans[isModalOpen];

    const textColors = {
        "Amarelo": "text-yellow",
        "Branco": "text-white",
        "Laranja": "text-orange1",
        "Rosa": "text-pink1",
        "Verde": "text-aquagreen",
    };

    const bgColors = {
        "Laranja": "bg-orange1",
        "Amarelo": "bg-yellow",
        "Verde": "bg-aquagreen",
        "Cinza": "bg-gray4",
    };

    const titleColors = {
        "Amarelo": "text-yellow",
        "Rosa": "text-pink1",
    };

    const buttonTextColors = {
        "Amarelo": "text-yellow",
        "Verde": "text-aquagreen",
        "Laranja": "text-orange1",
    };

    const buttonBgColors = {
        "Amarelo": "bg-yellow",
        "Laranja": "bg-orange1",
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 flex min-h-screen w-screen ${
                    bgColors[selectedPlan.bgColor]
                }  justify-center items-start lg:items-center overflow-x-hidden overflow-y-scroll`}
                style={{ zIndex: 9999 }}
            >
                <div className="flex w-full flex-col-reverse lg:flex-col items-center justify-center px-10 lg:px-0 max-w-[1100px]">
                    <div className="flex w-full flex-col lg:flex-row items-center">
                        <div className="lg:w-3/6 flex-grow z-40">
                            <Image
                                src={`${selectedPlan.cardImage}`}
                                alt={"Card"}
                                className="w-[22rem] h-[22rem] lg:w-full lg:h-[25rem] object-contain ml-16 lg:ml-0 -mt-12 -mb-12 lg:mb-0 lg:mt-0"
                                preload
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="lg:min-w-3/12 flex flex-col lg:-ml-32 flex-grow flex-shrink-0">
                            <span
                                className={`${
                                    titleColors[selectedPlan.titleColor]
                                } font-sora text-6xl mb-7 lg:mb-4`}
                            >
                                {selectedPlan.planName}
                            </span>
                            <div
                                className={`flex flex-col ${
                                    textColors[selectedPlan.textColor]
                                } font-sora mb-3 leading-6`}
                            >
                                {selectedPlan.benefits.map((
                                    benefit,
                                ) => (
                                    <span>
                                        <strong className="text-2xl">
                                            . &nbsp;
                                        </strong>
                                        {benefit.phrase}
                                    </span>
                                ))}
                            </div>
                            <span
                                className={`text-[8px] ${
                                    textColors[selectedPlan.textColor]
                                }`}
                            >
                                *Exames iniciais solicitados após avaliação
                                médica da Aurora Saúde.
                            </span>
                        </div>
                        <div className="lg:w-auto flex-grow flex flex-col gap-3 mt-7 lg:mt-0 lg:pl-14">
                            <div
                                className={`flex flex-col border ${
                                    selectedPlan.planName === "a500"
                                        ? "border-orange1"
                                        : "border-gray9"
                                }  rounded-[18px] py-5 lg:py-11 px-20`}
                            >
                                <span
                                    className={`${
                                        textColors[selectedPlan.textColor]
                                    }`}
                                >
                                    A partir de
                                </span>
                                <span
                                    className={`${
                                        titleColors[selectedPlan.titleColor]
                                    } text-2xl font-sora font-bold`}
                                >
                                    R${selectedPlan.basePrice}*
                                </span>
                            </div>

                            <div className="flex flex-col-reverse lg:flex-col gap-3">
                                <span
                                    className={`text-[8px] ${
                                        textColors[selectedPlan.textColor]
                                    } text-center`}
                                >
                                    *faixa de 0 a 18 anos
                                </span>
                                <a
                                    href="/simulador-aurora"
                                    className="flex justify-center"
                                >
                                    <button
                                        className={`${
                                            buttonBgColors[
                                                selectedPlan.buttonBgColor
                                            ]
                                        } ${
                                            buttonTextColors[
                                                selectedPlan.buttonTextColor
                                            ]
                                        } font-bold rounded-full px-16 py-4 whitespace-nowrap`}
                                    >
                                        Compare e escolha
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between lg:justify-center lg:gap-48 w-full z-50">
                        <button
                            className={`flex justify-center items-center rounded-full px-7 py-3 lg:px-8 lg:py-2 font-sora font-semibold ${
                                selectedPlan.planName === "a100"
                                    ? "bg-gray4 text-orange1"
                                    : "bg-transparent border border-gray4"
                            } ${
                                selectedPlan.planName === "a500"
                                    ? "bg-transparent border border-orange1 text-orange1"
                                    : ""
                            } ${
                                selectedPlan.planName === "a300"
                                    ? "text-white"
                                    : ""
                            }`}
                            onClick={() => setIsModalOpen(0)}
                        >
                            a100
                        </button>
                        <button
                            className={`flex justify-center items-center rounded-full px-7 py-3 lg:px-8 lg:py-2 font-sora font-semibold ${
                                selectedPlan.planName === "a300"
                                    ? "bg-gray4 text-aquagreen"
                                    : "bg-transparent border border-gray4"
                            } ${
                                selectedPlan.planName === "a500"
                                    ? "bg-transparent border border-orange1 text-orange1"
                                    : ""
                            } ${
                                selectedPlan.planName === "a100"
                                    ? "text-white"
                                    : ""
                            }`}
                            onClick={() => setIsModalOpen(1)}
                        >
                            a300
                        </button>
                        <button
                            className={`flex justify-center items-center rounded-full px-7 py-3 lg:px-8 lg:py-2 font-sora font-semibold ${
                                selectedPlan.planName === "a500"
                                    ? "bg-orange1 text-yellow"
                                    : "bg-transparent border border-gray4 text-white"
                            }`}
                            onClick={() => setIsModalOpen(2)}
                        >
                            a500
                        </button>
                    </div>
                    <div className="flex justify-start w-full lg:justify-center mt-10 mb-7 lg:mb-0 lg:mt-9">
                        <button
                            className={`flex items-center gap-3 ${
                                textColors[selectedPlan.textColor]
                            } font-sora text-base lg:text-sm`}
                            onClick={() => setIsModalOpen(null)}
                        >
                            <Icon
                                class={`h-auto -rotate-90 ${
                                    selectedPlan.planName === "a500"
                                        ? "text-orange1"
                                        : "text-white"
                                }`}
                                id="ChevronUp"
                                strokeWidth={1}
                                size={24}
                            />

                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
