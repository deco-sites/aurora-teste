import ServiceCard from "site/components/Site/service-card.tsx";

export interface ICards {
    id: number;
    icon: string;
    text: string;
    link: string;
    target: string;
}

export interface Card {
    cards: ICards[];
}

export default function ServiceCardIsland({ cards }: Card) {
    return (
        <>
            {cards.map((card) => (
                <ServiceCard
                    key={card.id}
                    icon={card.icon}
                    text={card.text}
                    link={card.link}
                    target={card.target}
                />
            ))}
        </>
    );
}
