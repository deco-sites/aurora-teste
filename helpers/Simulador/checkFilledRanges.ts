import { useStepTwoOption1InputValues } from "site/sdk/Simulador/SecondStepOption1/useStepTwoOption1InputValues.ts";
import { useStepThreeInputValues } from "site/sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";

const { ageRangeValue } = useStepTwoOption1InputValues(); //Idade de quem preencheu segundo passo do formulário Você e sua família
const { thirdStepSignal } = useStepThreeInputValues();

export function CheckFilledRanges() {
    //console.log("IDADE DE QUEM PREENCHEU", ageRangeValue.value);
    //console.log("IDADES DOS BENEFICIÁRIOS", thirdStepSignal.value.beneficiariesValuesArr);
    //console.log("Quem vai usar o plano", thirdStepSignal.value.whoUseThePlan);

    const ageRanges = [
        "0 a 18 anos",
        "19 a 23 anos",
        "24 a 28 anos",
        "29 a 33 anos",
        "34 a 38 anos",
        "39 a 43 anos",
        "44 a 48 anos",
        "49 a 53 anos",
        "54 a 58 anos",
        "59 anos ou mais",
    ];

    let combinedRanges = [
        ...thirdStepSignal.value.beneficiariesValuesArr.map((b) => b.range),
    ];

    // Adicione a faixa de idade de quem preencheu apenas se whoUseThePlan for diferente de "outra_pessoa"
    if (thirdStepSignal.value.whoUseThePlan !== "outra_pessoa") {
        combinedRanges = [ageRangeValue.value, ...combinedRanges];
    }
    //console.log("COMBINEDRANGES", combinedRanges);

    const validRanges = combinedRanges.filter((range) => range !== "");

    // Se não houver faixas válidas, pode-se retornar um valor padrão ou tratar isso de outra forma
    if (validRanges.length === 0) {
        //console.log("Nenhuma faixa válida encontrada.");
        return null; // ou algum valor padrão
    }
    // Encontre a menor faixa presente
    const minRange = validRanges.reduce((min, current) => {
        return ageRanges.indexOf(current) < ageRanges.indexOf(min)
            ? current
            : min;
    }, validRanges[0]);

    //console.log("MENOR FAIXA DE IDADE PRESENTE:", minRange);
    return minRange;
}
