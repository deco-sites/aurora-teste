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

export default function Section({ type }: Props) {
    return <HeaderSiteIsland type={type} />;
}
