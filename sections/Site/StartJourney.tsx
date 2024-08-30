import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";

export interface StartJourneyProps {
    device: Device;
}

export default function StartJourney({ device }: StartJourneyProps) {
    return (
        <div
            id="startJourney"
            className="relative flex flex-col lg:flex-row bg-gray4"
        >
            <div className="lg:w-1/2">
                <div className="flex flex-col gap-10 pt-14 px-14 pb-40 lg:pt-36 lg:pb-32 lg:pl-64 lg:pr-48">
                    <span className="text-pink1 font-sora text-5xl">
                        Saúde não se deixa para depois.
                    </span>
                    <span className="text-orange1">
                        É por isso que, na Aurora, acompanhamos a sua rotina e
                        seus hábitos diários para garantir o seu bem-estar antes
                        mesmo de qualquer doença aparecer. Isso significa que
                        não esperamos os problemas surgirem, cuidamos de você
                        desde o primeiro momento.
                        <br />
                        <br />
                        Aqui o cuidado com a sua saúde é integral, humano e
                        individual. Legal, né? Agora é hora de colocar tudo isso
                        em prática!
                    </span>
                    <a
                        href="http://app.marsaude.net/aurora/login"
                        target="_blank"
                    >
                        <button className="text-pink1 lg:text-yellow bg-white lg:bg-orange1 rounded-full lg:w-fit py-6 px-10 flex justify-between lg:gap-10 w-full">
                            Iniciar Jornada
                            <Icon
                                className={`h-auto ${
                                    device === "desktop" ? "" : "-rotate-90"
                                }`}
                                id={`${
                                    device === "desktop"
                                        ? "YellowArrowUp"
                                        : "PinkArrowDown"
                                }`}
                                strokeWidth={1}
                                size={20}
                            />
                        </button>
                    </a>
                </div>
            </div>
            <div className="relative lg:w-1/2">
                <Image
                    src={"/Site/care-journey-banner.png"}
                    alt={"Banner"}
                    className="min-h-[650px] lg:min-h-0 w-full object-cover"
                />
                <Image
                    src={"/Site/care-journey-seal.png"}
                    alt={"Banner"}
                    className="flex lg:hidden absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-52 h-52"
                />
            </div>
            <Image
                src={"/Site/care-journey-seal.png"}
                alt={"Banner"}
                className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60"
            />
        </div>
    );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
