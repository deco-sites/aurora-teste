import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  /**
   * @format rich-text
   * @description the text of button
   */
  text?: string;
  icon?: ImageWidget;
  link?: string;
}

export interface Props {
  /*logo: {
    src: ImageWidget;
    alt: string;
    width: number;
  };*/
  buttonReceiveContact: CTA;
  buttonBackToSite: CTA;
}

export default function Section(
  { buttonReceiveContact, buttonBackToSite }: Props,
) {
  return (
    <div className="flex justify-center lg:width-calc z-50 bg-white ">
      <header className="fixed bg-white z-50 w-full flex items-center justify-center lg:justify-between h-32 lg:max-w-[1400px]">
        <Image
          src={"/Simulador/logo_simulador.png"}
          width={0}
          height={0}
          alt="Aurora Simulador Logo"
          className="object-cover w-80"
          /*style={{ width: `${logo.width}px` }}*/
        />

        <div className="hidden justify-center gap-7 lg:flex">
          <a
            href={buttonReceiveContact.link ??
              "https://wa.me/553140002105?text=Mensagem%20padr%C3%A3o"}
            target="_blank"
          >
            <button className="flex items-center gap-2 bg-gray5 text-gray7 text-xs px-7 rounded-full py-3">
              <div className="w-5 h-5 bg-no-repeat animate-sprite bg-cover">
              </div>

              {
                /*
              <Image
                  src={buttonReceiveContact.icon}
                  alt=""
                  className="w-5 animation-sprite"
                />*/
              }

              <div
                dangerouslySetInnerHTML={{ __html: buttonReceiveContact.text }}
              />
            </button>
          </a>

          <a href={buttonBackToSite.link ?? "/"}>
            <button className="bg-orange1 text-white text-xs px-7 rounded-full py-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: buttonBackToSite.text ?? "Voltar para o site",
                }}
              />
            </button>
          </a>
        </div>
      </header>
    </div>
  );
}
