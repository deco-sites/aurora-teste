import { ImageWidget } from "apps/admin/widgets.ts";
import { Device } from "apps/website/matchers/device.ts";
import Image from "apps/website/components/Image.tsx";
import { FnContext } from "deco/types.ts";

//DesktopText: Dúvidas, reclamações<br />ou sugestões? Envie <br />uma mensagem.
//MobileText: Dúvidas,<br /> reclamações<br />ou sugestões? <br />Envie uma <br />mensagem.

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

const DEFAULT_PROPS = {
    preload: true,
};

export interface Props {
    image?: Banner;
    /**
     * @description Check this option when this banner is the biggest image on the screen for image optimizations
     */
    preload?: boolean;
    desktopTitle?: string;
    mobileTitle?: string;
    desktopText?: string;
    mobileText?: string;
    textColor: "Laranja" | "Amarelo" | "Branco";
    titleFontSize?: "24" | "26" | "30";
    textFontSize?: "16";
    titleFontWeight?: "bold" | "semi-bold";
    textFontWeight?: "regular" | "semi-bold";
    hasButton?: boolean;
    buttonColor?: "Rosa";
    buttonText?: string;
}

const textColors = {
    Laranja: "text-orange4",
    Amarelo: "text-yellow",
    Branco: "text-white",
};

const buttonColors = {
    Rosa: "bg-pink6",
};

const fontSizes = {
    "16": "text-base",
    "24": "text-2xl",
    "26": "text-[26px]",
    "30": "text-3xl",
};

const fontWeights = {
    regular: "font-regular",
    bold: "font-bold",
    "semi-bold": "font-semibold",
};

interface BannerSectionProps {
    image: Banner;
    desktopTitle?: string;
    mobileTitle?: string;
    desktopText?: string;
    mobileText?: string;
    textColor: keyof typeof textColors;
    titleFontSize: keyof typeof fontSizes;
    textFontSize: keyof typeof fontSizes;
    titleFontWeight: keyof typeof fontWeights;
    textFontWeight: keyof typeof fontWeights;
    hasButton: boolean;
    buttonColor: keyof typeof buttonColors;
    buttonText: string;
    device: Device;
}

export default function BannerSection(
    {
        image,
        desktopTitle,
        mobileTitle,
        desktopText,
        mobileText,
        textColor,
        titleFontSize,
        textFontSize,
        titleFontWeight,
        textFontWeight,
        hasButton,
        buttonColor,
        buttonText,
        device,
    }: BannerSectionProps,
) {
    const { alt, mobile, desktop } = image;

    return (
        <div className="relative flex rounded-3xl px-10 lg:px-0 w-full max-w-full">
            {device !== "desktop" && (
                <>
                    <div className="flex flex-col gap-5 absolute top-1/2 transform -translate-y-1/2 left-16 right-16 w-auto max-w-full font-sora">
                        {mobileTitle && (
                            <span
                                className={`break-words overflow-hidden ${
                                    fontSizes[titleFontSize]
                                } ${textColors[textColor]} ${
                                    fontWeights[titleFontWeight]
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: mobileTitle,
                                }}
                            >
                            </span>
                        )}
                        {mobileText && (
                            <span
                                className={` break-words overflow-hidden ${
                                    fontWeights[textFontWeight]
                                } ${textColors[textColor]} ${
                                    fontSizes[textFontSize]
                                }`}
                                dangerouslySetInnerHTML={{ __html: mobileText }}
                            />
                        )}
                        {hasButton && (
                            <a href="/materiais-de-apoio">
                                <button
                                    className={`text-white py-2 px-8 rounded-full ${
                                        buttonColors[buttonColor]
                                    }`}
                                >
                                    {buttonText}
                                </button>
                            </a>
                        )}
                    </div>
                    <Image
                        class="object-cover w-full h-full rounded-[20px]"
                        src={mobile.image}
                        alt={alt}
                        width={mobile.width ?? 350}
                        height={mobile.height ?? 350}
                        preload
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </>
            )}
            {device === "desktop" && (
                <>
                    <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 left-12 pr-24 font-sora w-full items-center">
                        <div className="flex flex-col gap-5">
                            {desktopTitle && (
                                <span
                                    className={` ${fontSizes[titleFontSize]} ${
                                        textColors[textColor]
                                    } ${fontWeights[titleFontWeight]}`}
                                    dangerouslySetInnerHTML={{
                                        __html: desktopTitle,
                                    }}
                                >
                                </span>
                            )}

                            {desktopText && (
                                <span
                                    className={` ${
                                        fontWeights[textFontWeight]
                                    } ${textColors[textColor]} ${
                                        fontSizes[textFontSize]
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: desktopText,
                                    }}
                                />
                            )}
                        </div>
                        {hasButton && (
                            <a href="/materiais-de-apoio">
                                <button
                                    className={`text-white py-3 px-16 rounded-full ${
                                        buttonColors[buttonColor]
                                    }`}
                                >
                                    {buttonText}
                                </button>
                            </a>
                        )}
                    </div>
                    <Image
                        class="object-cover w-full h-full rounded-[20px]"
                        src={desktop.image}
                        alt={alt}
                        width={desktop.width ?? 1436}
                        height={desktop.height ?? 335}
                        preload
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </>
            )}
        </div>
    );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
