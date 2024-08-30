import FormTitleH2 from "../../components/Simulador/form-title-h2.tsx";
import AddBeneficiary from "../../islands/Simulador/add-beneficiary.tsx";
import FormTitleH1 from "../../components/Simulador/form-title-h1.tsx";
import { useUI } from "../../sdk/Simulador/useUI.ts";

export default function ThirdStepOption2() {
  const { activeOption } = useUI();

  return (
    <>
      <div className="flex flex-col gap-8">
        {activeOption.value === 2
          ? (
            <FormTitleH1
              text1={"Você pode contratar via CNPJ incluindo empresas de 01 a 29 vidas,"}
              text2={"considerando dependentes e colaboradores. O mesmo vale para o MEI."}
            />
          )
          : (
            <FormTitleH1
              text1={"Você pode contratar via CNPJ incluindo empresas de 30 a 99 vidas,"}
              text2={"considerando dependentes e colaboradores. O mesmo vale para o MEI."}
            />
          )}

        <FormTitleH2 text={"Adicione colaboradores e dependentes:"} />

        <AddBeneficiary />
      </div>
    </>
  );
}
