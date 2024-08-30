export interface ILineTitle {
    text: string;
}

export default function LineTitle({ text }: ILineTitle) {
    return (
        <div className="bg-black bg-opacity-5 rounded-[10px] h-[110px] flex justify-center items-center text-black text-opacity-60 text-lg">
            {text}
        </div>
    );
}
