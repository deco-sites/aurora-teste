import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Device } from "apps/website/matchers/device.ts";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { FnContext } from "deco/types.ts";
import SliderJS from "../../islands/Site/sliderjs.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
    /** @description desktop otimized image */
    desktop: {
        image: ImageWidget;
        width?: number;
        height?: number;
    };
    /** @description mobile otimized image */
    mobile: {
        image: ImageWidget;
        width?: number;
        height?: number;
    };
    /** @description Image's alt text */
    alt: string;
    link: string;
}

export interface Props {
    images?: Banner[];
    /**
     * @description Check this option when this banner is the biggest image on the screen for image optimizations
     */
    preload?: boolean;
    /**
     * @title Autoplay interval
     * @description time (in seconds) to start the carousel autoplay
     */
    interval?: number;
}

const DEFAULT_PROPS = {
    images: [],
    preload: true,
};

function BannerItem(
    { image, lcp, id, device }: {
        image: Banner;
        lcp?: boolean;
        id: string;
        device: Device;
    },
) {
    const {
        alt,
        mobile,
        desktop,
        link,
    } = image;

    return (
        <a
            id={id}
            href={link ?? "#"}
            aria-label="Banners"
            class="relative overflow-y-hidden w-full"
        >
            {device !== "desktop" && (
                <Image
                    class="object-cover w-full h-full"
                    src={mobile.image}
                    alt={alt}
                    width={mobile.width ?? 350}
                    height={mobile.height ?? 350}
                    preload
                    loading="eager"
                    fetchPriority="high"
                    decoding={"async"}
                />
            )}
            {device === "desktop" && (
                <Image
                    class="object-cover w-full h-full"
                    loading={lcp ? "eager" : "lazy"}
                    src={desktop.image}
                    alt={alt}
                    width={desktop.width ?? 1440}
                    height={desktop.height ?? 520}
                    fetchPriority={lcp ? "high" : "low"}
                    preload={lcp ? true : false}
                    decoding={"async"}
                />
            )}
        </a>
    );
}

function Dots({ images, interval = 0 }: Props) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: ` 
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
                }}
            />
            <ul class="absolute -bottom-6 lg:bottom-4 left-1/2 -translate-x-1/2 carousel justify-center col-span-full gap-4 z-10 row-start-4">
                {images?.map((_, index) => (
                    <li class="carousel-item">
                        <Slider.Dot index={index}>
                            <div class="py-5">
                                <div
                                    class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                                    style={{
                                        animationDuration: `${interval}s`,
                                    }}
                                />
                            </div>
                        </Slider.Dot>
                    </li>
                ))}
            </ul>
        </>
    );
}

function Buttons() {
    return (
        <>
            <div class="absolute top-1/2 -translate-y-1/2 -left-10 lg:left-10 flex items-center justify-center z-10">
                <Slider.PrevButton>
                    <Icon
                        class="text-black text-opacity-30 lg:text-white"
                        size={40}
                        id="ChevronLeft"
                        strokeWidth={2}
                    />
                </Slider.PrevButton>
            </div>
            <div class="absolute top-1/2 -translate-y-1/2 -right-10 lg:right-10 flex items-center justify-center z-10">
                <Slider.NextButton>
                    <Icon
                        class="text-black text-opacity-30 lg:text-white rotate-180"
                        size={40}
                        id="ChevronLeft"
                        strokeWidth={2}
                    />
                </Slider.NextButton>
            </div>
        </>
    );
}

function BannerCarousel(props: ReturnType<typeof loader>) {
    const id = useId();
    const { images, preload, interval, device } = {
        ...DEFAULT_PROPS,
        ...props,
    };

    return (
        <div className="flex justify-center lg:width-calc px-10 lg:px-0">
            <div className="flex gap-6 w-full">
                <div
                    id={id}
                    class="relative grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
                >
                    <Slider className="carousel carousel-center w-full col-span-full row-span-full gap-6 rounded-[20px]">
                        {images?.map((image, index) => {
                            const params = { promotion_name: image.alt };

                            return (
                                <Slider.Item
                                    index={index}
                                    class="carousel-item w-full"
                                >
                                    <BannerItem
                                        image={image}
                                        lcp={index === 0}
                                        id={`${id}::${index}`}
                                        device={device}
                                    />
                                </Slider.Item>
                            );
                        })}
                    </Slider>

                    {images && images.length > 1 && (
                        <>
                            <Buttons />

                            <Dots images={images} interval={interval} />

                            <SliderJS
                                rootId={id}
                                interval={interval && interval * 1e3}
                                infinite
                                alwaysGo
                            />
                        </>
                    )}
                </div>
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

export default BannerCarousel;
