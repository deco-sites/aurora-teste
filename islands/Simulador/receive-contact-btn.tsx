import Image from "apps/website/components/Image.tsx";
import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import { invoke } from "../../runtime.ts";
import { DependentLead, Lead } from "site/actions/saveLead.ts";

interface IBtnProps {
  number: number;
  mission: "increase" | "decrease" | "specificStep";
  leadToSave: Lead;
  dependentLead?: DependentLead[];
  whoUseThePlan: string;
  activeOption: number;
}

export default function ReceiveContactButton({
  number,
  mission,
  leadToSave,
  dependentLead,
  whoUseThePlan,
  activeOption,
}: IBtnProps) {
  const { changeStep, activeStep } = useFormSteps();

  const handleSaveLead = async () => {
    const _result = await invoke.site.actions.saveLead({
      leadToSave,
      dependentLead,
      whoUseThePlan,
      activeOption,
    });

    changeStep(number, mission);
  };

  return (
    <button
      onClick={handleSaveLead}
      //changeStep(currentStep + 1, e);
      //console.log(activeOption); //Dou um console.log na opção escolhida inicialmente
      className="flex items-center gap-8 bg-orange1 rounded-full text-white text-left px-12 py-4 text-sm"
    >
      <Image
        src={"/Simulador/yellow-phone-icon.png"}
        alt="Icon"
        width=""
        height=""
        className="w-7"
      />
      Receber contato de <br /> um especialista
    </button>
  );
}
