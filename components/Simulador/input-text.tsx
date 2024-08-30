export interface InputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  wfull?: boolean;
  value?: string;
  inputValueSetter: (value: string) => void;
  mask?: (value: string) => string;
  maxLength?: number;
}

export default function InputText(
  {
    id,
    name,
    label,
    placeholder,
    wfull,
    value,
    inputValueSetter,
    mask,
    maxLength,
  }: InputProps,
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let myValue = e.target.value;

    if (mask) myValue = mask(myValue);
    inputValueSetter(myValue);
  };

  return (
    <div className={`flex gap-6 items-center w-full`}>
      <label className="hidden lg:flex text-orange1 text-nowrap" htmlFor={name}>
        {label}:
      </label>
      <input
        className={`px-6 py-5 lg:py-2 rounded-md lg:rounded-full bg-black bg-opacity-[3%] outline-none w-full lg:w-auto text-gray3 ${
          wfull ? "lg:w-full" : ""
        }`}
        type="text"
        id={id}
        name={name}
        value={mask ? mask(value) : value}
        placeholder={placeholder}
        onInput={handleChange}
        maxLength={maxLength}
      />
    </div>
  );
}
