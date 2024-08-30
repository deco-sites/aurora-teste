import Image from "apps/website/components/Image.tsx";
import { careJourneyCardsInfos } from "site/helpers/Site/care-journey-cards.ts";
import CareJourneyCard from "site/islands/Site/care-journey-card.tsx";
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { Device } from "apps/website/matchers/device.ts";
import LastWhiteCard from "site/components/Site/last-white-card.tsx";

export default function CareJourneyIsland({ device }: Device) {
    const activeCard = useSignal(1);
    const [animationClass, setAnimationClass] = useState("");
    const [leftCards, setLeftCards] = useState([careJourneyCardsInfos[0]]);
    const [showControls, setShowControls] = useState("");

    const handleNext = () => {
        setTimeout(() => {
            if (rightCards.length > 0) {
                const nextCard = rightCards[0];
                setRightCards(rightCards.slice(1));
                const newArray = [...leftCards, nextCard];
                setLeftCards(newArray);

                activeCard.value = (activeCard.value + 1) %
                    (careJourneyCardsInfos.length + 1);
            }

            setAnimationClass("");
            setShowControls("control-buttons");
        }, 500);
        setShowControls("control-buttons-hidden");
        setAnimationClass("slide-left");
    };

    const handlePrev2 = () => {
        setRightCards((prevRightCards) => [
            ...prevRightCards,
            {
                id: careJourneyCardsInfos.length + 1,
                component: (
                    <LastWhiteCard handlePrev={handlePrev2} device={device} />
                ),
            },
        ]);
        activeCard.value =
            (activeCard.value - 1 + (careJourneyCardsInfos.length + 1)) %
            (careJourneyCardsInfos.length + 1);
        setShowControls("control-buttons");
        setAnimationClass("slide-right");
        setLeftCards(careJourneyCardsInfos);
    };

    const handlePrev = () => {
        if (leftCards.length > 1) {
            const prevCard = leftCards[leftCards.length - 1];
            setRightCards([prevCard, ...rightCards]);
            setLeftCards(leftCards.slice(0, leftCards.length - 1));

            activeCard.value =
                (activeCard.value - 1 + (careJourneyCardsInfos.length + 1)) %
                (careJourneyCardsInfos.length + 1);
        }
        setShowControls("control-buttons");
        setAnimationClass("slide-right");
    };

    const [rightCards, setRightCards] = useState(
        device === "mobile"
            ? [...careJourneyCardsInfos.slice(1), {
                id: careJourneyCardsInfos.length + 1,
                component: (
                    <LastWhiteCard handlePrev={handlePrev2} device={device} />
                ),
            }]
            : careJourneyCardsInfos.slice(1),
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimationClass("");
        }, 500);

        return () => clearTimeout(timeout);
    }, [animationClass]);

    return (
        <div className="w-full py-20 bg-yellow overflow-x-hidden">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-28 lg:gap-36">
                <div className="flex flex-col flex-1 px-16 lg:px-0 font-sora gap-10 lg:w-1/3">
                    <div className="flex flex-col gap-5">
                        <span className="text-pink1 text-4xl font-bold">
                            Jornada de <br />Cuidado:
                        </span>
                        <span className="text-purple text-2xl">
                            acompanhamento de <br /> saúde individualizado.
                        </span>
                    </div>
                    <a href="/jornada-de-cuidado" className="w-fit">
                        <button className="flex items-center text-darkPurple gap-1">
                            Conheça mais
                            <Image
                                src={"/Site/arrow-right-purple.svg"}
                                alt="icon"
                            />
                        </button>
                    </a>
                </div>
                <div className="pl-8 lg:pl-0 flex gap-5 lg:w-2/3">
                    <div className="flex">
                        {leftCards.length > 0 && (
                            leftCards[leftCards.length - 1].component
                                ? (
                                    <>
                                        {leftCards[leftCards.length - 1]
                                            .component}
                                    </>
                                )
                                : (
                                    <CareJourneyCard
                                        key={leftCards[leftCards.length - 1].id}
                                        card={leftCards[leftCards.length - 1]}
                                        activeCard={activeCard}
                                        handleNext={handleNext}
                                        handlePrev={handlePrev}
                                        cardsLength={careJourneyCardsInfos
                                            .length}
                                        isCurrent={leftCards[
                                            leftCards.length - 1
                                        ]
                                            .id === activeCard.value}
                                        showControls={showControls}
                                        device={device}
                                    />
                                )
                        )}
                    </div>
                    <div className={`flex gap-5 ${animationClass}`}>
                        {rightCards.map((card) =>
                            card.component
                                ? (
                                    <>
                                        {card.component}
                                    </>
                                )
                                : (
                                    <CareJourneyCard
                                        key={card.id}
                                        card={card}
                                        activeCard={activeCard}
                                        handleNext={handleNext}
                                        handlePrev={handlePrev}
                                        cardsLength={careJourneyCardsInfos
                                            .length}
                                        isCurrent={card.id === activeCard.value}
                                        showControls={showControls}
                                        device={device}
                                    />
                                )
                        )}
                        {device !== "mobile" && (
                            <LastWhiteCard
                                handlePrev={handlePrev}
                                device={device}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
