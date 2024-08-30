import Image from "apps/website/components/Image.tsx";
import ColorfullButton from "site/components/Site/colorfull-btn.tsx";
import { Device } from "apps/website/matchers/device.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
    device: Device;
    handlePrev: () => void;
}

export default function LastWhiteCard({ device, handlePrev }: Props) {
    return (
        <div className="bg-white flex flex-col text-center gap-6 lg:gap-10 flex-shrink-0 items-center justify-center rounded-3xl w-80 lg:w-[550px] mx-2 px-10 py-14">
            <span className="font-sora text-xl lg:text-4xl text-pink1">
                O cuidado não acaba <br /> aqui, ele começa.
            </span>
            <a href="/jornada-de-cuidado" className="text-darkPurple">
                Descubra como fazemos diferente
            </a>
            <ColorfullButton
                bgColor="pink"
                textColor="white"
                text={"Saiba mais"}
                link={"/jornada-de-cuidado"}
            />
            {device === "mobile" && (
                <Icon
                    class="cursor-pointer h-auto -rotate-90 text-pink4"
                    id="ChevronUp"
                    strokeWidth={2}
                    size={36}
                    onClick={handlePrev}
                />
            )}
        </div>
    );
}
