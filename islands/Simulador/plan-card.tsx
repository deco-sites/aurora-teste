import { useSelectPlan } from "../../sdk/Simulador/useSelectPlan.ts";
import { useSelectPlanButtons } from "../../sdk/Simulador/useSelectPlanButtons.ts";

export interface IplanInfos {
  id: number;
  title: string;
  description: string;
  segmentation: string;
  coverage: string;
  coparticipation: string;
  accommodation: string;
  price: string;
  color: keyof typeof CARD_COLORS;
  onlybutton: boolean;
}

const CARD_COLORS = {
  orange: "bg-orange1",
  green: "bg-aquagreen",
  yellow: "bg-yellow",
};

export default function PlanCard({
  id,
  title,
  description,
  segmentation,
  coverage,
  coparticipation,
  accommodation,
  price,
  color,
  onlybutton,
  scrollToCard,
}: IplanInfos) {
  const { selectedPlan } = useSelectPlan();
  const { activePlanBtn } = useSelectPlanButtons();

  const handleSelectPlan = (id: number) => {
    //console.log("CHAMOU AQUI", selectedPlan.value);

    activePlanBtn.value = id;
    selectedPlan.value = id;
    scrollToCard(id);
    {
      /*
    const index = selectedPlan.value.indexOf(id);
    if (index === -1) {
      selectedPlan.value = [...selectedPlan.value, id];
    } else {
      selectedPlan.value = selectedPlan.value.filter((item) => item !== id);
    }*/
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-1 min-w-80 snap-center">
      <div
        className={`flex flex-col gap-4 ${
          CARD_COLORS[color]
        } rounded-xl p-10 flex-1`}
      >
        <span
          className={`font-semibold text-2xl font-sora ${
            color != "yellow" ? "text-yellow" : "text-[#FA7651]"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-sm flex-1 ${
            color != "yellow" ? "text-white" : "text-black text-opacity-45"
          }`}
        >
          {description}
        </span>
      </div>

      <div className="flex flex-col gap-4 bg-black bg-opacity-[2%] lg:bg-white rounded-xl p-10">
        <div className="border-b flex items-center py-4">
          <span className="text-sm text-black text-opacity-25">
            <strong>Segmentação:</strong> {segmentation}
          </span>
        </div>

        <div className="border-b flex items-center py-4">
          <span className="text-sm text-black text-opacity-25">
            <strong>Abrangência:</strong> {coverage}
          </span>
        </div>

        <div className="border-b flex items-center py-4">
          <span className="text-sm text-black text-opacity-25">
            <strong>Coparticipação:</strong> {coparticipation}
          </span>
        </div>

        <div className="flex items-center pt-4">
          <span className="text-sm text-black text-opacity-25">
            <strong>Acomodação:</strong> {accommodation}
          </span>
        </div>
      </div>
      {onlybutton
        ? (
          <a
            href={"https://wa.me/553140002105?text=Mensagem%20padr%C3%A3o"}
            target="_blank"
            className="hidden lg:flex justify-center"
          >
            <button
              className={`${
                CARD_COLORS[color]
              } rounded-full font-semibold text-sm px-12 py-3 w-full ${
                color != "yellow" ? "text-yellow" : "text-[#FA7651]"
              }`}
            >
              Solicitar Contato
            </button>
          </a>
        )
        : (
          <div className="flex flex-col justify-between border-[1px] border-[#D9D9D9] rounded-2xl lg:rounded-xl px-10 py-3">
            <span className="text-[#D9D9D9] text-sm">A partir de</span>
            <div className="flex justify-between">
              <span className="text-[#FA7651] text-2xl font-semibold font-sora">
                R$ {price}
              </span>

              <button
                onClick={() => handleSelectPlan(id)}
                className={`hidden lg:block rounded-full font-semibold text-sm w-36 py-2 ${
                  selectedPlan.value === id
                    ? `${CARD_COLORS[color]} ${
                      color != "yellow" ? "text-yellow" : "text-[#FA7651]"
                    }`
                    : "bg-gray6 text-white"
                }`}
              >
                {/*selectedPlan.value.includes(id) ? "Selecionado" : "Selecionar"*/}
                {selectedPlan.value === id ? "Selecionado" : "Selecionar"}
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
