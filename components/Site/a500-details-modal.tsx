import Image from "apps/website/components/Image.tsx";
import { useEffect } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export default function A500DetailsModal(
    {
        activeModal,
        previousModal,
        onClose,
        onOpen,
        planInfos,
        style,
    },
) {
    useEffect(() => {
        if (activeModal === 0 || previousModal === 0) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [activeModal, previousModal]);

    //const selectedPlan = planInfos[isModalOpen];

    return (
        <>
            <div
                className={`fixed top-0 left-0 flex min-h-screen w-screen bg-yellow justify-center items-start lg:items-center overflow-x-hidden overflow-y-scroll`}
                style={{
                    ...style,
                    animation: activeModal === 2
                        ? "slide-in 0.5s ease-in-out forwards"
                        : "",
                }}
            >
                <div className="flex w-full flex-col-reverse lg:flex-col items-center justify-center px-10 lg:px-0 max-w-[1100px]">
                    <div className="flex w-full flex-col lg:flex-row items-center">
                        <div className="lg:w-3/6 flex-grow z-40">
                            <Image
                                src={`${planInfos.cardImage}`}
                                alt={"Card"}
                                className="w-[22rem] h-[22rem] lg:w-full lg:h-[25rem] object-contain ml-16 lg:ml-0 -mt-12 -mb-12 lg:mb-0 lg:mt-0"
                                preload
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="lg:min-w-3/12 flex flex-col lg:-ml-32 flex-grow flex-shrink-0">
                            <span
                                className={`text-pink1 font-sora text-6xl mb-7 lg:mb-4`}
                            >
                                {planInfos.planName}
                            </span>
                            <div
                                className={`flex flex-col text-orange1 font-sora mb-3 leading-6`}
                            >
                                {planInfos.benefits.map((
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
                                className={`text-[8px] text-orange1`}
                            >
                                *Exames iniciais solicitados após avaliação
                                médica da Aurora Saúde.
                            </span>
                        </div>
                        <div className="lg:w-auto flex-grow flex flex-col gap-3 mt-7 lg:mt-0 lg:pl-14">
                            <div
                                className={`flex flex-col border border-orange1 rounded-[18px] py-5 lg:py-11 px-20`}
                            >
                                <span
                                    className={`text-orange1`}
                                >
                                    A partir de
                                </span>
                                <span
                                    className={`text-pink1 text-2xl font-sora font-bold`}
                                >
                                    R${planInfos.basePrice}*
                                </span>
                            </div>

                            <div className="flex flex-col-reverse lg:flex-col gap-3">
                                <span
                                    className={`text-[8px] text-orange1 text-center`}
                                >
                                    *faixa de 0 a 18 anos
                                </span>
                                <a
                                    href="/simulador-aurora"
                                    className="flex justify-center"
                                >
                                    <button
                                        className={`bg-orange1 text-yellow font-bold rounded-full px-16 py-4 whitespace-nowrap`}
                                    >
                                        Compare e escolha
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between lg:justify-center lg:gap-48 w-full z-50">
                        <button
                            className={`flex justify-center items-center rounded-full px-7 py-3 lg:px-8 lg:py-2 font-sora font-semibold bg-transparent border border-orange1 text-orange1 `}
                            onClick={() => onOpen(0)}
                        >
                            a100
                        </button>
                        <button
                            className={`flex justify-center items-center rounded-full px-7 py-3 lg:px-8 lg:py-2 font-sora font-semibold bg-transparent border border-orange1 text-orange1`}
                            onClick={() => onOpen(1)}
                        >
                            a300
                        </button>
                        <button
                            className={`flex justify-center items-center rounded-full px-7 py-3 lg:px-8 lg:py-2 font-sora font-semibold bg-orange1 text-yellow`}
                            onClick={() => onOpen(2)}
                        >
                            a500
                        </button>
                    </div>
                    <div className="flex justify-start w-full lg:justify-center mt-10 mb-7 lg:mb-0 lg:mt-9">
                        <button
                            className={`flex items-center gap-3 text-orange1 font-sora text-base lg:text-sm`}
                            onClick={() => onClose(2)}
                        >
                            <Icon
                                class={`h-auto -rotate-90 text-orange1`}
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
