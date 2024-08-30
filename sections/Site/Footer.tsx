import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

export default function Footer() {
    return (
        <>
            <div className="flex justify-center bg-pink3">
                <div className="lg:max-w-[1400px] w-full pt-24 pb-16">
                    <footer className="flex flex-col text-white px-10 lg:px-0">
                        <div className="border-b border-b-white lg:border-none pb-12 lg:pb-0 flex mb-10 gap-12 items-center">
                            <Image
                                src={"/Site/Footer/aurora-logo.svg"}
                                alt={""}
                            />
                            <div className="flex gap-5">
                                {
                                    /*
                                <a href="#">
                                    <Icon
                                        class="h-6 w-6"
                                        id="FacebookFooterIcon"
                                        size={24}
                                    />
                                </a>
                                */
                                }
                                <a
                                    href="https://www.instagram.com/souaurorasaude"
                                    target="_blank"
                                >
                                    <Icon
                                        class="h-6 w-6"
                                        id="InstagramFooterIcon"
                                        size={24}
                                    />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/souarorasaude/"
                                    target="_blank"
                                >
                                    <Icon
                                        class="h-6 w-6"
                                        id="LinkedinFooterIcon"
                                        size={24}
                                    />
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send?phone=553140002105"
                                    target="_blank"
                                >
                                    <Icon
                                        class="hidden lg:flex h-6 w-6"
                                        id="WhatsappFooterIcon"
                                        size={24}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="w-full flex justify-center lg:justify-start text-base pb-20">
                            <div className="hidden lg:flex lg:w-3/5 justify-between border-r border-r-white p-12 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className="font-semibold mb-6">
                                        Sou cliente
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        <a href="/quem-somos" className="w-fit">
                                            Quem somos
                                        </a>
                                        <a
                                            href="/nossos-planos"
                                            className="w-fit"
                                        >
                                            Nossos planos
                                        </a>
                                        <a
                                            href="/jornada-de-cuidado"
                                            className="w-fit"
                                        >
                                            Jornada de Cuidado
                                        </a>
                                        <a href="/noticias" className="w-fit">
                                            Notícias
                                        </a>
                                        <a
                                            href="/solicitar-cotacao"
                                            className="w-fit"
                                        >
                                            Cotação
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold mb-6">
                                        Precisa de Ajuda?
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        <a href="/ouvidoria" className="w-fit">
                                            Ouvidoria
                                        </a>
                                        <a
                                            href="/perguntas-frequentes"
                                            className="w-fit"
                                        >
                                            Perguntas Frequentes
                                        </a>
                                        <a
                                            href="/fale-com-a-gente"
                                            className="w-fit"
                                        >
                                            Fale com a Gente
                                        </a>
                                        <a
                                            href="/trabalhe-conosco"
                                            className="w-fit"
                                        >
                                            Trabalhe conosco
                                        </a>
                                        <a
                                            href="/politicas-de-privacidade"
                                            className="w-fit"
                                        >
                                            Políticas de Privacidade
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold mb-6">
                                        Sou corretor
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        <a href="/corretor" className="w-fit">
                                            Sou corretor
                                        </a>
                                        <a
                                            href="/seja-um-corretor"
                                            className="w-fit"
                                        >
                                            Seja um Corretor
                                        </a>
                                        <a
                                            href="/materiais-de-apoio"
                                            className="w-fit"
                                        >
                                            Materiais de Apoio
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold mb-6">
                                        Prestador
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href="/seja-um-prestador"
                                            className="w-fit"
                                        >
                                            Seja um Prestador
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-2/5 text-center lg:text-left items-center lg:items-start flex flex-col gap-8 lg:py-12 lg:pl-20">
                                <div className="flex flex-col gap-4">
                                    <span>Precisa de ajuda?</span>
                                    <a
                                        href="https://api.whatsapp.com/send?phone=553140002105"
                                        target="_blank"
                                        className="flex gap-2 items-center"
                                    >
                                        <Icon
                                            class="h-5 w-5"
                                            id="WhatsappFooterIcon"
                                            size={20}
                                        />
                                        <span>Tire dúvidas no Whatsapp</span>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span>
                                        Já tem o plano e quer falar conosco?
                                        Ligue para:
                                    </span>

                                    <a
                                        href="tel:40002105"
                                        className="flex gap-2 items-center justify-center lg:justify-start"
                                    >
                                        <Icon
                                            class="h-5 w-5"
                                            id="PhoneFooterIcon"
                                            size={17}
                                        />
                                        <span>4000 2105</span>
                                    </a>
                                </div>

                                <div className="hidden lg:flex gap-3">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=br.com.mobilesaude.aurorasaude&hl=pt&gl=US"
                                        target="_blank"
                                    >
                                        <Image
                                            src={"/Site/Footer/android.svg"}
                                            alt={""}
                                        />
                                    </a>
                                    <a
                                        href="https://apps.apple.com/br/app/aurora-sa%C3%BAde/id6469621364"
                                        target="_blank"
                                    >
                                        <Image
                                            src={"/Site/Footer/apple.svg"}
                                            alt={""}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row items-center justify-between text-sm border-t border-t-white p-8">
                            <span className="block lg:hidden mb-4">
                                CNPJ: 49.955.478/0001-64
                            </span>
                            <span className="block lg:hidden mb-6 text-center">
                                Endereço: Rua Ministro Orozimbo Nonato, 422 -
                                Sala 903 - Vila da Serra - Nova Lima - MG
                            </span>
                            <div className="hidden lg:flex items-center gap-12">
                                <div className="bg-black p-1 inline-block">
                                    <div className="border-white border-[1px] p-[5px] inline-block">
                                        <span className="p-2">
                                            ANS Nº: 423629
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Image
                                src={"/Site/Footer/ans-logo.svg"}
                                alt={""}
                                className="hidden lg:block"
                            />
                            <div className="flex lg:hidden justify-between w-full mb-6">
                                <div className="flex items-center gap-12">
                                    <div className="bg-black p-1 inline-block">
                                        <div className="border-white border-[1px] p-[5px] inline-block">
                                            <span className="p-2">
                                                ANS Nº: 423629
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Image
                                    src={"/Site/Footer/ans-logo.svg"}
                                    alt={""}
                                />
                            </div>
                            <span className="hidden lg:block">
                                CNPJ: 49.955.478/0001-64
                            </span>
                            <span className="hidden lg:block">
                                Endereço: Rua Ministro Orozimbo Nonato, 422 -
                                Sala 903 - Vila da Serra - Nova Lima - MG
                            </span>
                            <span className="block lg:hidden mb-5">
                                Política de Privacidade
                            </span>
                            <span>Todos os Direitos Reservados © 2023</span>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
