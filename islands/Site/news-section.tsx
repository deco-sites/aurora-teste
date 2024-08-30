import { ImageWidget } from "apps/admin/widgets.ts";
import NewsCard from "site/components/Site/news-card.tsx";

export interface New {
    image: ImageWidget;
    altImage: string;
    date: string;
    title: string;
    link: string;
}

export interface Props {
    newsArr: New[];
}

export default function NewsSectionIsland({ newsArr }: Props) {
    return (
        <>
            {newsArr.map((noticia) => (
                <NewsCard
                    imageSrc={noticia.image}
                    alt={noticia.altImage}
                    date={noticia.date}
                    title={noticia.title}
                    link={noticia.link}
                />
            ))}
        </>
    );
}
