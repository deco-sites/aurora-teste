import Image from "apps/website/components/Image.tsx";

export interface IDataCellBoolean {
    value: boolean;
}

export default function DataCellBoolean({ value }: IDataCellBoolean) {
    return (
        <div className="bg-black bg-opacity-[0.02] rounded-[10px] h-[110px] flex justify-center items-center text-black text-opacity-40 text-lg">
            {value
                ? <Image src="/Site/check.svg" alt="Check" />
                : <Image src="/Site/not-check.svg" alt="Not Check" />}
        </div>
    );
}
