export interface IDataCell {
    text: string;
}

export default function DataCellText({ text }: IDataCell) {
    return (
        <div className="bg-black bg-opacity-[0.02] rounded-[10px] h-[110px] flex justify-center items-center text-black text-opacity-40 text-lg">
            {text}
        </div>
    );
}
