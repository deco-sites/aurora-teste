import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { plansCardsInfos } from "site/helpers/Site/plans-cards-infos.ts";
import Image from "apps/website/components/Image.tsx";
import ColorfullButton from "site/components/Site/colorfull-btn.tsx";
import { useState } from "preact/hooks";
import LineTitle from "site/components/Site/Table/line-title.tsx";
import DataCellText from "../../components/Site/Table/data-cell-text.tsx";
import DataCellBoolean from "site/components/Site/Table/data-cell-boolean.tsx";

export interface IHospital {
    name: string;
    a100: boolean;
    a300: boolean;
    a500: boolean;
}

export interface HospitalsByRegion {
    region: string;
    hospitals: IHospital[];
}

export interface Props {
    a100Price: string;
    a100Coverage: string;
    a300Price: string;
    a300Coverage: string;
    a500Price: string;
    a500Coverage: string;
    regions: HospitalsByRegion[];
    cities: string[];
}

export default function PlansSectionIsland(
    {
        a100Coverage,
        a300Coverage,
        a500Coverage,
        regions,
        cities,
    }: Props,
) {
    const bgColors = {
        yellow: "bg-yellow",
        orange: "bg-orange1",
        green: "bg-aquagreen",
    };

    const textColors = {
        white: "text-white",
        yellow: "text-yellow",
        orange: "text-orange1",
        green: "text-aquagreen2",
        black: "text-black text-opacity-45",
    };
    //console.log("Regiões aqui:", regions);

    const [regionValue, setRegionValue] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setRegionValue(regions.findIndex((el) => el.region === value));
    };

    return (
        <>
            <div className="flex justify-center px-10 lg:px-0 bg-gray4">
                <div className="flex flex-col lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32">
                    <div className="flex flex-col">
                        <div className="flex flex-col lg:flex-row w-full justify-between mb-48">
                            <span className="text-2xl text-orange4 font-bold lg:pl-20">
                                Escolha um plano<br />{" "}
                                para estar sempre junto<br /> de você.
                            </span>
                            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center z-50 mt-12">
                                <label
                                    className="text-orange1 text-nowrap font-sora"
                                    htmlFor="regionValue"
                                >
                                    Região:
                                </label>
                                <div
                                    className={`relative w-full lg:w-auto`}
                                >
                                    <select
                                        className={`px-6 py-5 lg:py-2 rounded-xl lg:rounded-xl bg-white outline-none text-black text-opacity-25 placeholder:text-black placeholder:text-opacity-25 font-sora placeholder:font-sora appearance-none pr-8 w-full`}
                                        id="regionValue"
                                        name="regionValue"
                                        value={cities[regionValue]}
                                        onChange={handleChange}
                                    >
                                        <option
                                            value=""
                                            selected
                                            disabled
                                            hidden
                                        >
                                            {cities[0]}
                                        </option>
                                        {cities.map((city, index) => (
                                            <option
                                                key={index}
                                                value={city}
                                            >
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg
                                            width="14"
                                            height="7"
                                            viewBox="0 0 16 9"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                                                fill="black"
                                                fill-opacity="0.25"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-44 lg:gap-5">
                            {plansCardsInfos.map((card) => (
                                <div
                                    className={`relative flex flex-1 flex-col ${
                                        bgColors[card.bgColor]
                                    } rounded-3xl px-11 lg:px-20 pb-16 lg:pb-24 pt-32 lg:pt-44`}
                                >
                                    <Image
                                        src={card.cardImage}
                                        alt={card.altImage}
                                        className="w-[550px] h-[400px] lg:w-[650px] lg:h-[450px] object-cover absolute -top-60 right-0"
                                    />
                                    <span
                                        className={`font-sora text-[60px] mb-6 ${
                                            textColors[card.titleColor]
                                        }`}
                                    >
                                        {card.title}
                                    </span>
                                    <span
                                        className={`${
                                            textColors[card.textColor]
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: card.text,
                                        }}
                                    >
                                    </span>
                                    <div className="flex flex-col justify-between h-full">
                                        <div className="flex-1"></div>
                                        <div className="flex justify-center mt-14">
                                            <ColorfullButton
                                                text={"Solicite sua cotação"}
                                                link={"/solicitar-cotacao"}
                                                bgColor={card.buttonColor}
                                                textColor={card.textButtonColor}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center px-10 lg:px-0 bg-white">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32 lg:px-40">
                    <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row w-full justify-between px-0 lg:px-20 mb-28">
                        <span className="text-orange4 text-4xl font-bold flex-shrink-0">
                            Compare e<br /> escolha o ideal<br /> para você
                        </span>

                        <span className="text-black text-opacity-50 lg:max-w-[400px]">
                            A Aurora é a única operadora com uma linha de
                            serviços moderna, centrada no cuidado integral e
                            individual de cada beneficiário. Conheça os nossos
                            planos e descubra o melhor para você.
                        </span>
                    </div>
                    <div class="hidden lg:grid grid-cols-4 text-center gap-4 sticky top-0 bg-white py-4">
                        <div></div>
                        <div class="bg-orange1 rounded-[10px] h-[110px] flex justify-center items-center text-2xl text-yellow">
                            a100
                        </div>
                        <div class="bg-aquagreen rounded-[10px] h-[110px] flex justify-center items-center text-2xl text-yellow">
                            a300
                        </div>
                        <div class="bg-yellow rounded-[10px] h-[110px] flex justify-center items-center text-2xl text-orange1">
                            a500
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll lg:overflow-x-auto scrollbar-none">
                        <div className="min-w-max lg:min-w-full">
                            <div class="grid lg:hidden grid-cols-4 text-center gap-4 sticky top-0 bg-white py-4">
                                <div></div>
                                <div class="bg-orange1 rounded-[10px] h-[110px] flex justify-center items-center text-2xl text-yellow">
                                    a100
                                </div>
                                <div class="bg-aquagreen rounded-[10px] h-[110px] flex justify-center items-center text-2xl text-yellow">
                                    a300
                                </div>
                                <div class="bg-yellow rounded-[10px] h-[110px] flex justify-center items-center text-2xl text-orange1">
                                    a500
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div class="grid grid-cols-4 text-center gap-4">
                                    <LineTitle text={"Valor"} />
                                    <DataCellText
                                        text={regions[regionValue].a100Price}
                                    />
                                    <DataCellText
                                        text={regions[regionValue].a300Price}
                                    />
                                    <DataCellText
                                        text={regions[regionValue].a500Price}
                                    />

                                    <LineTitle text={"Cobertura"} />
                                    <DataCellText text={a100Coverage} />
                                    <DataCellText text={a300Coverage} />
                                    <DataCellText text={a500Coverage} />
                                </div>
                            </div>

                            <div className="p-8">
                                <hr />
                            </div>
                            <div className="flex flex-col gap-4 min-w-max lg:min-w-full">
                                {regions?.[regionValue].hospitals.map((
                                    hospital,
                                ) => (
                                    <div class="grid grid-cols-4 text-center gap-4">
                                        <LineTitle
                                            text={hospital.name}
                                        />
                                        <DataCellBoolean
                                            value={hospital.a100}
                                        />
                                        <DataCellBoolean
                                            value={hospital.a300}
                                        />
                                        <DataCellBoolean
                                            value={hospital.a500}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-start mt-10">
                                <span className="font-sora text-xs text-black text-opacity-60">
                                    *faixa de 0 a 18 anos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
