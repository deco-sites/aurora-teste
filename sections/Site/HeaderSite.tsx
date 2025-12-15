import HeaderSiteIsland from "site/islands/Site/header-site.tsx";

export interface Props {
  /**
   * @description Type of Header
   */
  type: "cliente" | "empresa" | "corretor" | "prestador";
}

type Color = "orange" | "purple" | "pink" | "yellow" | "white" | "darkPink";

interface IheaderOptions {
  id: number;
  name: string;
  color: Color;
  title: string;
  menuItems: { text: string; link: string }[];
  logo: string;
  textColor: "white" | "darkPink";
}

export default function Section(props: ReturnType<typeof loader>) {
  return <HeaderSiteIsland type={props.type} opValue={props.opValue} />;
}

export const loader = (props: Props, req: Request, _ctx: FnContext) => {
  const op = new URL(req.url).search;
  const params = new URLSearchParams(op);
  const opValue = params.get("op");

  return {
    ...props,
    opValue: opValue,
  };
};
