import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import { useUI } from "../../sdk/Simulador/useUI.ts";
import FormStepOne from "../../sections/Simulador/FormStepOne.tsx";
import FormStepTwo from "../../sections/Simulador/FormStepTwo.tsx";
import FormStepThree from "../../sections/Simulador/FormStepThree.tsx";
import FormStepFour from "../../sections/Simulador/FormStepFour.tsx";
import FormStepFive from "../../sections/Simulador/FormStepFive.tsx";
import SecondStepOption1 from "../../sections/Simulador/SecondStepOption1.tsx";
import SecondStepOption2 from "../../sections/Simulador/SecondStepOption2.tsx";
import ThirdStepOption1 from "../../sections/Simulador/ThirdStepOption1.tsx";
import ThirdStepOption2 from "../../sections/Simulador/ThirdStepOption2.tsx";
import FormStepTwoforFourthOption from "../../sections/Simulador/FormStepTwoforFourthOption.tsx";
import CompletedForm from "../../sections/Simulador/CompletedForm.tsx";
import { useEffect } from "preact/hooks";
import { useLoaderInfos } from "site/sdk/Simulador/useLoaderInfos.ts";

export default function ControlFormSteps({ ageRanges, ufs }) {
  const { activeStep } = useFormSteps();
  const { activeOption } = useUI();

  const { ageRangesSignal, ufsSignal } = useLoaderInfos();

  //A função abaixo monta o objeto adicionando a chave value e alterando o nome de faixa para text
  const transformedRangesData = ageRanges.data?.map((item) => {
    let cd_faixa = item.cd_faixa;
    let value = item.faixa;
    let text = item.faixa;
    return { cd_faixa, value, text };
  }) || [];

  //A função abaixo odena as faixas de idade em ordem crescente
  const sortedData = transformedRangesData.sort((a, b) => {
    const getStartNumber = (faixa) => parseInt(faixa.split(" ")[0]);

    return getStartNumber(a.value) - getStartNumber(b.value);
  });

  //A função abaixo monta o objeto adicionando a chave value e alterando o nome de faixa para text
  const transformedUfsData = ufs.data?.map((item) => {
    let value = item.uf;
    let text = item.uf;
    return { value, text };
  }) || [];

  //Aqui eu atribuo os objetos transformados acima para as variáveis globais do useLoaderInfos
  ageRangesSignal.value = sortedData;
  ufsSignal.value = transformedUfsData;

  useEffect(() => {
    if (typeof globalThis !== "undefined") {
      globalThis.scrollTo(0, 0);
    }
  }, [activeStep.value]);

  return (
    <>
      {activeStep.value === 1 && <FormStepOne />}
      {activeStep.value === 2 && (
        <>
          {activeOption.value === 1 && (
            <FormStepTwo Component={SecondStepOption1} />
          )}
          {(activeOption.value === 2 || activeOption.value === 3) && (
            <FormStepTwo Component={SecondStepOption2} />
          )}
          {activeOption.value === 4 && <FormStepTwoforFourthOption />}
        </>
      )}

      {activeStep.value === 3 && (
        <>
          {activeOption.value === 1 && (
            <FormStepThree Component={ThirdStepOption1} />
          )}
          {(activeOption.value === 2 || activeOption.value === 3) && (
            <FormStepThree Component={ThirdStepOption2} />
          )}
        </>
      )}
      {activeStep.value === 4 && <FormStepFour />}
      {activeStep.value === 5 && <FormStepFive />}
      {activeStep.value === 6 && <CompletedForm />}
    </>
  );
}
