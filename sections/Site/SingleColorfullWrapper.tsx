import { Section } from "deco/blocks/section.ts";

export interface IColorfullWrapper {
    bgColor: "Laranja" | "Roxo" | "Rosa" | "Cinza";
    sections: Section[];
}

const bgColors = {
    "Laranja": "bg-orange4",
    "Roxo": "bg-darkPurple2",
    "Rosa": "bg-pink6",
    "Cinza": "bg-gray4",
};

function SingleColorfullWrapper({ sections, bgColor }: IColorfullWrapper) {
    return (
        <>
            <div
                className={`flex items-center flex-col gap-10 py-8 ${
                    bgColors[bgColor]
                }`}
            >
                <div className="flex lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-5 lg:gap-10 lg:max-w-[1400px] w-full">
                    {sections.map((section, index) => (
                        <section.Component key={index} {...section.props} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SingleColorfullWrapper;
