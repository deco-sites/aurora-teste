import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import { useUI } from "../../sdk/Simulador/useUI.ts";
import { options } from "../../helpers/Simulador/form-step1-menu-options.ts";
import Image from "apps/website/components/Image.tsx";
import ClearForm from "site/helpers/Simulador/clearForm.ts";

export default function NewSimulationButton() {
  const { changeStep } = useFormSteps();

  const {
    activeOption,
    selectedYellowText,
    selectedNormalText,
    selectedImage,
  } = useUI();

  return (
    <button
      onClick={() => {
        ClearForm();
        changeStep(0, "increase");
        activeOption.value = options[0].id;
        selectedYellowText.value = options[0].yellowText;
        selectedNormalText.value = options[0].normaltext;
        selectedImage.value = options[0].image;

        //changeStep(currentStep + 1, e);
        //console.log(activeOption); //Dou um console.log na opção escolhida inicialmente
      }}
      className="flex items-center gap-8 bg-gray4 rounded-full px-12 py-4 text-sm text-black text-opacity-55"
    >
      <Image
        src={"/Simulador/calculator-icon.png"}
        alt="Icon"
        width=""
        height=""
        className="w-6"
      />
      Nova Simulação
    </button>
  );
}
