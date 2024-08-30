import { Signal } from "@preact/signals-core";

interface Option {
  value: string;
  text: string;
}

export interface InputProps {
  id: string;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  signalValue?: Signal<string>;
  wfull?: boolean;
  value?: string;
  inputValueSetter?: (value: string) => void;
}

export default function InputSelect(
  {
    id,
    name,
    label,
    options,
    placeholder,
    signalValue,
    wfull,
    value,
    inputValueSetter,
  }: InputProps,
) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (inputValueSetter) {
      inputValueSetter(value);
    }
    if (signalValue) {
      signalValue.value = value;
    }
  };

  return (
    <div className="flex gap-6 items-center w-full">
      <label className="hidden lg:flex text-orange1 text-nowrap" htmlFor={name}>
        {label}
      </label>
      <div className={`relative w-full lg:w-auto ${wfull && "lg:w-full"}`}>
        <select
          className={`px-6 py-5 lg:py-2 rounded-md lg:rounded-full bg-black bg-opacity-[3%] outline-none text-[#9ca3be] appearance-none pr-8 w-full ${
            wfull && "w-full"
          }`}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        >
          <option value="" selected disabled hidden>{placeholder}</option>
          {options.map((op) => (
            <option key={op.value} value={op.value}>{op.text}</option>
          ))}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            width="14"
            height="7"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
              fill="black"
              fill-opacity="0.25"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
