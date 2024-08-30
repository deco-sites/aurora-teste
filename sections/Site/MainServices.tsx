import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { serviceCards } from "site/helpers/Site/service-cards.ts";
import ServiceCardIsland from "site/islands/Site/service-card-island.tsx";
import ColorfullButton from "site/components/Site/colorfull-btn.tsx";
import { FnContext } from "deco/types.ts";
import { Device } from "apps/website/matchers/device.ts";

export interface Props {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
}

export interface IPhoto {
    photo: Props;
}

export interface IPhotoProps {
    device: Device;
    photo: Props;
}

export default function Section({ photo, device }: IPhotoProps) {
    return (
        <>
            <div className="flex justify-center lg:width-calc">
                <div className="flex gap-6 lg:w-[1400px]">
                    <div className="bg-white flex flex-col gap-14 pt-20 pb-24 w-screen">
                        <div className="flex px-10 lg:px-0 lg:gap-5">
                            <div className="hidden lg:flex w-1/2 rounded-3xl">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    className="w-full h-full rounded-3xl object-cover"
                                />
                            </div>
                            <div className="lg:w-1/2 py-12 px-12 rounded-3xl flex flex-col bg-gray4 lg:pt-24 lg:pb-20 lg:px-16">
                                <span className="font-sora text-black opacity-60 text-4xl lg:text-3xl font-semibold pb-5">
                                    Principais serviços <br /> ao beneficiário
                                </span>
                                <span className="font-sora text-lg text-black opacity-40 pb-10">
                                    Na área do beneficiário da Aurora, você
                                    encontra tudo o que precisa para cuidar da
                                    sua saúde.
                                </span>
                                <div>
                                    <ColorfullButton
                                        bgColor={"pink"}
                                        textColor={"yellow"}
                                        text={"Acesse o seu perfil"}
                                        link={device === "desktop"
                                            ? "https://aurorasaude.plataforma-beneficiario.mosiaomnichannel.com.br/"
                                            : "https://play.google.com/store/apps/details?id=br.com.mobilesaude.aurorasaude&hl=pt&gl=US&pli=1"}
                                        targetBlank
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex px-10 lg:pl-0 gap-5 overflow-x-scroll scrollbar-none lg:overflow-auto lg:justify-between">
                            <ServiceCardIsland cards={serviceCards} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
