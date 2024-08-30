import FormTitleH2 from "../../components/Simulador/form-title-h2.tsx";
import InputText from "../../components/Simulador/input-text.tsx";

import { useEffect, useState } from "preact/hooks";
import { useStepTwoOption2InputValues } from "../../sdk/Simulador/SecondStepOption2/useStepTwoOption2InputValues.ts";
import Image from "apps/website/components/Image.tsx";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import { nameMask } from "site/helpers/Simulador/nameMask.ts";
import InputSelect from "site/components/Simulador/input-select.tsx";
import { invoke } from "../../runtime.ts";
import { titleCase } from "site/helpers/titleCase.ts";
import { useLoaderInfos } from "site/sdk/Simulador/useLoaderInfos.ts";

export default function SecondStepOption2() {
  const [socialReasonPlaceholder, setSocialReasonPlaceholder] = useState(
    "Escreva aqui",
  );
  const [namePlaceholder, setNamePlaceholder] = useState("Nome Completo");
  const [ufPlaceholder, setUFPlaceholder] = useState("Selecione");
  const [cityPlaceholder, setCityPlaceholder] = useState("Selecione");
  const [telPlaceholder, setTelPlaceholder] = useState("Escreva aqui");
  const [emailPlaceholder, setEmailPlaceholder] = useState("Escreva aqui");

  const { ufsSignal } = useLoaderInfos();

  const {
    socialReasonValue,
    name2Value,
    ufValue2,
    cityValue2,
    tel2Value,
    email2Value,

    socialReasonError,
    name2Error,
    ufError2,
    cityError2,
    tel2Error,
    email2Error,
  } = useStepTwoOption2InputValues();

  useEffect(() => {
    const updateNamePlaceholder = () => {
      if (globalThis.innerWidth < 640) {
        setSocialReasonPlaceholder("Razão social");
        setNamePlaceholder("Nome e sobrenome");
        setUFPlaceholder("UF");
        setCityPlaceholder("Cidade");
        setTelPlaceholder("Telefone/Whatsapp");
        setEmailPlaceholder("E-mail");
      } else {
        setSocialReasonPlaceholder("Escreva aqui");
        setNamePlaceholder("Nome completo");
        setUFPlaceholder("Selecione");
        setCityPlaceholder("Selecione");
        setTelPlaceholder("Escreva aqui");
        setEmailPlaceholder("Escreva aqui");
      }
    };

    updateNamePlaceholder(); // Set initial placeholder based on screen size
    globalThis.addEventListener("resize", updateNamePlaceholder);

    return () =>
      globalThis.removeEventListener("resize", updateNamePlaceholder);
  }, []);

  async function getMyCities() {
    //console.log("Chamou a getMyCities");
    const fetchedCities = await invoke.site.actions.getCities({
      selectedUF: ufValue2.value,
    });
    changeCitiesData(fetchedCities, handleCitiesDataChange);
  }

  useEffect(() => {
    getMyCities();
  }, []);

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

  return (
    <>
      <div className="flex flex-col gap-8">
        <FormTitleH2 text={"Informações de contato:"} />

        <div className="relative flex gap-2 items-center lg:w-[500px]">
          <InputText
            id={"corporatereason"}
            name={"corporatereason"}
            label={"Razão social"}
            placeholder={socialReasonPlaceholder}
            value={socialReasonValue.value}
            inputValueSetter={(value) => socialReasonValue.value = value}
            wfull
          />
          {socialReasonError.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              width=""
              height=""
              className="h-5 w-5 absolute top-50 right-2 lg:left-[520px]"
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center lg:w-[500px]">
          <InputText
            id={"name"}
            name={"name"}
            label={"Nome e Sobrenome"}
            placeholder={namePlaceholder}
            value={name2Value.value}
            inputValueSetter={(value) => name2Value.value = value}
            mask={nameMask}
            wfull
          />
          {name2Error.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              width=""
              height=""
              className="h-5 w-5 absolute top-50 right-2 lg:left-[520px]"
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
            value={ufValue2.value}
            inputValueSetter={async (value) => {
              const fetchedCities = await invoke.site.actions.getCities({
                selectedUF: value,
              });
              changeCitiesData(fetchedCities, handleCitiesDataChange);

              ufValue2.value = value;
            }}
          />
          {ufError2.value && (
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
              value={cityValue2.value}
              inputValueSetter={(value) => {
                //console.log("Valor da city:", value);
                cityValue2.value = value;
              }}
              wfull
            />
          </div>
          {cityError2.value && (
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
            value={tel2Value.value}
            inputValueSetter={(value) => tel2Value.value = value}
            mask={PhoneMask}
            maxLength={16}
          />
          {tel2Error.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              width=""
              height=""
              className="h-5 w-5 absolute top-50 right-2 lg:left-[520px]"
            />
          )}
        </div>

        <div className="relative flex gap-2 items-center lg:w-[500px]">
          <InputText
            id={"email"}
            name={"email"}
            label={"E-mail"}
            placeholder={emailPlaceholder}
            value={email2Value.value}
            inputValueSetter={(value) => email2Value.value = value}
            wfull
          />
          {email2Error.value && (
            <Image
              src={"/Simulador/error-circle-icon.png"}
              alt="Error Icon"
              width=""
              height=""
              className="h-5 w-5 absolute top-50 right-2 lg:left-[520px]"
            />
          )}
        </div>
      </div>
    </>
  );
}
