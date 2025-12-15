import { ImageWidget } from "apps/admin/widgets.ts";
import NewsPageTemplateIsland from "site/islands/Site/news-page-template.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { type FnContext } from "@deco/deco";
export interface Banner {
  image: ImageWidget;
  width?: number;
  height?: number;
  alt: string;
}
export interface Image {
  image: ImageWidget;
  width?: number;
  height?: number;
  alt: string;
}
/** @titleBy title */
export interface RelatedNews {
  image: Banner;
  date: string;
  title: string;
  link: string;
}
export interface Props {
  image: Banner;
  date: string;
  title: string;
  /**
   * @format rich-text
   * @description O texto da matéria
   */
  text: string;
  relatedsNews: RelatedNews[];
  galleryImages?: Image[];
}
export interface NewsPageProps {
  image: Banner;
  date: string;
  title: string;
  /**
   * @format rich-text
   * @description O texto da matéria
   */
  text: string;
  relatedsNews: RelatedNews[];
  galleryImages?: Image[];
  device: Device;
}
export default function NewsPage(
  { image, date, title, text, relatedsNews, galleryImages, device }:
    NewsPageProps,
) {
  return (
    <NewsPageTemplateIsland
      image={image}
      date={date}
      title={title}
      text={text}
      relatedsNews={relatedsNews}
      galleryImages={galleryImages}
      device={device}
    />
  );
}
export const loader = (props: Props, req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};
