import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface ICardInfos {
    imageSrc: string;
    alt: string;
    date: string;
    title: string;
    link: string;
}

export default function NewsCard({ imageSrc, alt, date, title, link }) {
    return (
        <div className="flex flex-col flex-1">
            <div className="w-full">
                <a href={link}>
                    <Image
                        src={imageSrc}
                        alt={alt}
                        className="rounded-2xl w-full"
                    />
                </a>
            </div>
            <div className="flex flex-col gap-5 px-14 py-5">
                <a href={link} className="w-fit">
                    <span className="text-pink1 font-normal">
                        {date}
                    </span>
                </a>
                <a href={link} className="w-fit">
                    <span
                        className="text-black opacity-50 font-sora font-bold text-lg"
                        dangerouslySetInnerHTML={{ __html: title }}
                    >
                    </span>
                </a>
                <a href={link} className="w-fit">
                    <span className="text-orange4 font-black">
                        Leia mais
                    </span>
                </a>
            </div>
        </div>
    );
}
