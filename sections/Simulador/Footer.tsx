import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  href?: string;
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  text?: string;
}

interface SimulatorFooterProps {
  ansNumber: number;
  cnpj: string;
  address: string;
}

function Footer({
  /*image =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/d7aa9290-074f-417c-99c3-5b0587c8c2ee",
  href = "https://deco.cx/",
  text = "Made with",
  alt = "Made with deco.cx",
  height = 20,
  width = 50,*/
  ansNumber,
  cnpj,
  address,
}: SimulatorFooterProps) {
  return (
    <div className="bg-gray1 lg:bg-transparent flex py-6 justify-center lg:border-t-[#f0ecec] lg:border-t-[1px] mt-12 lg:width-calc">
      <footer className="flex flex-col gap-6 lg:flex-row items-center justify-between text-[#bcbcbc] text-xs lg:w-[1400px]">
        <div className="flex items-center gap-12">
          <div className="bg-black p-1 inline-block">
            <div className="border-white border-[1px] p-[5px] inline-block">
              <span className="p-2">
                ANS Nº: {ansNumber}
              </span>
            </div>
          </div>

          <span>CNPJ: {cnpj}</span>
        </div>
        <span className="hidden text-center lg:flex">
          Endereço: {address}
        </span>
        <Image
          src={"/Simulador/ans-logo.png"}
          alt="ANS Logo"
          width=""
          height=""
          className=""
        />

        <span className="text-center lg:hidden">
          Endereço: {address}
        </span>
        <span>Todos os Direitos Reservados © 2023</span>
      </footer>
    </div>
  );
}

export default Footer;
