import Icon from "site/components/ui/Icon.tsx";

export default function FloatingButtons() {
    return (
        <>
            <a
                className="fixed bottom-24 mx-auto left-1/2 transform -translate-x-1/2 lg:right-20 lg:left-auto flex gap-8"
                href="/solicitar-cotacao"
                style={{ zIndex: 999 }}
            >
                <button className="whitespace-nowrap flex gap-2 bg-yellow text-orange1 py-4 px-6 rounded-full relative button-border-effect">
                    <Icon
                        class="h-auto"
                        id="CalculatorIcon"
                        strokeWidth={1}
                        size={24}
                    />
                    Solicite sua cotação
                </button>
            </a>

            {
                /*
            <div
                className="fixed bottom-24 right-20 flex gap-8"
                style={{ zIndex: 999 }}
            >

                <button className="flex gap-2 bg-orange1 text-yellow py-4 px-6 rounded-full">
                    <Icon
                        class="h-auto"
                        id="ChatIcon"
                        strokeWidth={1}
                        size={24}
                    />
                    Chat
                </button>

            </div>*/
            }
        </>
    );
}
