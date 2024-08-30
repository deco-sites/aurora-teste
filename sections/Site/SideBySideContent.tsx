import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Device } from "apps/website/matchers/device.ts";
import { FnContext } from "deco/types.ts";

export interface Banner {
    /** @description desktop optimized image */
    desktop: {
        image: ImageWidget;
        width?: number;
        height?: number;
    };
    /** @description mobile optimized image */
    mobile: {
        image: ImageWidget;
        width?: number;
        height?: number;
    };
    /** @description Image's alt text */
    alt: string;
}

export interface Section {
    image: Banner;
    title: string;
    text: string;
    boxColor: "Rosa" | "Laranja" | "Amarelo" | "Verde" | "Roxo";
    textColor: "Branco" | "Rosa";
    ImageSide: "Esquerda" | "Direita";
}

export interface Props {
    sections: Section[];
}

const textColors = {
    Branco: "text-white",
    Rosa: "text-pink2",
};

const boxColors = {
    Rosa: "bg-pink1",
    Laranja: "bg-orange1",
    Amarelo: "bg-yellow",
    Verde: "bg-aquagreen",
    Roxo: "bg-purple",
};

export interface SideBySideContentProps {
    sections: Section[];
    image: Banner;
    title: string;
    text: string;
    boxColor: "Rosa" | "Laranja" | "Amarelo" | "Verde" | "Roxo";
    textColor: "Branco" | "Rosa";
    ImageSide: "Esquerda" | "Direita";
    device: Device;
}

export default function SideBySideContent({
    sections,
    image,
    title,
    text,
    boxColor,
    textColor,
    ImageSide,
    device,
}: SideBySideContentProps) {
    const {
        mobile,
        desktop,
    } = image;

    //console.log("Device:", device);

    return (
        <div className="flex justify-center px-10 lg:px-0 bg-gray4">
            <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32 flex flex-col gap-5 lg:gap-20">
                {sections?.map((section) => {
                    const { mobile, desktop } = section.image;

                    return (
                        <div
                            className={`flex flex-col lg:flex-row gap-5 ${
                                section.ImageSide === "Esquerda"
                                    ? "lg:flex-row"
                                    : "lg:flex-row-reverse"
                            }`}
                        >
                            <div className="w-full lg:w-3/5">
                                {device !== "desktop"
                                    ? (
                                        <Image
                                            className="object-cover w-full h-full rounded-[20px]"
                                            src={mobile.image}
                                            alt={"Banner"}
                                            width={mobile.width ?? 360}
                                            height={mobile.height ?? 600}
                                            decoding="async"
                                        />
                                    )
                                    : (
                                        <Image
                                            className="object-cover w-full h-full rounded-[20px]"
                                            src={desktop.image}
                                            alt={"Banner"}
                                            width={desktop.width ?? 1440}
                                            height={desktop.height ?? 600}
                                            decoding="async"
                                        />
                                    )}
                            </div>
                            <div
                                className={`w-full lg:w-2/5 flex flex-col justify-center rounded-[20px] px-11 py-16 lg:px-20 lg:py-28 ${
                                    boxColors[section.boxColor]
                                } ${textColors[section.textColor]}`}
                            >
                                <h2 className="text-2xl font-bold mb-4">
                                    {section.title}
                                </h2>
                                <p>{section.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
