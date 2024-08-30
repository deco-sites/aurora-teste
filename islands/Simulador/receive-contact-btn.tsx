import Image from "apps/website/components/Image.tsx";
import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import { invoke } from "../../runtime.ts";

export interface Lead {
  nome: string;
  razao_social: string;
  cpf_cnpj: string;
  cidade: number;
  estado: string;
  telefone: string;
  email: string;
  cd_plano: number;
  somente_titular: boolean;
  possui_plano: boolean;
  cd_tab_preco: number;
  outra_pessoa: boolean;
}

export interface DependentLead {
  cd_faixa: number;
  quantidade: number;
  cd_tab_preco: number;
}

interface IBtnProps {
  number: number;
  mission: string;
  leadToSave: Lead;
  dependentLead?: DependentLead;
  whoUseThePlan: string;
  activeOption: number;
}

export default function ReceiveContactButton(
  { number, mission, leadToSave, dependentLead, whoUseThePlan, activeOption }:
    IBtnProps,
) {
  const { changeStep } = useFormSteps();

  const handleSaveLead = async () => {
    console.log("Chamou a handleSaveLead", dependentLead);
    {
      /* Essa parte comentada era responsável por salvar o lead no final do preenchimento
    await invoke.site.actions.saveLead({
      leadToSave,
      dependentLead,
      whoUseThePlan,
      activeOption,
    });
    */
    }
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
