import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Device } from "apps/website/matchers/device.ts";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/Site/sliderjs.tsx";
import { useId } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { signal, useSignal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import { textShortner } from "apps/website/components/_seo/helpers/textShortner.tsx";

export interface New {
    image: ImageWidget;
    date: string;
    title: string;
    link: string;
}

export interface Props {
    featuredNews: New;
    carouselNews: New[];
}

export interface OverlaidNewsBannerIslandProps {
    featuredNews: New;
    carouselNews: New[];
    device: Device;
}

export default function OverlaidNewsBannerIsland(
    { featuredNews, carouselNews, device }: OverlaidNewsBannerIslandProps,
) {
    const id = useId();
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeLink, setActiveLink] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = slideRefs.current.indexOf(
                            entry.target as HTMLDivElement,
                        );

                        if (index !== -1) {
                            const newActiveLink = carouselNews[index].link;
                            if (newActiveLink !== activeLink) {
                                setActiveLink(newActiveLink);
                            }
                        }
                    }
                });
            },
            {
                root: sliderContainerRef.current,
                threshold: 0.5, // Ajuste conforme necessário
            },
        );

        // Observa todos os slides novamente ao montar ou atualizar o carrossel
        slideRefs.current.forEach((slide) => {
            if (slide) observer.observe(slide);
        });

        // Limpeza quando o componente for desmontado
        return () => observer.disconnect();
    }, [carouselNews, activeLink]);

    return (
        <>
            <div className="relative flex items-center flex-col gap-10 h-[300px] bg-white lg:bg-gray4">
                <div className="flex px-10 lg:px-0 justify-center lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-10 w-full max-w-[1400px]">
                    <div className="absolute px-10 lg:px-0 inset-0 flex h-[400px] lg:h-[500px] justify-center -mt-28">
                        <div className="flex gap-6 max-w-[1400px] overflow-hidden rounded-[20px]">
                            <div className="relative w-full lg:w-2/3">
                                <div
                                    id={id}
                                    ref={sliderContainerRef}
                                    className="h-full grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
                                >
                                    <Slider className="h-full relative carousel carousel-center w-full col-span-full row-span-full gap-6 rounded-[20px]">
                                        {carouselNews.map((image, index) => {
                                            return (
                                                <Slider.Item
                                                    index={index}
                                                    className="relative carousel-item w-full"
                                                >
                                                    <div
                                                        ref={(
                                                            ref:
                                                                | HTMLDivElement
                                                                | null,
                                                        ) => (slideRefs
                                                            .current[index] =
                                                                ref)}
                                                        className="absolute flex gap-7 lg:gap-0 flex-col lg:flex-row justify-between bottom-24 lg:bottom-10 pl-10 pr-12 lg:pl-16 lg:pr-9 left-0 text-white w-full items-end"
                                                    >
                                                        <div className="flex flex-col gap-5">
                                                            <span
                                                                className="font-light"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        image
                                                                            .date,
                                                                }}
                                                            >
                                                            </span>
                                                            <span
                                                                className="flex font-sora font-bold text-2xl"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        image
                                                                            .title,
                                                                }}
                                                            >
                                                            </span>
                                                        </div>
                                                        <a
                                                            className="relative z-40"
                                                            href={image.link}
                                                        >
                                                            <button className="text-orange4 w-full lg:w-auto whitespace-nowrape font-bold text-xs lg:text-base bg-white bg-opacity-80 rounded-[20px] py-2 px-9 whitespace-nowrap mr-16">
                                                                Leia Mais
                                                            </button>
                                                        </a>
                                                    </div>

                                                    <Image
                                                        src={image.image}
                                                        alt={"Banner"}
                                                        className="max-w-full h-full w-full object-cover rounded-[20px]"
                                                    />
                                                </Slider.Item>
                                            );
                                        })}
                                    </Slider>
                                    <div className="absolute flex gap-7 lg:gap-0 flex-col lg:flex-row justify-between bottom-5 lg:bottom-8 pl-10 pr-12 lg:pl-16 lg:pr-9 left-0 text-white w-full items-end">
                                        <div className="flex w-full justify-center lg:justify-end items-start gap-44">
                                            <Slider.PrevButton>
                                                <svg className="relative w-7 h-7 lg:w-12 lg:h-12 transform -scale-x-100 cursor-pointer overflow-visible z-50">
                                                    <use href="/sprites.svg#NewsPageArrowRight">
                                                    </use>
                                                </svg>
                                            </Slider.PrevButton>

                                            <Slider.NextButton>
                                                <svg className="relative w-7 h-7 lg:w-12 lg:h-12 cursor-pointer overflow-visible z-50">
                                                    <use href="/sprites.svg#NewsPageArrowRight">
                                                    </use>
                                                </svg>
                                            </Slider.NextButton>
                                        </div>
                                    </div>

                                    <SliderJS
                                        rootId={id}
                                        interval={5 * 1e3}
                                        infinite
                                        alwaysGo
                                    />
                                </div>
                            </div>
                            <div className="hidden lg:flex relative w-1/3">
                                <Image
                                    src={featuredNews.image}
                                    alt={"Banner"}
                                    className="max-w-full h-full w-full object-cover rounded-[20px]"
                                />
                                <div className="absolute flex flex-col w-full pl-14 gap-5 bottom-10 left-0 text-white">
                                    <span className="font-light">
                                        {featuredNews.date}
                                    </span>
                                    <span
                                        className="font-sora font-bold text-2xl"
                                        dangerouslySetInnerHTML={{
                                            __html: featuredNews.title,
                                        }}
                                    >
                                    </span>
                                    <a
                                        href={featuredNews.link}
                                        className="w-fit"
                                    >
                                        <button className="self-start font-black">
                                            Leia mais
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
