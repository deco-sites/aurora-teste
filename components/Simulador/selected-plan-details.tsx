import Image from "apps/website/components/Image.tsx";
import changeStep from "../../islands/Simulador/change-step-function.tsx";
import FormTitleH1 from "site/components/Simulador/form-title-h1.tsx";
import FormTitleH2 from "site/components/Simulador/form-title-h2.tsx";

interface Persons {
  id: number;
  name: string;
  range: string;
  qty: number;
}

interface ISelectedPlanDetails {
  simulationType: number;
  name: string;
  email: string;
  alreadyHavePlan: string;
  whoUseThePlan: string;
  beneficiariesArr: Persons[];
  priceRanges: number[];
}

export default function SelectedPlanDetails(
  {
    simulationType,
    name,
    email,
    alreadyHavePlan,
    whoUseThePlan,
    beneficiariesArr,
    priceRanges,
  }: ISelectedPlanDetails,
) {
  const beneficiaries = beneficiariesArr.filter((item) => item.range != "");
  const beneficiaries0x18 = beneficiaries.filter((item) =>
    item.range === "0 a 18 anos"
  );
  const beneficiaries19x23 = beneficiaries.filter((item) =>
    item.range === "19 a 23 anos"
  );
  const beneficiaries24x28 = beneficiaries.filter((item) =>
    item.range === "24 a 28 anos"
  );
  const beneficiaries29x33 = beneficiaries.filter((item) =>
    item.range === "29 a 33 anos"
  );
  const beneficiaries34x38 = beneficiaries.filter((item) =>
    item.range === "34 a 38 anos"
  );
  const beneficiaries39x43 = beneficiaries.filter((item) =>
    item.range === "39 a 43 anos"
  );
  const beneficiaries44x48 = beneficiaries.filter((item) =>
    item.range === "44 a 48 anos"
  );
  const beneficiaries49x53 = beneficiaries.filter((item) =>
    item.range === "49 a 53 anos"
  );
  const beneficiaries54x58 = beneficiaries.filter((item) =>
    item.range === "54 a 58 anos"
  );
  const beneficiaries59more = beneficiaries.filter((item) =>
    item.range === "59 anos ou mais"
  );

  //console.log("CHEGOU NO FILHO", priceRanges);

  return (
    <>
      <div className="flex flex-col">
        <div className="my-20">
          <FormTitleH1 text1={"Detalhamento do"} text2={"seu plano"} />
        </div>
        <div className="flex flex-col lg:flex-row border-b pb-16">
          <div className="flex flex-col gap-8 mb-8 lg:mb-0 pb-8 lg:pb-0 border-b-gray1 border-b-2 lg:border-none lg:flex-grow lg:max-w-[30%]">
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center">
                <FormTitleH2 text={"Tipo de Simulação"} />
                <button
                  className="cursor-pointer"
                  onClick={() => changeStep(1, "specificStep")}
                >
                  <Image
                    src={"/Simulador/pen-icon.png"}
                    alt="Edit Icon"
                    width=""
                    height=""
                    className="w-4 h-4"
                  />
                </button>
              </div>
              <div className="flex flex-col text-sm text-[#a9a9a9]">
                <span>
                  {simulationType === 1
                    ? "Para mim e minha família"
                    : "Mei e empresas"}
                  {/*Para mim e minha família*/}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center">
                <FormTitleH2 text={"Contato"} />
                <button
                  className="cursor-pointer"
                  onClick={() => changeStep(2, "specificStep")}
                >
                  <Image
                    src={"/Simulador/pen-icon.png"}
                    alt="Edit Icon"
                    width=""
                    height=""
                    className="w-4 h-4"
                  />
                </button>
              </div>
              <div className="flex flex-col text-sm text-[#a9a9a9]">
                <span>{name}{/*Marcela Matos*/}</span>
                <span>{email}{/*marcela@matos.com*/}</span>
                <span>
                  {alreadyHavePlan === "yes"
                    ? "Possuo plano de saúde"
                    : "Não possuo plano de saúde"}
                  {/*Possuo plano de saúde*/}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 mb-8 lg:mb-0 pb-8 lg:pb-0 border-b-gray1 border-b-2 lg:border-none lg:flex-grow lg:max-w-[30%]">
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center">
                <FormTitleH2
                  text={simulationType === 1 ? "Titular" : "Plano Escolhido"}
                />
                <a href="#" className="cursor-pointer">
                  <Image
                    src={"/Simulador/pen-icon.png"}
                    alt="Edit Icon"
                    width=""
                    height=""
                    className="w-4 h-4"
                  />
                </a>
              </div>
              <div className="flex flex-col text-sm text-[#a9a9a9]">
                <span>a100 rmbh</span>
                {simulationType === 1 && (
                  <span>
                    R$ {`${
                      priceRanges.propertyPrice.value?.toString()
                        .replace(
                          ".",
                          ",",
                        )
                    }`}/mês por pessoa
                  </span>
                )}
              </div>
            </div>
          </div>

          {(beneficiaries0x18.length >= 1 || beneficiaries19x23.length >= 1 ||
            beneficiaries24x28.length >= 1) &&
            (whoUseThePlan !== "somente_eu" || simulationType !== 1) &&
            (
              <div className="flex flex-col gap-8 lg:flex-grow lg:max-w-[30%]">
                {beneficiaries0x18.length >= 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                      <FormTitleH2
                        text={`${
                          simulationType === 1 ? "Dependentes" : "Beneficiários"
                        } 0-18 anos`}
                      />
                      <button
                        className="cursor-pointer"
                        onClick={() => changeStep(3, "specificStep")}
                      >
                        <Image
                          src={"/Simulador/pen-icon.png"}
                          alt="Edit Icon"
                          width=""
                          height=""
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col text-sm text-[#a9a9a9]">
                      <span>a100 rmbh</span>
                      <span>
                        {beneficiaries0x18.reduce(
                          (prevVal, el) => prevVal + el.qty,
                          0,
                        )}{" "}
                        {`${
                          simulationType === 1 ? "dependentes" : "beneficiários"
                        }`}
                      </span>
                      <span>
                        R${" "}
                        {`${
                          priceRanges.zeroTo18Prices.value?.toString().replace(
                            ".",
                            ",",
                          )
                        }`}/mês por pessoa
                      </span>
                    </div>
                  </div>
                )}

                {beneficiaries19x23.length >= 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                      <FormTitleH2
                        text={`${
                          simulationType === 1 ? "Dependentes" : "Beneficiários"
                        } 19-23 anos`}
                      />
                      <button
                        className="cursor-pointer"
                        onClick={() => changeStep(3, "specificStep")}
                      >
                        <Image
                          src={"/Simulador/pen-icon.png"}
                          alt="Edit Icon"
                          width=""
                          height=""
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col text-sm text-[#a9a9a9]">
                      <span>a100 rmbh</span>
                      <span>
                        {beneficiaries19x23.reduce(
                          (prevVal, el) => prevVal + el.qty,
                          0,
                        )}{" "}
                        {`${
                          simulationType === 1 ? "dependentes" : "beneficiários"
                        }`}
                      </span>
                      <span>
                        R$ {`${
                          priceRanges.nineteenTo23Prices.value?.toString()
                            .replace(
                              ".",
                              ",",
                            )
                        }`}/mês por pessoa
                      </span>
                    </div>
                  </div>
                )}

                {beneficiaries24x28.length >= 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                      <FormTitleH2
                        text={`${
                          simulationType === 1 ? "Dependentes" : "Beneficiários"
                        } 24-28 anos`}
                      />
                      <button
                        className="cursor-pointer"
                        onClick={() => changeStep(3, "specificStep")}
                      >
                        <Image
                          src={"/Simulador/pen-icon.png"}
                          alt="Edit Icon"
                          width=""
                          height=""
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col text-sm text-[#a9a9a9]">
                      <span>a100 rmbh</span>
                      <span>
                        {beneficiaries24x28.reduce(
                          (prevVal, el) => prevVal + el.qty,
                          0,
                        )}{" "}
                        {`${
                          simulationType === 1 ? "dependentes" : "beneficiários"
                        }`}
                      </span>
                      <span>
                        R${" "}
                        {`${
                          priceRanges.twentyFourTo28Prices.value?.toString()
                            .replace(
                              ".",
                              ",",
                            )
                        }`}/mês por pessoa
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

          {(beneficiaries29x33.length >= 1 || beneficiaries34x38.length >= 1 ||
            beneficiaries39x43.length >= 1) &&
            (whoUseThePlan !== "somente_eu" || simulationType !== 1) && (
            <div className="flex flex-col gap-8 lg:flex-grow lg:max-w-[30%]">
              {beneficiaries29x33.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 29-33 anos`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"/Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries29x33.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.twentyNineTo33Prices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}

              {beneficiaries34x38.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 34-38 anos`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"/Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries34x38.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.thirtyFourTo38Prices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}

              {beneficiaries39x43.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 39-43 anos`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries39x43.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.thirtyNineTo43Prices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {(beneficiaries44x48.length >= 1 || beneficiaries49x53.length >= 1 ||
            beneficiaries54x58.length >= 1 ||
            beneficiaries59more.length >= 1) &&
            (whoUseThePlan !== "somente_eu" || simulationType !== 1) && (
            <div className="flex flex-col gap-8 lg:flex-grow lg:max-w-[30%]">
              {beneficiaries44x48.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 44-48 anos`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"/Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries44x48.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.fortyFourTo48Prices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}

              {beneficiaries49x53.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 49-53 anos`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"/Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries49x53.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.fortyNineTo53Prices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}

              {beneficiaries54x58.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 54-58 anos`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"/Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries54x58.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.fiftyFourTo58Prices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}

              {beneficiaries59more.length >= 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <FormTitleH2
                      text={`${
                        simulationType === 1 ? "Dependentes" : "Beneficiários"
                      } 59 anos ou mais`}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => changeStep(3, "specificStep")}
                    >
                      <Image
                        src={"/Simulador/pen-icon.png"}
                        alt="Edit Icon"
                        width=""
                        height=""
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-[#a9a9a9]">
                    <span>a100 rmbh</span>
                    <span>
                      {beneficiaries59more.reduce(
                        (prevVal, el) => prevVal + el.qty,
                        0,
                      )}{" "}
                      {`${
                        simulationType === 1 ? "dependentes" : "beneficiários"
                      }`}
                    </span>
                    <span>
                      R$ {`${
                        priceRanges.fiftyNinePlusPrices.value?.toString()
                          .replace(
                            ".",
                            ",",
                          )
                      }`}/mês por pessoa
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
