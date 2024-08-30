import Image from "apps/website/components/Image.tsx";

export interface InputProps {
  id: string;
  name: string;
  value: number;
  placeholder?: string;
  handleDeleteLine?: () => void;
  showTrashIcon: boolean;
  inputValueSetter: (value: number) => void;
}

export default function InputNumber(
  {
    id,
    name,
    value,
    placeholder,
    handleDeleteLine,
    showTrashIcon,
    inputValueSetter,
  }: InputProps,
) {
  //const { recipientqty } = useStepThreeInputValues();

  const handleButtonClick = (operation: "increment" | "decrement") => {
    if (operation === "increment") {
      inputValueSetter(value + 1);
      //setUseValue((prev) => prev + 1);
    } else {
      const max = value > 1 ? value - 1 : 1;
      inputValueSetter(max);
      //setUseValue((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (inputValueSetter) {
      inputValueSetter(value);
    }
  };

  // Formatar o valor para exibir zero à esquerda apenas se for menor que 10
  const formattedValue = value < 10 ? value.toString().padStart(2, "0") : value.toString();

  return (
    <>
      <div className="flex items-center gap-8 w-full">
        <div className="flex gap-2 items-center justify-center w-full lg:w-auto">
          <button onClick={() => handleButtonClick("decrement")}>
            <Image
              src={"/Simulador/minus-icon.png"}
              alt="Plus Icon"
              width=""
              height=""
              className="w-4"
            />
          </button>

          <input
            className="px-6 py-2 rounded-full bg-gray5 outline-none w-20 text-center text-black text-opacity-25"
            type="number"
            id={id}
            name={name}
            value={formattedValue}
            placeholder={placeholder}
            onChange={handleChange}
            //readOnly
          />

          <button onClick={() => handleButtonClick("increment")}>
            <Image
              src={"/Simulador/plus-icon.png"}
              alt="Plus Icon"
              width=""
              height=""
              className="w-4"
            />
          </button>
        </div>

        {showTrashIcon && (
          <button onClick={handleDeleteLine}>
            <Image
              src={"/Simulador/trash-icon.png"}
              alt="Plus Icon"
              width=""
              height=""
              className="w-4"
            />
          </button>
        )}
      </div>
    </>
  );
}
