import FormTitleH2 from "../../components/Simulador/form-title-h2.tsx";
import InputText from "../../components/Simulador/input-text.tsx";
import InputSelect from "../../components/Simulador/input-select.tsx";
import { agerangeoptions } from "../../helpers/Simulador/ageRangeOptions.ts";
import { alreadyhaveplanoptions } from "../../helpers/Simulador/alreadyHavePlan.ts";
import { citiesOptions } from "../../helpers/Simulador/cities.ts";
import { useEffect, useState } from "preact/hooks";
import { useStepTwoOption1InputValues } from "../../sdk/Simulador/SecondStepOption1/useStepTwoOption1InputValues.ts";
import { PhoneMask } from "../../helpers/Simulador/phoneMask.ts";
import Image from "apps/website/components/Image.tsx";
import { useLoaderInfos } from "site/sdk/Simulador/useLoaderInfos.ts";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import { cpfMask } from "site/helpers/Simulador/cpfMask.ts";
import { nameMask } from "site/helpers/Simulador/nameMask.ts";
import { titleCase } from "site/helpers/titleCase.ts";

const { ageRangesSignal, ufsSignal } = useLoaderInfos();

export default function SecondStepOption1() {
  const [namePlaceholder, setNamePlaceholder] = useState("Nome e sobrenome");
  const [cpfPlaceholder, setCpfPlaceholder] = useState("CPF");
  const [emailPlaceholder, setEmailPlaceholder] = useState("Escreva aqui");
  const [telPlaceholder, setTelPlaceholder] = useState("Escreva aqui");
  const [ufPlaceholder, setUFPlaceholder] = useState("Selecione");
  const [cityPlaceholder, setCityPlaceholder] = useState("Selecione");
  const [ageRangePlaceholder, setAgeRangePlaceholder] = useState("Selecione");
  const [havePlanPlaceholder, setHavePlanPlaceholder] = useState("Selecione");

  //console.log("ageRangesSignal:", ageRangesSignal.value);
  //console.log("ufsSignal:", ufsSignal.value);

  const [cities, setCities] = useState([]);

  const handleCitiesDataChange = (newCities) => {
    setCities(newCities);
  };

  const changeCitiesData = (fetchedCities, callback) => {
    const transformedCitiesData = fetchedCities.data.map((item) => {
      let value = item.descricao; //.replace(" ", "-");
      let text = titleCase(item.descricao);
      return { value, text };
    });

    //console.log("Cidades no front", transformedCitiesData);
    callback(transformedCitiesData);
  };
  //console.log("Cidades no front", cities);

  //console.log("transformedData:", transformedRangesData);

  const {
    nameValue,
    cpfValue,
    emailValue,
    telValue,
    ufValue,
    cityValue,
    ageRangeValue,
    alreadyHavePlanValue,

    nameError,
    cpfError,
    emailError,
    telError,
    ufError,
    cityError,
    ageRangeError,
    alreadyHavePlanError,
  } = useStepTwoOption1InputValues();

  useEffect(() => {
    const updateNamePlaceholder = () => {
      if (globalThis.innerWidth < 640) {
        setNamePlaceholder("Nome completo");
        setCpfPlaceholder("CPF");
        setEmailPlaceholder("E-mail");
        setTelPlaceholder("Telefone/Whatsapp");
        setUFPlaceholder("UF");
        setCityPlaceholder("Cidade");
        setAgeRangePlaceholder("Faixa etária");
        setHavePlanPlaceholder("Já possui plano de saúde?");
      } else {
        setNamePlaceholder("Nome completo");
        setCpfPlaceholder("Escreva aqui");
        setEmailPlaceholder("Escreva aqui");
        setTelPlaceholder("Escreva aqui");
        setUFPlaceholder("Selecione");
        setCityPlaceholder("Selecione");
        setAgeRangePlaceholder("Selecione");
        setHavePlanPlaceholder("Selecione");
      }
    };

    updateNamePlaceholder(); // Set initial placeholder based on screen size
    globalThis.addEventListener("resize", updateNamePlaceholder);

    return () =>
      globalThis.removeEventListener("resize", updateNamePlaceholder);
  }, []);

  useEffect(() => {
    nameError.value = false;
    emailError.value = false;
  }, []);

  async function getMyCities() {
    //console.log("Chamou a getMyCities");
    const fetchedCities = await invoke.site.actions.getCities({
      selectedUF: ufValue.value,
    });
    changeCitiesData(fetchedCities, handleCitiesDataChange);
  }

  useEffect(() => {
    getMyCities();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <FormTitleH2 text={"Informações de contato:"} />

        <div className="relative flex gap-2 items-center lg:w-[600px]">
          <InputText
            id={"name"}
            name={"name"}
            label={"Nome e Sobrenome"}
            placeholder={namePlaceholder}
            value={nameValue.value}
            inputValueSetter={(value) => nameValue.value = value}
            mask={nameMask}
            wfull
          />

          {nameError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center lg:w-[600px]">
          <InputText
            id={"cpf"}
            name={"cpf"}
            label={"CPF"}
            placeholder={cpfPlaceholder}
            value={cpfValue.value}
            inputValueSetter={(value) => cpfValue.value = value}
            mask={cpfMask}
            maxLength={14}
            wfull
          />

          {cpfError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center lg:w-[500px]">
          <InputText
            id={"email"}
            name={"email"}
            label={"E-mail"}
            placeholder={emailPlaceholder}
            value={emailValue.value}
            inputValueSetter={(value) => emailValue.value = value}
            wfull
          />
          {emailError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center">
          <InputText
            id={"tel"}
            name={"tel"}
            label={"Telefone/WhatsApp"}
            placeholder={telPlaceholder}
            inputValueSetter={(value) => telValue.value = value}
            value={telValue.value}
            mask={PhoneMask}
            maxLength={16}
          />
          {
            /*<img
            src={"/check-circle-icon.png"}
            alt="Check Icon"
            className="h-5 w-5 absolute top-50 right-2 lg:left-[470px]"
          />*/
          }

          {telError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center">
          <InputSelect
            id={"UF"}
            name={"UF"}
            label={"UF"}
            options={ufsSignal.value}
            placeholder={ufPlaceholder}
            value={ufValue.value}
            inputValueSetter={async (value) => {
              const fetchedCities = await invoke.site.actions.getCities({
                selectedUF: value,
              });
              changeCitiesData(fetchedCities, handleCitiesDataChange);

              ufValue.value = value;
            }}
          />
          {ufError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center">
          <div className="w-full lg:w-[30%]">
            <InputSelect
              id={"city"}
              name={"city"}
              label={"Cidade"}
              options={cities}
              placeholder={cityPlaceholder}
              value={cityValue.value}
              inputValueSetter={(value) => {
                //console.log("Valor da city:", value);
                cityValue.value = value;
              }}
              wfull
            />
          </div>
          {cityError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <FormTitleH2 text={"Informações de quem utilizará o plano:"} />

        <div className="relative flex gap-2 items-center">
          <InputSelect
            id={"agerange"}
            name={"agerange"}
            label={"Faixa Etária:"}
            options={ageRangesSignal.value}
            placeholder={ageRangePlaceholder}
            value={ageRangeValue.value}
            inputValueSetter={(value) => ageRangeValue.value = value}
          />
          {ageRangeError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center">
          <InputSelect
            id={"alreadyhaveplan"}
            name={"alreadyhaveplan"}
            label={"Já possui plano de saúde?"}
            options={alreadyhaveplanoptions}
            placeholder={havePlanPlaceholder}
            value={alreadyHavePlanValue.value}
            inputValueSetter={(value) => alreadyHavePlanValue.value = value}
          />
          {alreadyHavePlanError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              className="h-5 w-5 absolute top-50 right-7 lg:left-[615px]"
              width=""
              height=""
            />
          )}
        </div>
      </div>
    </>
  );
}
