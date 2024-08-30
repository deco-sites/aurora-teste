import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Signal } from "@preact/signals";
import { Device } from "apps/website/matchers/device.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface ICardProps {
    id: number;
    icon: ImageWidget;
    text: string;
    link: string;
}

export interface ICareJourneyCard {
    card: ICardProps;
    activeCard: Signal<number>;
    handleNext: () => void;
    handlePrev: () => void;
    cardsLength: number;
    isCurrent: boolean;
    showControls: string;
    device: Device;
}

export default function CareJourneyCard(
    {
        card,
        activeCard,
        handleNext,
        handlePrev,
        cardsLength,
        isCurrent,
        showControls,
        device,
    }: ICareJourneyCard,
) {
    return (
        <div className="flex flex-col flex-shrink-0 bg-gradient-to-b from-pink4 to-pink5 rounded-3xl w-72 mx-2">
            <div className="flex justify-center items-center h-2/4">
                <Image
                    src={card.icon}
                    alt="Icon"
                    className="w-36 h-36 object-contain drop-shadow-2xl"
                />
            </div>

            <span
                className="flex items-center justify-center text-center text-white font-sora h-1/4 font-thin"
                dangerouslySetInnerHTML={{ __html: card.text }}
            >
            </span>
            <div
                className={`flex justify-center items-center gap-6 h-1/4 ${showControls}`}
            >
                {activeCard.value === card.id && (
                    <>
                        {card.id !== 1 && (
                            <Icon
                                class="h-auto -rotate-90 text-white cursor-pointer"
                                id="ChevronUp"
                                strokeWidth={2}
                                size={28}
                                onClick={handlePrev}
                            />
                        )}
                        {((device === "desktop" && card.id !== cardsLength) ||
                            (device !== "desktop" &&
                                card.id !== cardsLength + 1)) && (
                            <Icon
                                class="h-auto -rotate-[270deg] text-white cursor-pointer"
                                id="ChevronUp"
                                strokeWidth={2}
                                size={28}
                                onClick={handleNext}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
