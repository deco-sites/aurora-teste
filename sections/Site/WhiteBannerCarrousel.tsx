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
    image: ImageWidget;
    width?: number;
    height?: number;
    alt: string;
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
    } = image;

    return (
        <>
            {device !== "desktop" && (
                <div className="flex justify-center w-full h-full px-14">
                    <Image
                        class="object-contain"
                        loading={lcp ? "eager" : "lazy"}
                        src={image.image}
                        alt={alt}
                        width={image.width ?? 220}
                        height={image.height ?? 90}
                        fetchPriority={lcp ? "high" : "low"}
                        preload={lcp ? true : false}
                        decoding={"async"}
                    />
                </div>
            )}
            {device === "desktop" && (
                <div className="flex justify-between w-full h-full items-center lg:px-14">
                    <Image
                        class="object-contain max-h-24"
                        loading={lcp ? "eager" : "lazy"}
                        src={image.image}
                        alt={alt}
                        width={image.width ?? 220}
                        height={image.height ?? 90}
                        fetchPriority={lcp ? "high" : "low"}
                        preload={lcp ? true : false}
                        decoding={"async"}
                    />
                </div>
            )}
        </>
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
            <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
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
            <div class="absolute top-1/2 -translate-y-1/2 left-2 lg:left-10 flex items-center justify-center z-50">
                <Slider.PrevButton>
                    <Icon
                        className="text-aquagreen"
                        size={40}
                        id="ChevronLeft"
                        strokeWidth={2}
                    />
                </Slider.PrevButton>
            </div>
            <div class="absolute top-1/2 -translate-y-1/2 right-2 lg:right-10 flex items-center justify-center z-50">
                <Slider.NextButton>
                    <Icon
                        className="text-aquagreen rotate-180"
                        size={40}
                        id="ChevronLeft"
                        strokeWidth={2}
                    />
                </Slider.NextButton>
            </div>
        </>
    );
}

function WhiteBannerCarousel(props: ReturnType<typeof loader>) {
    const id = useId();
    const { images, preload, interval, device } = {
        ...DEFAULT_PROPS,
        ...props,
    };

    return (
        <div className="flex justify-center lg:width-calc">
            <div className="flex gap-6 w-full">
                <div
                    id={id}
                    class="relative grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
                >
                    <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
                        {device === "desktop" && (
                            <>
                                {images?.reduce((acc, image, index) => {
                                    // Agrupa os itens em pares de 2
                                    if (index % 2 === 0) {
                                        acc.push([image]);
                                    } else {
                                        acc[acc.length - 1].push(image);
                                    }
                                    return acc;
                                }, []).map((pair, pairIndex, array) => {
                                    const isLastItemOdd =
                                        array.length - 1 === pairIndex &&
                                        pair.length === 1;
                                    return (
                                        <Slider.Item
                                            key={pairIndex}
                                            index={pairIndex}
                                            className={`carousel-item w-full flex justify-center`}
                                        >
                                            <div className="flex justify-between px-14">
                                                {pair.map((image, index) => (
                                                    <BannerItem
                                                        key={index}
                                                        image={image}
                                                        lcp={index === 0}
                                                        id={`${id}::${
                                                            pairIndex * 2 +
                                                            index
                                                        }`}
                                                        device={device}
                                                        className={`w-${
                                                            isLastItemOdd
                                                                ? "1/2"
                                                                : "full"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </Slider.Item>
                                    );
                                })}
                            </>
                        )}
                        {device !== "desktop" && (
                            <>
                                {images?.map((image, index) => (
                                    <Slider.Item
                                        key={index}
                                        index={index}
                                        className={`carousel-item w-full flex justify-center`}
                                    >
                                        <BannerItem
                                            key={index}
                                            image={image}
                                            lcp={index === 0}
                                            id={index}
                                            device={device}
                                            className={`w-full`}
                                        />
                                    </Slider.Item>
                                ))}
                            </>
                        )}
                    </Slider>

                    {images && images.length > 1 && (
                        <>
                            <Buttons />

                            <SliderJS
                                rootId={id}
                                interval={5000}
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

export default WhiteBannerCarousel;
