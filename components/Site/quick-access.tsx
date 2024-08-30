import QuickAccessIcon from "site/components/Site/quick-access-icon.tsx";

export default function QuickAccess() {
    return (
        <div className="flex justify-between items-center px-16 py-14 rounded-[20px] bg-gradient-to-r from-pink1 to-orange4">
            <span className="text-white font-sora font-medium text-xl">
                Acesso rápido:
            </span>

            <QuickAccessIcon
                text={"Boletos"}
                icon={"CalendarIcon"}
                link={"#"}
            />
            <QuickAccessIcon
                text={"Rede Credenciada"}
                icon={"WhitePlusSquare"}
                link={"#"}
            />
            <QuickAccessIcon
                text={"Telemedicina"}
                icon={"MobilePhoneIcon"}
                link={"#"}
            />
            <QuickAccessIcon
                text={"Autorizações"}
                icon={"ClipBoardIcon"}
                link={"#"}
            />
            <QuickAccessIcon
                text={"Guias e Documentos"}
                icon={"FileIcon"}
                link={"#"}
            />
        </div>
    );
}
