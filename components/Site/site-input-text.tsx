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

export default function SiteInputText(
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
    <div className={`flex gap-6 items-center w-full flex-1`}>
      <label className="hidden lg:flex text-orange1 text-nowrap" htmlFor={name}>
        {label}:
      </label>
      <input
        className={`px-6 py-5 lg:py-2 rounded-xl bg-gray4 bg-opacity-50 outline-none w-full lg:w-auto text-black text-opacity-25 placeholder:text-black placeholder:text-opacity-25 ${
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
