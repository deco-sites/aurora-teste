import Image from "apps/website/components/Image.tsx";
import { useRef, useState } from "preact/hooks";
import { useClickOutsideListener } from "site/helpers/Site/useClickOutsideListener.ts";
import DropdownSections from "site/islands/Site/header-mobile-dropdown-sections.tsx";
import Icon from "site/components/ui/Icon.tsx";

export default function DropdownMobileMenu({ option, openerRef, setOpen }) {
    const dropdownRef = useRef(null);
    const secondDropdownRef = useRef(null);
    const [dropdownSectionsOpen, setDropdownSectionsOpen] = useState(false);
    const [openInputSearch, setOpenInputSearch] = useState(false);
    const [loggedAreasDropdown, setLoggedAreasDropdown] = useState(false);
    useClickOutsideListener(dropdownRef, openerRef, setOpen);

    const backgroundBtnColors = {
        1: "bg-orange6",
        2: "bg-purple3",
        3: "bg-pink8",
        4: "bg-yellow3",
    };

    const backgroundColors = {
        1: "bg-orange1",
        2: "bg-darkPurple",
        3: "bg-pink2",
        4: "bg-yellow",
    };

    const handleToggleOpen = () => {
        setDropdownSectionsOpen(!dropdownSectionsOpen);
    };

    const handleToggleSearch = () => {
        setOpenInputSearch(!openInputSearch);
    };

    const handleToggleLoggedAreas = () => {
        setLoggedAreasDropdown(!loggedAreasDropdown);
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 h-screen w-screen flex flex-col p-16 ${
                    backgroundColors[option.id]
                }`}
                ref={dropdownRef}
                style={{ zIndex: 99999 }}
            >
                <div className="relative flex justify-between items-center border-b border-b-white pb-8 pr-4 pt-2">
                    <div
                        className={`relative flex items-center gap-5 lg:hidden rounded-3xl ${
                            backgroundBtnColors[option.id]
                        } text-white px-5 py-2`}
                        onClick={handleToggleOpen}
                    >
                        {dropdownSectionsOpen && (
                            <DropdownSections
                                option={option}
                                openerRef={secondDropdownRef}
                                setOpen={setDropdownSectionsOpen}
                            />
                        )}

                        <span>Sou cliente</span>
                        <Image
                            src={"/Site/down-arrow.svg"}
                            alt=""
                            className=""
                        />
                    </div>

                    {openInputSearch && (
                        <>
                            <div
                                className={`absolute top-0 left-0 w-full ${
                                    backgroundColors[option.id]
                                } py-4 px-4 border border-white rounded-[10px] z-50`}
                            >
                                <div className="relative flex justify-between">
                                    <input
                                        type="text"
                                        id=""
                                        name=""
                                        placeholder={"Pesquise Aqui"}
                                        className="bg-transparent outline-none text-white placeholder:text-white"
                                    />
                                    <Image
                                        src={"/Site/search-icon.svg"}
                                        alt="Search Icon"
                                        className="w-6 h-6"
                                        onClick={() =>
                                            console.log("Realizar a busca")}
                                    />
                                    <Icon
                                        class="absolute top-1/2 transform -translate-y-1/2 -right-12 h-auto text-white"
                                        id="CloseIcon"
                                        strokeWidth={1}
                                        size={16}
                                        onClick={handleToggleSearch}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <Image
                        src={"/Site/search-icon.svg"}
                        alt="Search Icon"
                        className="w-6 h-6"
                        onClick={handleToggleSearch}
                    />
                </div>

                <div className="flex flex-col gap-7 text-white font-sora font-bold text-2xl pt-8 pb-24">
                    <a href="/quem-somos">
                        <span>Quem somos</span>
                    </a>
                    <a href="/nossos-planos">
                        <span>Nossos planos</span>
                    </a>
                    <a href="/jornada-de-cuidado">
                        <span>Jornada de cuidado</span>
                    </a>
                </div>
                <div className="flex flex-col py-7 border-y border-y-white">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <Image src={"/Site/user-icon.svg"} alt="" />
                            <span className="text-white font-bold text-sm">
                                Áreas Logadas
                            </span>
                        </div>
                        <Image
                            src={"/Site/arrow-down-square.svg"}
                            alt=""
                            onClick={handleToggleLoggedAreas}
                            className={`${
                                loggedAreasDropdown ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                    {loggedAreasDropdown && (
                        <div className="flex flex-col text-white gap-4 text-xs pl-7 mt-4">
                            <a
                                href="https://aurorasaude.plataforma-beneficiario.mosiaomnichannel.com.br/#/"
                                target="_blank"
                            >
                                <span>Sou Cliente</span>
                            </a>

                            <a
                                href="https://6167prd-plano.cloudmv.com.br/mvsaudeweb/#/login/empresa"
                                target="_blank"
                            >
                                <span>Sou Empresa</span>
                            </a>

                            <a
                                href="https://souaurorasaude.planium.io/web/login/entrar"
                                target="_blank"
                            >
                                <span>Sou Corretor</span>
                            </a>

                            <a
                                href="https://6167prd-plano.cloudmv.com.br/mvautorizadorguias/"
                                target="_blank"
                            >
                                <span>Sou Prestador</span>
                            </a>
                        </div>
                    )}
                </div>
                <div className="flex justify-between text-white text-xs py-7">
                    <a href="/perguntas-frequentes">
                        <span>Perguntas Frequentes</span>
                    </a>
                    <a href="/solicitar-cotacao">
                        <span>Quero ser Cliente</span>
                    </a>
                </div>
                <div className="flex justify-center pt-16">
                    <div
                        onClick={() => setOpen(false)}
                        className="flex gap-6 bg-yellow rounded-3xl py-3 px-20 text-pink2"
                    >
                        <span>Voltar</span>
                        <Image
                            src={"/Site/pink-back-arrow.svg"}
                            alt="Back Icon"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
