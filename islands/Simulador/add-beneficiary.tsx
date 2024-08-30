import InputSelect from "../../components/Simulador/input-select.tsx";
import InputNumber from "../../components/Simulador/input-number.tsx";
import { agerangeoptions } from "../../helpers/Simulador/ageRangeOptions.ts";
import { useStepThreeInputValues } from "../../sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";
import { handleArrDataChange } from "../../helpers/Simulador/handleDataChange.ts";
import { checkSingleSelect } from "../../sdk/Simulador/ThirdStep/checkStepThreeFields.ts";
import Image from "apps/website/components/Image.tsx";
import { useLoaderInfos } from "site/sdk/Simulador/useLoaderInfos.ts";

export default function AddBeneficiary() {
  const { ageRangesSignal } = useLoaderInfos();
  const { thirdStepSignal, idsWithEmptyRange, lessThirtyLives } =
    useStepThreeInputValues();

  {
    /*const idsWithEmptyRange = useMemo(() => handleNextStepThirdStep(), [
    JSON.stringify(thirdStepSignal.value.beneficiariesValuesArr),
  ]);*/
  }

  const handleAddInput = () => {
    //console.log("ESTOU AQUI", thirdStepSignal.value.beneficiariesValuesArr);

    const newId = thirdStepSignal.value.beneficiariesValuesArr.length > 0
      ? thirdStepSignal.value
        .beneficiariesValuesArr[
          thirdStepSignal.value.beneficiariesValuesArr.length - 1
        ].id + 1
      : 1;

    thirdStepSignal.value = {
      ...thirdStepSignal.value,
      beneficiariesValuesArr: [
        ...thirdStepSignal.value.beneficiariesValuesArr,
        {
          id: newId,
          name: `agerange-${newId}`,
          range: "",
          qty: 1,
        },
      ],
    };
  };

  const handleDeleteLine = (id) => {
    thirdStepSignal.value = {
      ...thirdStepSignal.value,
      beneficiariesValuesArr: thirdStepSignal.value
        .beneficiariesValuesArr.filter((item) => item.id !== id),
    };
  };

  return (
    <div className="flex flex-col gap-6">
      {thirdStepSignal.value.beneficiariesValuesArr.map((item) => {
        return (
          <div key={item.id} className="relative flex gap-6">
            <div className="w-full lg:w-1/3">
              <InputSelect
                id={`agerange-${item.id}`}
                name={`agerange-${item.id}`}
                label={"Faixa Etária:"}
                options={ageRangesSignal.value}
                placeholder={"Selecione"}
                value={item.range}
                inputValueSetter={(value) => {
                  handleArrDataChange(
                    thirdStepSignal,
                    "beneficiariesValuesArr",
                    value,
                    item,
                    "id",
                    "range",
                  );

                  checkSingleSelect(item.id);
                }}
                wfull
              />
            </div>

            <InputNumber
              id={`recipientqty-${item.id}`}
              name={`recipientqty-${item.id}`}
              value={item.qty}
              placeholder={"00"}
              handleDeleteLine={() => handleDeleteLine(item.id)}
              showTrashIcon={thirdStepSignal.value.beneficiariesValuesArr
                .length > 1}
              inputValueSetter={(value) =>
                handleArrDataChange(
                  thirdStepSignal,
                  "beneficiariesValuesArr",
                  value,
                  item,
                  "id",
                  "qty",
                )}
            />

            {idsWithEmptyRange.value.includes(item.id) && (
              <Image
                src={"/Simulador/error-circle-icon.png"}
                alt="Error Icon"
                className="absolute h-5 w-5 left-[110px] top-[22px] lg:top-[10px] lg:left-[570px]"
                width=""
                height=""
              />
            )}
          </div>
        );
      })}

      {lessThirtyLives.value && (
        <span className="text-red text-xs">Selecione no mínimo 30 vidas</span>
      )}

      <button
        className="bg-orange1 rounded-full text-white py-2 px-8 text-xs w-max"
        onClick={handleAddInput}
      >
        + Adicionar
      </button>
    </div>
  );
}
