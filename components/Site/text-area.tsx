export interface ITextAreaProps {
    id: string;
    name: string;
    placeholder?: string;
    value: string;
    inputValueSetter: (value: string) => void;
    mask?: (value: string) => string;
}

export default function SiteTextArea(
    { id, name, placeholder, value, inputValueSetter, mask }: ITextAreaProps,
) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let myValue = e.target.value;

        if (mask) myValue = mask(myValue);
        inputValueSetter(myValue);
    };

    return (
        <textarea
            className="px-6 py-5 min-h-[250px] lg:py-2 rounded-xl bg-gray4 bg-opacity-50 outline-none w-full lg:w-auto text-black text-opacity-25 placeholder:text-black placeholder:text-opacity-25 flex-grow"
            id={id}
            name={name}
            placeholder={placeholder}
            value={mask ? mask(value) : value}
            onInput={handleChange}
        >
        </textarea>
    );
}
