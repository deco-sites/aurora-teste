import NewsCard from "site/components/Site/news-card.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/Site/sliderjs.tsx";
import { useId } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";

export default function NewsPageTemplateIsland(
    { image, date, title, text, relatedsNews, galleryImages, device },
) {
    //console.log("Imagens", galleryImages);
    //console.log("Device:", device);

    const currentURL = globalThis.location.href;

    return (
        <>
            <div className="flex justify-center bg-white lg:bg-gray4">
                <div className="lg:max-w-[1400px] w-full pt-12 lg:pb-16 lg:py-16 flex flex-col">
                    <div className="flex flex-col lg:flex-row gap-7 w-full">
                        <div className="lg:w-3/5 px-10 lg:px-0">
                            <div className="relative">
                                <span className="hidden lg:inline-block font-bold text-orange4 cursor-pointer">
                                    Voltar
                                </span>
                                <hr className="hidden lg:flex absolute -bottom-6 left-0 h-0.5 bg-black opacity-10 w-full">
                                    <span className="hidden lg:flex hr-extend-left">
                                    </span>
                                </hr>
                            </div>

                            <div className="flex flex-col lg:mt-20">
                                <article>
                                    <header className="flex flex-col gap-[10px]">
                                        <span className="text-pink1">
                                            {date}
                                        </span>
                                        <h1
                                            className="font-sora font-bold text-black text-opacity-50 text-2xl mb-5 lg:mb-11"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        >
                                        </h1>
                                    </header>
                                    <div className="flex lg:hidden flex-col gap-6 mb-8">
                                        <span className="text-gray10 font-semibold">
                                            Compartilhe:
                                        </span>
                                        <div className="flex gap-4">
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
                                                target="_blank"
                                            >
                                                <Image
                                                    src={"/Site/facebook-icon-news-page.svg"}
                                                    alt={"Icon"}
                                                />
                                            </a>
                                            <a
                                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`}
                                                target="_blank"
                                            >
                                                <Image
                                                    src={"/Site/linkedin-icon-news-page.svg"}
                                                    alt={"Icon"}
                                                />
                                            </a>
                                            <a
                                                href={`https://api.whatsapp.com/send?text=${currentURL}`}
                                                target="_blank"
                                            >
                                                <Image
                                                    src={"/Site/whatsapp-icon-news-page.svg"}
                                                    alt={"Icon"}
                                                />
                                            </a>
                                            <a
                                                href={`https://t.me/share?url=${currentURL}`}
                                                target="_blank"
                                            >
                                                <Image
                                                    src={"/Site/telegram-icon-news-page.svg"}
                                                    alt={"Icon"}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <Image
                                        src={image.image}
                                        alt={image.alt}
                                        className="w-full rounded-[20px] mb-8 lg:mb-16"
                                    />
                                    <section
                                        className="mb-12 text-black text-opacity-70"
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                    >
                                    </section>
                                    {device === "desktop" && (
                                        <div className="grid grid-cols-3 gap-3">
                                            {galleryImages && (
                                                galleryImages.map((item) => (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.alt}
                                                        className="rounded-[20px]"
                                                    />
                                                ))
                                            )}
                                        </div>
                                    )}

                                    {device === "mobile" && (
                                        <Slider className="h-full relative carousel carousel-center w-full col-span-full row-span-full gap-6 rounded-[20px]">
                                            {galleryImages && (
                                                galleryImages.map((item) => (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.alt}
                                                        className="rounded-[20px]"
                                                    />
                                                ))
                                            )}
                                        </Slider>
                                    )}
                                </article>
                            </div>
                        </div>
                        <div className="lg:w-2/5">
                            <div className="hidden lg:flex flex-col gap-6 mb-28">
                                <span className="text-gray10 font-semibold">
                                    Compartilhe:
                                </span>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.facebook.com/share_channel/?link=http://localhost:8000/noticias-noticia4"
                                        target="_blank"
                                    >
                                        <Image
                                            src={"/Site/facebook-icon-news-page.svg"}
                                            alt={"Icon"}
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/shareArticle?mini=true&url=http%3A//localhost%3A8000/noticias-noticia4"
                                        target="_blank"
                                    >
                                        <Image
                                            src={"/Site/linkedin-icon-news-page.svg"}
                                            alt={"Icon"}
                                        />
                                    </a>
                                    <a
                                        href="https://api.whatsapp.com/send?text=http://localhost:8000/noticias-noticia4"
                                        target="_blank"
                                    >
                                        <Image
                                            src={"/Site/whatsapp-icon-news-page.svg"}
                                            alt={"Icon"}
                                        />
                                    </a>
                                    <a
                                        href="https://t.me/share/url?url=http%3A//localhost%3A8000/noticias-noticia4&text="
                                        target="_blank"
                                    >
                                        <Image
                                            src={"/Site/telegram-icon-news-page.svg"}
                                            alt={"Icon"}
                                        />
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col bg-gray4 px-10 lg:px-0 py-12 lg:py-0">
                                <span className="font-semibold text-gray10 mb-7">
                                    Notícias<br /> Relacionadas:
                                </span>
                                <div className="flex flex-col gap-7">
                                    {relatedsNews.map((relatedNew) => (
                                        <NewsCard
                                            imageSrc={relatedNew.image.image}
                                            alt={relatedNew.image.alt}
                                            date={relatedNew.date}
                                            title={relatedNew.title}
                                            link={relatedNew.link}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
