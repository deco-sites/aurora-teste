import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import { Device } from "apps/website/matchers/device.ts";
import Icon from "site/components/ui/Icon.tsx";

/** @titleBy itemText */
export interface Item {
    itemText: string;
}

/** @titleBy buttonText */
export interface Button {
    buttonText: string;
    buttonLink: string;
}

export interface Division {
    /**
     * @format rich-text
     * @description Texto da seção
     */
    text: string;
    items: Item[];
    buttonsSectionTitle?: string;
    buttons: Button[];
    /**
     * @format rich-text
     * @description Texto da seção
     */
    finalText?: string;
}

/** @titleBy sectionName */
export interface Section {
    sectionName: string;
    divisions: Division[];
}

export interface TourSectionIslandProps {
    sections: Section[];
    device: Device;
}

export interface Props {
    sections: Section[];
}

export default function TourSectionIsland(
    { sections, device }: TourSectionIslandProps,
) {
    const activeSection = useSignal(0);
    const mobileActiveSection = useSignal<number | null>(null);
    const isTransitioning = useSignal(false);

    const handleSectionClick = (index: number) => {
        if (device === "desktop") {
            if (index !== activeSection.value) {
                isTransitioning.value = true;
                setTimeout(() => {
                    activeSection.value = index;
                    isTransitioning.value = false;
                }, 300); // tempo da animação
            }
        } else {
            mobileActiveSection.value === index
                ? mobileActiveSection.value = null
                : mobileActiveSection.value = index;
        }
    };

    const desktopComponent = (
        <>
            <div id="tourSection" className="px-36 py-32">
                <div className="flex justify-start mb-32">
                    <span className="font-sora text-orange1 text-4xl">
                        Agora que já baixou o APP e <br />{" "}
                        respondeu ao seu questionário<br /> de saúde, que tal
                        {" "}
                        <strong className="font-extrabold">
                            um tour pelas<br /> suas funcionalidades?
                        </strong>
                    </span>
                </div>
                <div className="flex gap-20">
                    <div className="flex flex-col">
                        {sections.map((section, index) => (
                            <div
                                className="flex items-center py-7 px-10 border-b border-b-gray12 cursor-pointer"
                                onClick={() => handleSectionClick(index)}
                            >
                                <div
                                    className={`${
                                        activeSection.value === index
                                            ? "bg-orange1"
                                            : "bg-gray4"
                                    }  rounded-full w-10 h-10 flex items-center justify-center mr-10 flex-shrink-0`}
                                >
                                    <span
                                        className={`${
                                            activeSection.value === index
                                                ? "text-white"
                                                : "text-gray15"
                                        } font-sora`}
                                    >
                                        {index + 1}
                                    </span>
                                </div>
                                <span
                                    className={`${
                                        activeSection.value === index
                                            ? "text-orange1"
                                            : "text-gray15"
                                    } font-sora text-xl w-64 text-wrap`}
                                >
                                    {section.sectionName}
                                </span>
                                <Image
                                    src={`${
                                        activeSection.value === index
                                            ? "/Site/orange-arrow-right.svg"
                                            : "/Site/gray-arrow-right.svg"
                                    }`}
                                    alt="Arrow Right"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="h-auto">
                        <div className="bg-gray4 rounded-[20px] p-14 w-full sticky top-0">
                            {sections[activeSection.value].divisions.map((
                                division,
                                index,
                            ) => (
                                <div
                                    key={index}
                                    className={`flex flex-col transition-all duration-300 ${
                                        isTransitioning.value
                                            ? "opacity-0 translate-x-10"
                                            : "opacity-100 translate-x-0"
                                    } ${
                                        sections[activeSection.value].divisions
                                                    .length > 1 &&
                                            index !==
                                                sections[activeSection.value]
                                                        .divisions.length - 1
                                            ? "border-b border-b-gray12 pb-8 mb-8"
                                            : ""
                                    }`}
                                >
                                    <span
                                        className="text-orange1 text-xl"
                                        dangerouslySetInnerHTML={{
                                            __html: division.text,
                                        }}
                                    >
                                    </span>
                                    {division.items.length > 0 && (
                                        <div className="flex flex-col gap-3 mt-7">
                                            {division.items.map((
                                                item,
                                                itemIndex,
                                            ) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-center"
                                                >
                                                    <div
                                                        className={`rounded-full w-7 h-7 flex items-center justify-center mr-4 flex-shrink-0 border border-orange1`}
                                                    >
                                                        <span
                                                            className={`text-orange1 font-sora`}
                                                        >
                                                            {itemIndex + 1}
                                                        </span>
                                                    </div>
                                                    <span className="text-black text-opacity-60">
                                                        {item.itemText}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {division.buttons.length > 0 && (
                                        <div className="flex flex-col">
                                            {division.buttonsSectionTitle && (
                                                <span className="text-orange1 font-bold text-xl mt-8">
                                                    {division
                                                        .buttonsSectionTitle}
                                                </span>
                                            )}

                                            <div className="flex gap-5 mt-8">
                                                {division.buttons.map((
                                                    button,
                                                ) => (
                                                    <a href={button.buttonLink}>
                                                        <button className="flex gap-10 items-center font-medium bg-yellow text-pink1 py-6 px-10 rounded-full">
                                                            {button.buttonText}
                                                            <Icon
                                                                class="h-auto -rotate-90"
                                                                id="PinkArrowDown"
                                                                strokeWidth={1}
                                                                size={22}
                                                            />
                                                        </button>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {division.finalText && (
                                        <span
                                            className="text-orange1 text-xl mt-8"
                                            dangerouslySetInnerHTML={{
                                                __html: division.finalText,
                                            }}
                                        >
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 py-14 bg-yellow">
                <span className="text-pink1 font-bold text-xl">
                    Ficou com alguma outra dúvida?
                </span>
                <a href="/fale-com-a-gente">
                    <button className="bg-pink6 text-white rounded-[20px] px-5 py-2">
                        Fale com a Aurora
                    </button>
                </a>
            </div>
        </>
    );

    const mobileComponent = (
        <>
            <div className="px-10 py-16">
                <span className="font-sora text-orange1 text-4xl">
                    Agora que já<br /> baixou o APP e<br />
                    respondeu ao seu<br /> questionário de<br /> saúde, que tal
                    <strong className="font-extrabold">
                        {" "}um<br /> tour pelas suas<br /> funcionalidades?
                    </strong>
                </span>

                <div className="flex gap-20 mt-16">
                    <div className="flex flex-col">
                        {sections.map((section, index) => (
                            <div className="flex flex-col gap-4">
                                <div
                                    className="flex items-center py-7 px-[2px] border-b border-b-gray12 cursor-pointer"
                                    onClick={() => handleSectionClick(index)}
                                >
                                    <div
                                        className={`${
                                            mobileActiveSection.value === index
                                                ? "bg-orange1"
                                                : "bg-gray4"
                                        }  rounded-full w-10 h-10 flex items-center justify-center mr-10 flex-shrink-0`}
                                    >
                                        <span
                                            className={`${
                                                mobileActiveSection.value ===
                                                        index
                                                    ? "text-white"
                                                    : "text-gray15"
                                            } font-sora`}
                                        >
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span
                                        className={`${
                                            mobileActiveSection.value === index
                                                ? "text-orange1"
                                                : "text-gray15"
                                        } font-sora text-xl w-52 text-wrap`}
                                    >
                                        {section.sectionName}
                                    </span>
                                    <Image
                                        src={`${
                                            mobileActiveSection.value === index
                                                ? "/Site/orange-arrow-right.svg"
                                                : "/Site/gray-arrow-right.svg"
                                        }`}
                                        alt="Arrow Right"
                                        className={`${
                                            mobileActiveSection.value === index
                                                ? "rotate-90"
                                                : ""
                                        } `}
                                    />
                                </div>
                                {mobileActiveSection.value === index && (
                                    <div
                                        className={`bg-gray4 rounded-[20px] p-14 w-full h-max transition-all duration-300 ${
                                            isTransitioning.value
                                                ? "opacity-0 translate-x-10"
                                                : "opacity-100 translate-x-0"
                                        }`}
                                    >
                                        {sections[mobileActiveSection.value]
                                            .divisions
                                            .map((
                                                division,
                                                index,
                                            ) => (
                                                <div
                                                    key={index}
                                                    className={`flex flex-col ${
                                                        sections[
                                                                    mobileActiveSection
                                                                        .value
                                                                ].divisions
                                                                    .length >
                                                                1 &&
                                                            index !==
                                                                sections[
                                                                        mobileActiveSection
                                                                            .value
                                                                    ]
                                                                        .divisions
                                                                        .length -
                                                                    1
                                                            ? "border-b border-b-gray12 pb-8 mb-8"
                                                            : ""
                                                    }`}
                                                >
                                                    <span
                                                        className="text-orange1 text-xl"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                division.text,
                                                        }}
                                                    >
                                                    </span>
                                                    {division.items.length >
                                                            0 && (
                                                        <div className="flex flex-col gap-3 mt-7">
                                                            {division.items.map(
                                                                (
                                                                    item,
                                                                    itemIndex,
                                                                ) => (
                                                                    <div
                                                                        key={itemIndex}
                                                                        className="flex items-center"
                                                                    >
                                                                        <div
                                                                            className={`rounded-full w-7 h-7 flex items-center justify-center mr-4 flex-shrink-0 border border-orange1`}
                                                                        >
                                                                            <span
                                                                                className={`text-orange1 font-sora`}
                                                                            >
                                                                                {itemIndex +
                                                                                    1}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-black text-opacity-60">
                                                                            {item
                                                                                .itemText}
                                                                        </span>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}

                                                    {division.buttons.length >
                                                            0 && (
                                                        <div className="flex flex-col">
                                                            {division
                                                                .buttonsSectionTitle &&
                                                                (
                                                                    <span className="text-orange1 font-bold text-xl mt-8">
                                                                        {division
                                                                            .buttonsSectionTitle}
                                                                    </span>
                                                                )}

                                                            <div className="flex flex-col gap-5 mt-8">
                                                                {division
                                                                    .buttons
                                                                    .map((
                                                                        button,
                                                                    ) => (
                                                                        <a
                                                                            href={button
                                                                                .buttonLink}
                                                                        >
                                                                            <button className="flex gap-10 items-center font-medium bg-yellow text-pink1 py-6 px-10 rounded-full">
                                                                                {button
                                                                                    .buttonText}
                                                                                <Icon
                                                                                    class="h-auto -rotate-90"
                                                                                    id="PinkArrowDown"
                                                                                    strokeWidth={1}
                                                                                    size={22}
                                                                                />
                                                                            </button>
                                                                        </a>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {division.finalText && (
                                                        <span
                                                            className="text-orange1 text-xl mt-8"
                                                            dangerouslySetInnerHTML={{
                                                                __html: division
                                                                    .finalText,
                                                            }}
                                                        >
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 py-14 bg-yellow">
                <span className="text-pink1 font-bold text-xl">
                    Ficou com alguma outra dúvida?
                </span>
                <a href="/fale-com-a-gente">
                    <button className="bg-pink6 text-white rounded-[20px] px-5 py-2">
                        Fale com a Aurora
                    </button>
                </a>
            </div>
        </>
    );

    return device === "desktop" ? desktopComponent : mobileComponent;
}
