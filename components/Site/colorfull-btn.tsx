type BgColor = "pink" | "yellow" | "orange" | "green";
type TextColor = "white" | "pink" | "yellow" | "orange" | "green";

export interface IButtonProps {
    bgColor: BgColor;
    textColor: TextColor;
    text: string;
    link: string;
    targetBlank?: boolean;
}

const bgColors = {
    pink: "bg-pink1",
    yellow: "bg-yellow",
    orange: "bg-orange1",
    green: "bg-aquagreen",
};

const textColors = {
    white: "text-white",
    pink: "text-pink1",
    yellow: "text-yellow",
    orange: "text-orange1",
    green: "text-aquagreen2",
};

export default function ColorfullButton(
    { text, link, bgColor, textColor, targetBlank }: IButtonProps,
) {
    return (
        <a
            href={link}
            {...(targetBlank
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
        >
            <button
                className={`${bgColors[bgColor]} ${
                    textColors[textColor]
                } rounded-full px-10 py-5`}
            >
                {text}
            </button>
        </a>
    );
}
