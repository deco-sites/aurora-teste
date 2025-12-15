import { ImageWidget } from "apps/admin/widgets.ts";
import OverlaidNewsBannerIsland from "site/islands/Site/overlaid-news-banner.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { type FnContext } from "@deco/deco";
/** @titleBy title */
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
export interface OverlaidNewsBannerProps {
  featuredNews: New;
  carouselNews: New[];
  device: Device;
}
export default function OverlaidNewsBanner(
  { featuredNews, carouselNews, device }: OverlaidNewsBannerProps,
) {
  return (
    <OverlaidNewsBannerIsland
      featuredNews={featuredNews}
      carouselNews={carouselNews}
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
