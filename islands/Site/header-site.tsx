import LoggedAreasBtn from "site/islands/Site/logged-areas-btn.tsx";
import HeaderMobileMenuBtn from "site/islands/Site/header-mobile-menu-btn.tsx";
import SearchButtonContainer from "site/islands/Site/search-button-container.tsx";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    /**
     * @description Type of Header
     */
    type: "cliente" | "empresa" | "corretor" | "prestador";
}

type Color = "orange" | "purple" | "pink" | "yellow" | "white" | "darkPink";

interface IheaderOptions {
    id: number;
    name: string;
    color: Color;
    title: string;
    link: string;
    target: string;
    menuItems: { text: string; link: string; target: string }[];
    logo: string;
    textColor: "white" | "darkPink";
}

const headerOptions: IheaderOptions[] = [
    {
        id: 1,
        name: "cliente",
        color: "orange",
        title: "Sou Cliente",
        link: "/",
        target: "_self",
        menuItems: [
            { text: "Quem somos", link: "/quem-somos", target: "_self" },
            { text: "Nossos planos", link: "/nossos-planos", target: "_self" },
            {
                text: "Jornada de Cuidado",
                link: "/jornada-de-cuidado",
                target: "_self",
            },
        ],
        logo: "/Site/default_logo_aurora.svg",
        textColor: "white",
    },
    {
        id: 2,
        name: "empresa",
        color: "purple",
        title: "Sou Empresa",
        link: "https://6167prd-plano.cloudmv.com.br/mvsaudeweb/#/login/empresa",
        target: "_blank",
        menuItems: [
            { text: "Quem somos", link: "/quem-somos", target: "_self" },
            { text: "Nossos planos", link: "/nossos-planos", target: "_self" },
            {
                text: "Jornada de Cuidado",
                link: "/jornada-de-cuidado",
                target: "_self",
            },
        ],
        logo: "/Site/default_logo_aurora.svg",
        textColor: "white",
    },
    {
        id: 3,
        name: "corretor",
        color: "pink",
        title: "Sou Corretor",
        link: "/corretor",
        target: "_self",
        menuItems: [
            {
                text: "Seja um Corretor",
                link: "/seja-um-corretor",
                target: "_self",
            },
            { text: "Quem somos", link: "/quem-somos", target: "_self" },
            { text: "Nossos planos", link: "/nossos-planos", target: "_self" },
            {
                text: "Vendas",
                link:
                    "https://souaurorasaude.planium.io/web/login/?target=venda",
                target: "_blank",
            },
            {
                text: "Materiais de Apoio",
                link: "/materiais-de-apoio",
                target: "_self",
            },
        ],
        logo: "/Site/default_logo_aurora.svg",
        textColor: "white",
    },
    {
        id: 4,
        name: "prestador",
        color: "yellow",
        title: "Sou Prestador",
        link: "https://6167prd-plano.cloudmv.com.br/mvautorizadorguias/",
        target: "_blank",
        menuItems: [
            {
                text: "Seja um Prestador",
                link: "/seja-um-prestador",
                target: "_self",
            },
            { text: "Nossos planos", link: "/nossos-planos", target: "_self" },
            {
                text: "Cuidado Integrado",
                link: "/cuidado-integrado",
                target: "_self",
            },
        ],
        logo: "/Site/logo_aurora_prestador.svg",
        textColor: "darkPink",
    },
];

const colors = {
    orange: "bg-orange1",
    purple: "bg-darkPurple",
    pink: "bg-pink2",
    yellow: "bg-yellow",
    white: "text-white",
    darkPink: "text-pink2",
};

export default function HeaderSiteIsland({ type }: Props) {
    const expandedInput = useSignal(false);
    const option = headerOptions.find((option) => option.name === type);
    if (!option) return null;
    const buttonsArr = headerOptions.filter((item) => item.name !== type);
    const startIndex = buttonsArr.findIndex((item) => item.id > option.id);

    let orderedOptions;
    if (startIndex === -1) {
        orderedOptions = [...buttonsArr];
    } else {
        orderedOptions = [
            ...buttonsArr.slice(startIndex),
            ...buttonsArr.slice(0, startIndex),
        ];
    }

    const backgroundColors = {
        1: "bg-orange4",
        2: "bg-darkPurple2",
        3: "bg-pink6",
        4: "bg-pink6",
    };
    return (
        <div className="flex justify-center px-10 lg:px-0">
            <div className="flex gap-6 w-full ">
                <div className="w-full">
                    <div className="flex justify-end lg:justify-between px-7 lg:px-16">
                        <div className="hidden lg:flex gap-3">
                            <a
                                href={option?.link}
                                className={`relative font-bold ${
                                    option?.name === "prestador"
                                        ? "text-orange1"
                                        : "text-white"
                                } ${
                                    colors[
                                        option.color
                                    ]
                                } rounded-t-[20px] px-5 py-1`}
                            >
                                {/*Aqui entra todo o código que tirei*/}
                                <div
                                    className={`absolute ${
                                        colors[
                                            option.color
                                        ]
                                    } w-6 h-6 -bottom-[6px] left-0 transform -translate-x-full`}
                                >
                                    <div
                                        className={`w-full h-full ${
                                            backgroundColors[option.id]
                                        }`}
                                        style={{
                                            clipPath: "circle(101.8% at 1% 1%)",
                                        }}
                                    >
                                    </div>
                                </div>
                                <div
                                    className={`absolute ${
                                        colors[
                                            option.color
                                        ]
                                    } w-6 h-6 -bottom-[6px] right-0 transform translate-x-full`}
                                >
                                    <div
                                        className={`w-full h-full ${
                                            backgroundColors[option.id]
                                        }`}
                                        style={{
                                            clipPath: "circle(101.8% at 99% 0)",
                                        }}
                                    >
                                    </div>
                                </div>
                                <div
                                    className={`absolute ${
                                        colors[option.color]
                                    } w-full h-2 -bottom-2 left-0`}
                                >
                                </div>
                                <span className="relative z-10">
                                    {option.title}
                                </span>
                            </a>

                            {orderedOptions.map((headerOption, index) => (
                                <a
                                    key={headerOption.id}
                                    href={headerOption.link}
                                    target={headerOption.target}
                                    className={` ${
                                        colors[headerOption?.textColor]
                                    } ${
                                        colors[
                                            headerOption.color
                                        ]
                                    } rounded-[20px] px-5 py-1 z-10`}
                                >
                                    {headerOption.title}
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-9 text-white">
                            <div className="relative hidden lg:flex items-center gap-9">
                                <LoggedAreasBtn option={option} />
                                <a href="/perguntas-frequentes">
                                    Perguntas Frequentes
                                </a>
                                <a href="/solicitar-cotacao">
                                    Quero ser Cliente
                                </a>
                            </div>
                            {
                                /*
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-1 font-semibold">
                                    <span
                                        className="cursor-pointer"
                                        id="userway-trigger"
                                    >
                                        A+
                                    </span>
                                    <span className="cursor-pointer">
                                        A-
                                    </span>
                                </div>
                                <img
                                    src={"/Site/contrast-icon.svg"}
                                    alt="Contrast Icon"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        globalThis?.UserWay
                                            .contrastEnable();
                                    }}
                                />
                            </div>*/
                            }
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-12 justify-between ${
                            colors[option.color]
                        } p-7 lg:p-16 mt-[6px] rounded-[20px] h-20 lg:h-48`}
                        onClick={() => expandedInput.value = false}
                    >
                        <a href="/">
                            <img
                                src={option.name === "prestador"
                                    ? "/Site/logo_aurora_prestador.svg"
                                    : "/Site/default_logo_aurora.svg"}
                                alt="Aurora Logo"
                                width={140}
                                className="w-28 lg:w-44"
                            />
                        </a>

                        <HeaderMobileMenuBtn option={option} />

                        <SearchButtonContainer
                            option={option}
                            expandedInput={expandedInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
