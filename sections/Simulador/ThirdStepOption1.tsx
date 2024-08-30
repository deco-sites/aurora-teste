import FormTitleH2 from "../../components/Simulador/form-title-h2.tsx";
import InputSelect from "../../components/Simulador/input-select.tsx";
import AddBeneficiary from "../../islands/Simulador/add-beneficiary.tsx";
import FormTitleH1 from "../../components/Simulador/form-title-h1.tsx";
import { whoWillUseThePlan } from "../../helpers/Simulador/whoWillUseThePlan.ts";
import { useStepThreeInputValues } from "../../sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";
import { handleDataChange } from "../../helpers/Simulador/handleDataChange.ts";

export default function ThirdStepOption1() {
  const {
    thirdStepSignal,
  } = useStepThreeInputValues();

  const textOptions = [
    "Adicione os dependentes:",
    "Adicione os dados dos beneficiários:",
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="pb-36">
          <FormTitleH1
            text1={"Informe os dados das pessoas"}
            text2={"que utilizarão o plano."}
          />
        </div>

        <div className="pb-24">
          <InputSelect
            id={"whowilluse"}
            name={"whowilluse"}
            label={"Quem utilizará o plano?"}
            options={whoWillUseThePlan}
            placeholder={"Somente eu"}
            value={thirdStepSignal.value.whoUseThePlan}
            inputValueSetter={(value) =>
              handleDataChange(thirdStepSignal, `whoUseThePlan`, value)}
          />
        </div>

        {thirdStepSignal.value.whoUseThePlan != "somente_eu" && (
          <div className="flex flex-col gap-8">
            <FormTitleH2
              text={thirdStepSignal.value.whoUseThePlan ===
                  "eu_e_meus_dependentes"
                ? textOptions[0]
                : textOptions[1]}
            />

            <AddBeneficiary />
          </div>
        )}
      </div>
    </>
  );
}
