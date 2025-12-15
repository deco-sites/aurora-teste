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
            className="rounded-2xl w-full lg:max-h-[8rem] object-cover"
          />
        </a>
      </div>
      <div className="flex flex-col gap-5 px-14 py-5 h-full justify-between">
        <a href={link} className="w-fit h-1/3">
          <span className="text-pink1 font-normal">
            {date}
          </span>
        </a>
        <a
          href={link}
          className="w-fit min-h-1/3 lg:h-min flex justify-start flex-grow flex-shrink-0"
        >
          <span
            className="text-black opacity-50 font-sora font-bold text-lg"
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </span>
        </a>
        <a href={link} className="w-fit h-1/3">
          <span className="text-orange4 font-black">
            Leia mais
          </span>
        </a>
      </div>
    </div>
  );
}
