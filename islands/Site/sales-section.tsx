import { Signal, signal } from "@preact/signals";
import SupportMaterialCard from "site/components/Site/support-material-card.tsx";

export default function SalesSectionIsland({ sections, device }) {
    console.log("Sections:", sections);
    console.log("Device:", device);
    {
        /*
    const sections = [
        {
            id: 1,
            label: "Vendas 1 a 29 vidas",
            textColor: "text-white",
            color: "bg-orange1",
        },
        {
            id: 2,
            label: "Vendas 30 a 99 vidas",
            textColor: "text-white",
            color: "bg-pink1",
        },
        {
            id: 3,
            label: "Vendas acima de 100 vidas",
            textColor: "text-white",
            color: "bg-purple",
        },
        {
            id: 4,
            label: "Pós-Venda",
            textColor: "text-white",
            color: "bg-aquagreen",
        },
        {
            id: 5,
            label: "Campanhas de Venda",
            textColor: "text-pink1",
            color: "bg-yellow",
        },
    ];*/
    }

    const shadowColors = {
        1: "shadow-outline-orange5",
        2: "shadow-outline-pink7",
        3: "shadow-outline-purple2",
        4: "shadow-outline-aquagreen3",
        5: "shadow-outline-yellow2",
    };

    const activeSection = signal(sections[0].id);

    const NavigationButton = ({ section, index }) => {
        return (
            <button
                className={`relative p-2 ${section.textColor} rounded-full py-5 px-12 whitespace-nowrap ${section.bgColor} ${
                    activeSection.value === section.id
                        ? `${
                            shadowColors[section.id]
                        } lg:shadow-none lg:rounded-t-[20px] lg:rounded-b-none`
                        : ""
                }`}
                onClick={() => {
                    activeSection.value = section.id;
                }}
            >
                {section.label}
                {activeSection.value === section.id && device === "desktop" && (
                    <>
                        <div
                            className={`absolute bottom-0 translate-y-full left-0 w-full h-2 ${section.bgColor}`}
                        >
                        </div>
                        {/*Esquerda*/}
                        <div
                            className={`${section.bgColor} absolute -bottom-2 left-0 w-6 h-6 -translate-x-full`}
                        >
                            <div
                                className={`w-full h-full bg-gray4`}
                                style={{
                                    clipPath: "circle(101.8% at 1% 1%)",
                                }}
                            >
                            </div>
                        </div>
                        {/*Direita*/}
                        <div
                            className={`${section.bgColor} absolute -bottom-2 right-0 w-6 h-6 translate-x-full`}
                        >
                            <div
                                className={`w-full h-full bg-gray4`}
                                style={{
                                    clipPath: "circle(101.8% at 99% 0)",
                                }}
                            >
                            </div>
                        </div>
                    </>
                )}
            </button>
        );
    };

    const SectionContent = () => {
        const activeColor = sections.find(
            (section) => section.id === activeSection.value,
        )?.bgColor;

        console.log("Seção ativa:", activeSection.value);

        return (
            <div
                className={`p-7 lg:p-16 rounded-[20px] ${activeColor} transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[10px]`}
            >
                {sections[activeSection.value - 1].materials.map((material) => (
                    <SupportMaterialCard
                        date={material.date}
                        name={material.name}
                        city={material.city}
                        link={material.link}
                        category={material.category}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex justify-center lg:px-10 bg-gray4">
            <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-20 flex flex-col gap-5 lg:gap-20">
                <div className="flex flex-col gap-5 lg:gap-0">
                    {/*gap-5 lg:gap-[10px]*/}
                    <div className="flex px-10 lg:px-0 lg:hidden flex-col gap-5 font-sora mb-14">
                        <span className="text-orange1 text-xl font-bold">
                            Materiais<br /> de apoio
                        </span>
                        <span className="  text-black text-opacity-40">
                            Acesse os materiais de<br />{" "}
                            apoio abaixo e fique por<br />{" "}
                            dentro das campanhas de<br />{" "}
                            vendas, baixe documentos<br />{" "}
                            de apoio e muito mais.
                        </span>
                    </div>
                    <div className="flex pl-10 lg:px-10 gap-3 lg:gap-0 lg:justify-between overflow-x-scroll scrollbar-none py-1 lg:pb-2">
                        {sections.map((section, index) => (
                            <NavigationButton
                                key={section.id}
                                section={section}
                                index={index}
                            />
                        ))}
                    </div>
                    <div className="px-10 lg:px-0">
                        <SectionContent />
                    </div>
                </div>
            </div>
        </div>
    );
}
