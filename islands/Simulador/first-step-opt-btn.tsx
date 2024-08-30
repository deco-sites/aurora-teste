import Image from "apps/website/components/Image.tsx";
import { useUI } from "../../sdk/Simulador/useUI.ts";
import { previousActiveOption } from "site/islands/Simulador/next-step-btn.tsx";

export default function OptionButton({ op }) {
  const {
    activeOption,
    selectedYellowText,
    selectedNormalText,
    selectedImage,
  } = useUI();

  return (
    <div
      className={`p-1 rounded-full ${
        op.id === activeOption.value ? "shadow-outline-orange1" : ""
      }`}
    >
      <button
        className={`flex items-center justify-center text-sm bg-[#f3f3f3] rounded-full w-full h-20`}
        onClick={() => {
          activeOption.value = op.id;
          selectedYellowText.value = op.yellowText;
          selectedNormalText.value = op.normaltext;
          selectedImage.value = op.image;

          {
            /*
          //O if abaixo é responsável por resetar os campos do formulário quando altero a opção escolhida na primeira tela
          if (previousActiveOption.value !== activeOption.value) {
            console.log("Aqui vou resetar os campos do formulário");
          }*/
          }
        }}
        key={op.id}
      >
        <div className="w-[30%] flex justify-center">
          <Image src={op.icon} alt="" width="" height="" className="w-6" />
        </div>
        <div className="w-[70%] text-left pr-4">
          <span
            className="text-sm text-black text-opacity-55"
            dangerouslySetInnerHTML={{ __html: op.option }}
          >
          </span>
        </div>
      </button>
    </div>
  );
}
