import { useSelectPlanButtons } from "../../sdk/Simulador/useSelectPlanButtons.ts";
import { useSelectPlan } from "../../sdk/Simulador/useSelectPlan.ts";

interface IPlanBtnMobile {
  text1: string;
  text2?: string;
  id: number;
  color: keyof typeof CARD_COLORS;
  scrollToCard: (id: number) => void; // Adicione o tipo da prop
}

const CARD_COLORS = {
  orange: "bg-orange1",
  green: "bg-aquagreen",
  yellow: "bg-yellow",
};

export default function PlanMobileButton(
  { text1, text2, id, color, scrollToCard }: IPlanBtnMobile,
) {
  const { activePlanBtn } = useSelectPlanButtons();
  const { selectedPlan } = useSelectPlan();

  const handleClick = () => {
    activePlanBtn.value = id;
    //console.log("AQUI 1 - ", activePlanBtn.value);

    selectedPlan.value = id;
    //console.log("AQUI 2 - ", selectedPlan.value);

    scrollToCard(id);
  };

  return (
    <button
      className={`flex items-center px-4 text-left rounded-2xl h-32 w-full ${
        activePlanBtn.value === id ? `${CARD_COLORS[color]}` : "bg-gray4"
      }`}
      onClick={handleClick}
    >
      <span
        className={`text-gray8 text-lg font-sora font-semibold ${
          activePlanBtn.value === id &&
          (color != "yellow" ? "text-yellow" : "text-orange1")
        }`}
      >
        {text1}
        <br />
        {text2}
      </span>
    </button>
  );
}
