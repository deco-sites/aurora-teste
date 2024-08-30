import { Section } from "deco/blocks/section.ts";

export interface IColorfullWrapper {
    sections: Section[];
}

function ColorfullWrapper({ sections }: IColorfullWrapper) {
    return (
        <>
            <div className="flex items-center flex-col gap-10 py-8 bg-orange4 lg:bg-gradient-to-b from-orange4 via-orange4 to-pink1">
                <div className="flex lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-5 lg:gap-10 lg:max-w-[1400px] w-full">
                    {sections.map((section, index) => (
                        <section.Component key={index} {...section.props} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ColorfullWrapper;
