import RequestYourQuote from "../../islands/Simulador/request-your-quote.tsx";

export default function FloatingButtons() {
    return (
        <>
            <RequestYourQuote />

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
