const CardColors = {
    "Roxo": "bg-purple text-white",
    "Laranja": "bg-orange1 text-white",
    "Verde": "bg-aquagreen text-white",
    "Amarelo": "bg-yellow text-purple",
};

export default function DiscoverDifferencesIsland({ cards }) {
    //console.log("aquii", cards);
    return (
        <>
            {cards.map((card, index) => (
                <div key={index} className="flex flex-col h-full">
                    <div className="flex flex-col lg:grid lg:grid-rows-4 gap-4 h-full">
                        <div
                            className={`row-span-2 ${
                                CardColors[card.cardColor]
                            } rounded-[20px] p-12 flex flex-col gap-7`}
                        >
                            <span className="font-sora font-bold text-2xl">
                                {card.title}
                            </span>
                            <span>{card.text}</span>
                        </div>
                        <div className="row-span-3 bg-white rounded-[20px] p-12 text-gray11 flex">
                            <div className="flex flex-col gap-14 lg:grid lg:grid-cols-2 lg:gap-2">
                                {card.details.map((detail, detailIndex) => (
                                    <div
                                        key={detailIndex}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={detail.icon}
                                            alt="Icon"
                                            className="w-14 h-14"
                                        />
                                        <span>{detail.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
