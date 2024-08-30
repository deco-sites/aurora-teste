import Icon from "site/components/ui/Icon.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";

export interface RedirectionsSectionProps {
    desktopTitle: string;
    mobileTitle: string;
    desktopText: string;
    mobileText: string;
    device: Device;
}

export interface Props {
    desktopTitle: string;
    mobileTitle: string;
    desktopText: string;
    mobileText: string;
}

export default function RedirectionsSection(
    { desktopTitle, mobileTitle, desktopText, mobileText, device }:
        RedirectionsSectionProps,
) {
    return (
        <>
            <div className="bg-inherit flex flex-col gap-20 px-10 pt-10 pb-20 lg:px-52 lg:pt-32 lg:pb-44">
                <div className="flex flex-col gap-4 lg:flex-row justify-between">
                    <span
                        className="text-yellow text-5xl font-sora font-semibold lg:w-2/3 leading-tight"
                        dangerouslySetInnerHTML={{
                            __html: device === "desktop"
                                ? desktopTitle
                                : mobileTitle,
                        }}
                    >
                    </span>
                    <span
                        className="text-white lg:w-1/3"
                        dangerouslySetInnerHTML={{
                            __html: device === "desktop"
                                ? desktopText
                                : mobileText,
                        }}
                    >
                    </span>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row justify-between">
                    <a href="#startJourney">
                        <button className="w-full bg-white rounded-full py-6 px-10 text-pink1 flex justify-between gap-9 font-medium lg:font-normal whitespace-nowrap">
                            Jornada de Cuidado
                            <Icon
                                class="h-auto"
                                id="PinkArrowDown"
                                strokeWidth={1}
                                size={20}
                            />
                        </button>
                    </a>
                    <a href="#appSection">
                        <button className="w-full bg-white rounded-full py-6 px-10 text-pink1 flex justify-between gap-9 font-medium lg:font-normal whitespace-nowrap">
                            App e Portal
                            <Icon
                                class="h-auto"
                                id="PinkArrowDown"
                                strokeWidth={1}
                                size={20}
                            />
                        </button>
                    </a>
                    <a href="#tourSection">
                        <button className="w-full bg-white rounded-full py-6 px-10 text-pink1 flex justify-between gap-9 font-medium lg:font-normal whitespace-nowrap">
                            Dúvidas Frequentes
                            <Icon
                                class="h-auto"
                                id="PinkArrowDown"
                                strokeWidth={1}
                                size={20}
                            />
                        </button>
                    </a>
                </div>
                {
                    /*
                <div className="flex justify-end">
                    <button className="flex gap-2 bg-pink1 text-gray4 border border-gray4 rounded-full py-4 px-7">
                        <Icon
                            class="h-auto text-gray4"
                            id="GrayChatIcon"
                            strokeWidth={1}
                            size={24}
                        />
                        Chat
                    </button>
                </div>*/
                }
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
