import { useEffect, useState } from "preact/hooks";
import { getCookie } from "site/helpers/Site/getCookie.ts";
import { setCookie } from "site/helpers/Site/setCookie.ts";

export default function CookiesModalIsland() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Verifica se o cookie já existe
        const acceptedCookies = getCookie("cookiesAccepted");
        if (!acceptedCookies) {
            setShowModal(true); // Mostra o modal se o cookie não existir
        }
    }, []);

    const handleAcceptCookies = () => {
        // Define o cookie para expirar em 365 dias
        setCookie("cookiesAccepted", "true", 365);
        setShowModal(false); // Esconde o modal
    };

    const handleDeclineCookies = () => {
        // Define o cookie para expirar em 365 dias
        setCookie("cookiesAccepted", "false", 365);
        setShowModal(false); // Esconde o modal
    };

    if (!showModal) return null; // Se o modal não deve ser exibido, retorna null

    return (
        <>
            <div
                className="fixed bottom-16 left-8 right-4 lg:left-8 lg:max-w-max rounded-[20px] bg-gray4 flex flex-col lg:flex-row gap-4 py-9 px-10"
                style={{ zIndex: 9999 }}
            >
                <div className="flex flex-col lg:flex-row items-center text-black text-opacity-40 text-xs font-sora">
                    <div className="hidden lg:block">
                        <span>
                            A Aurora Saúde utiliza cookies essenciais para
                            possibilitar o<br />{" "}
                            bom funcionamento do site e pode coletar dados
                            de<br />{" "}
                            navegação para melhorar a sua experiência em
                            nossas<br />{" "}
                            plataformas de conteúdos e serviços.{" "}
                        </span>
                        <a
                            href="/politicas-de-privacidade"
                            className="underline cursor-pointer inline-block"
                        >
                            Política de Privacidade
                        </a>
                    </div>

                    <div className="flex flex-col items-center lg:hidden">
                        <span className="text-justify ">
                            A Aurora Saúde utiliza cookies essenciais para
                            possibilitar o bom funcionamento do site e pode
                            coletar dados de navegação para melhorar a sua
                            experiência em nossas plataformas de conteúdos e
                            serviços.
                        </span>
                        <a
                            href="/politicas-de-privacidade"
                            className="underline cursor-pointer"
                        >
                            Política de Privacidade
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <button
                        className="bg-yellow text-orange1 rounded-full py-2 px-8"
                        onClick={handleAcceptCookies}
                    >
                        Entendido
                    </button>
                    <button
                        className="text-black text-opacity-40 text-xs font-sora underline cursor-pointer"
                        onClick={handleDeclineCookies}
                    >
                        Rejeitar Todos
                    </button>
                </div>
            </div>
        </>
    );
}
