import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { FnContext } from "deco/types.ts";
import { Device } from "apps/website/matchers/device.ts";

type Section = {
    sectionName: string;
    sectionText: string;
};

type Props = {
    sections: Section[];
    device: Device;
};

export default function PrivacyPoliciesIsland({ sections, device }: Props) {
    const activeSection = useSignal(0);
    const sectionRefs = useRef<HTMLDivElement[]>([]);
    const expandedSection = useSignal<number | null>(null);

    const handleSectionClick = (index: number) => {
        activeSection.value = index;
        if (device === "desktop") {
            if (activeSection.value === sections.length - 1) {
                sectionRefs.current[index - 1].scrollIntoView({
                    behavior: "smooth",
                });
            } else {
                sectionRefs.current[index].scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    };

    const handleClickExpandIcon = (index: number) => {
        expandedSection.value = expandedSection.value === index ? null : index;

        //O setTimeout abaixo é responsável por scrollar a tela quando expando alguma seção
        setTimeout(() => {
            if (sectionRefs.current[index]) {
                const yOffset = -50; // Ajuste o valor conforme necessário (para criar o "padding" desejado).
                const y =
                    sectionRefs.current[index].getBoundingClientRect().top +
                    globalThis.scrollY +
                    yOffset;

                globalThis.scrollTo({ top: y, behavior: "smooth" });
            }
        }, 300);
    };

    const desktopComponent = (
        <div className="flex justify-center px-10 lg:px-0 bg-white">
            <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                    <div className="lg:w-1/4 flex flex-col pt-8 lg:sticky lg:top-8 lg:h-full">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="flex gap-7 justify-between pb-3 mb-14 border-b border-b-black border-opacity-15 cursor-pointer pr-9"
                                onClick={() => handleSectionClick(index)}
                            >
                                <span
                                    className={`text-sm ${
                                        activeSection.value === index
                                            ? "text-orange1"
                                            : "text-black text-opacity-40"
                                    } font-sora`}
                                    dangerouslySetInnerHTML={{
                                        __html: section.sectionName,
                                    }}
                                />
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

                    <div className="lg:w-3/4 flex flex-col gap-14">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    if (el) {
                                        sectionRefs.current[index] = el;
                                    }
                                }}
                                className="flex gap-6"
                            >
                                <div className="flex flex-shrink-0 gap-1 uppercase text-orange1 font-bold w-56">
                                    <span>{`${index + 1}.`}</span>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: section.sectionName,
                                        }}
                                    />
                                </div>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: section.sectionText,
                                    }}
                                    className="text-black text-opacity-40"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const mobileComponent = (
        <div className="flex justify-center px-10 lg:px-0 bg-white">
            <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                    <div className="flex flex-col pt-8 lg:sticky lg:top-8 lg:h-full">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="flex flex-col"
                                onClick={() => {
                                    handleClickExpandIcon(index);
                                    handleSectionClick(index); // Only handle click here, no scroll needed
                                }}
                            >
                                <div className="transition-all duration-300 flex gap-2 justify-between pb-3 mb-5 border-b border-b-black border-opacity-15 cursor-pointer pr-9">
                                    <span
                                        className={`${
                                            expandedSection.value === index
                                                ? "text-orange1"
                                                : "text-black text-opacity-40"
                                        } font-sora`}
                                        dangerouslySetInnerHTML={{
                                            __html: section.sectionName,
                                        }}
                                    />
                                    <Image
                                        src={`${
                                            expandedSection.value === index
                                                ? "/Site/orange-arrow-down.svg"
                                                : "/Site/gray-arrow-right.svg"
                                        }`}
                                        alt="Arrow Right"
                                    />
                                </div>
                                <div
                                    className={`overflow-hidden transition-[height] duration-500 ease-in-out ${
                                        expandedSection.value === index
                                            ? "h-auto mb-10"
                                            : "h-0"
                                    }`}
                                    style={{
                                        height: expandedSection.value === index
                                            ? sectionRefs.current[index]
                                                ?.scrollHeight
                                            : 0,
                                    }}
                                    ref={(el) => {
                                        if (el) {sectionRefs.current[index] =
                                                el;}
                                    }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: section.sectionText,
                                        }}
                                        className="text-gray11"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return device === "desktop" ? desktopComponent : mobileComponent;
}
