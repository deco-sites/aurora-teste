import QuickAccessIcon from "site/components/Site/quick-access-icon.tsx";

export default function QuickAccess() {
  return (
    <div className="relative flex flex-col gap-5 lg:flex-row justify-between items-start lg:items-center py-10 lg:py-14 lg:px-16 rounded-[20px] bg-gradient-to-r from-pink1 to-orange4 overflow-x-hidden">
      <span className="text-white font-sora font-medium text-xl whitespace-nowrap pl-10 lg:pl-0">
        Acesso rápido:
      </span>

      <div className="relative overflow-x-auto w-full scrollbar-none px-10 lg:px-0">
        <div className="flex flex-row gap-4 lg:justify-between min-w-max">
          <QuickAccessIcon
            text={"Boletos"}
            icon={"CalendarIcon"}
            link={"https://6167prd-plano.cloudmv.com.br/mvsaudeweb/#/login/empresa"}
          />
          <QuickAccessIcon
            text={"Rede Credenciada"}
            icon={"WhitePlusSquare"}
            link={"https://6167prd-plano.cloudmv.com.br/mvsaudeweb/#/guia-medico"}
          />
          <QuickAccessIcon
            text={"Telemedicina"}
            icon={"MobilePhoneIcon"}
            link={"https://mksaude.clinicatempo.com.br/telemedicina-pa/#/login"}
          />
          <QuickAccessIcon
            text={"Autorizações"}
            icon={"ClipBoardIcon"}
            link={"https://6167prd-plano.cloudmv.com.br/mvautorizadorguias/"}
          />
          <QuickAccessIcon
            text={"Guias e Documentos"}
            icon={"FileIcon"}
            link={"/Site/Guias e Documentos - Aurora Saúde.zip"}
          />
        </div>
      </div>
    </div>
  );
}
