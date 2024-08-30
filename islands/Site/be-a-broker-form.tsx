import SiteInputText from "site/components/Site/site-input-text.tsx";
import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { citiesOptions } from "site/helpers/Simulador/cities.ts";
import SiteInputSelect from "site/components/Site/site-input-select.tsx";
import MobileInputSelectWithLabel from "site/components/Site/mobile-input-select-with-label.tsx";
import { useEffect, useState } from "preact/hooks";
import { yesOrNoOptions } from "site/helpers/Site/yes-or-no.ts";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import SendingConfirmation from "site/components/Site/sending-confirmation.tsx";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import { cepMask } from "site/helpers/Simulador/cepMask.ts";
import { cnpjMask } from "site/helpers/Simulador/cnpjMask.ts";
import SiteUFSelect from "site/components/Site/site-uf-select.tsx";
import SiteCitiesSelect from "site/components/Site/site-cities-select.tsx";
import CustomSelect from "site/components/Site/custom-select.tsx";
import CustomSelectWithLabels from "site/components/Site/custom-select-whit-labels.tsx";
import Image from "apps/website/components/Image.tsx";

export interface RequestQuoteIslandProps {
    recipientsEmail: string;
    subject: string;
}

const beABrokerEmailSended = signal(false);

export default function BeABrokerFormIsland(
    { recipientsEmail, subject }: RequestQuoteIslandProps,
) {
    const [brokerNamePlaceholder, setbrokerNamePlaceholder] = useState(
        "Escreva aqui",
    );
    const [responsibleNamePlaceholder, setresponsibleNamePlaceholder] =
        useState("Escreva aqui");
    const [emailPlaceholder, setEmailPlaceholder] = useState(
        "seuemail@email.com",
    );
    const [cnpjPlaceholder, setCnpjPlaceholder] = useState(
        "xx. xxx. xxx/xxxx-xx",
    );
    const [telPlaceholder, setTelPlaceholder] = useState("(xx) x xxxx xxxx");
    const [UFPlaceholder, setUFPlaceholder] = useState("MG");
    const [cityPlaceholder, setCityPlaceholder] = useState("Belo Horizonte");
    const [addressPlaceholder, setAddressPlaceholder] = useState(
        "Rua, Bairro e Número",
    );
    const [cepPlaceholder, setCepPlaceholder] = useState("xx.xxx-xxx");
    const [employeesQtyPlaceholder, setemployeesQtyPlaceholder] = useState(
        "Quantos funcionários tem a sua corretora?",
    );

    const [customerBasePlaceholder, setcustomerBasePlaceholder] = useState(
        "Não",
    );
    const [haveSalesPlaceholder, sethaveSalesPlaceholder] = useState(
        "Não",
    );

    useEffect(() => {
        const updateNamePlaceholder = () => {
            if (globalThis.innerWidth < 640) {
                setbrokerNamePlaceholder("Nome da Corretora");
                setresponsibleNamePlaceholder("Nome do Responsável");
                setEmailPlaceholder("E-mail");
                setCnpjPlaceholder("CNPJ");
                setTelPlaceholder("Telefone");
                setUFPlaceholder("UF");
                setCityPlaceholder("Cidade");
                setAddressPlaceholder("Endereço");
                setCepPlaceholder("CEP");
                setemployeesQtyPlaceholder(
                    "Quantos funcionários tem a sua corretora?",
                );
                setcustomerBasePlaceholder("Não");
                sethaveSalesPlaceholder("Não");
            } else {
                setbrokerNamePlaceholder("Escreva aqui");
                setresponsibleNamePlaceholder("Escreva aqui");
                setEmailPlaceholder("seuemail@email.com");
                setCnpjPlaceholder("xx.xxx.xxx/xxxx-xx");
                setTelPlaceholder("(xx) x xxxx xxxx");
                setUFPlaceholder("Selecione");
                setCityPlaceholder("Selecione");
                setAddressPlaceholder("Rua, Número e Bairro");
                setCepPlaceholder("xx.xxx-xxx");
                setemployeesQtyPlaceholder("Escreva aqui");
                setcustomerBasePlaceholder("Não");
                sethaveSalesPlaceholder("Não");
            }
        };

        updateNamePlaceholder(); // Set initial placeholder based on screen size
        globalThis.addEventListener("resize", updateNamePlaceholder);

        return () =>
            globalThis.removeEventListener("resize", updateNamePlaceholder);
    }, []);

    const [brokerName, setBrokerName] = useState("");
    const [responsibleName, setResponsibleName] = useState("");
    const [email, setEmail] = useState("");
    const [cnpj, setCNPJ] = useState("");
    const [tel, setTel] = useState("");
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [UF, setUF] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [cep, setCep] = useState("");
    const [employeesQty, setEmployeesQty] = useState("");
    const [customerBase, setCustomerBase] = useState("");
    const [haveSales, setHaveSales] = useState("");

    const [brokerNameError, setBrokerNameError] = useState(false);
    const [responsibleNameError, setResponsibleNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cnpjError, setCNPJError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [UFError, setUFError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cepError, setCepError] = useState(false);
    const [employeesQtyError, setEmployeesQtyError] = useState(false);
    const [customerBaseError, setCustomerBaseError] = useState(false);
    const [haveSalesError, setHaveSalesError] = useState(false);

    const checkFields = (e) => {
        e.preventDefault();

        // Verifica os campos e atualiza os estados de erro
        const brokerNameErrorStatus = brokerName === "";
        const responsibleNameErrorStatus = responsibleName === "";
        const emailErrorStatus = email === "";
        const cnpjErrorStatus = cnpj === "";
        const telErrorStatus = tel === "";
        const UFErrorStatus = UF === "";
        const cityErrorStatus = city === "";
        const addressErrorStatus = address === "";
        const cepErrorStatus = cep === "";
        const employeesQtyErrorStatus = employeesQty === "";
        const customerBaseErrorStatus = customerBase === "";
        const haveSalesErrorStatus = haveSales === "";

        setBrokerNameError(brokerNameErrorStatus);
        setResponsibleNameError(responsibleNameErrorStatus);
        setEmailError(emailErrorStatus);
        setCNPJError(cnpjErrorStatus);
        setTelError(telErrorStatus);
        setUFError(UFErrorStatus);
        setCityError(cityErrorStatus);
        setAddressError(addressErrorStatus);
        setCepError(cepErrorStatus);
        setEmployeesQtyError(employeesQtyErrorStatus);
        setCustomerBaseError(customerBaseErrorStatus);
        setHaveSalesError(haveSalesErrorStatus);

        // Se todos os erros forem resolvidos, envie o formulário
        if (
            !brokerNameErrorStatus &&
            !responsibleNameErrorStatus &&
            !emailErrorStatus &&
            !cnpjErrorStatus &&
            !telErrorStatus &&
            !UFErrorStatus &&
            !cityErrorStatus &&
            !addressErrorStatus &&
            !cepErrorStatus &&
            !employeesQtyErrorStatus &&
            !customerBaseErrorStatus &&
            !haveSalesErrorStatus
        ) {
            handleSubmit(e);
        }
    };

    // Buscar UFs na API do IBGE
    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => response.json())
            .then((data) => {
                setUfs(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar UFs: ", error);
            });
    }, []);

    //Faz o primeiro fetch usando MG como UF padrão
    useEffect(() => {
        fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/MG/municipios`,
        )
            .then((response) => response.json())
            .then((data) => {
                setCities(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar cidades: ", error);
            });
    }, []);

    // Atualizar as cidades sempre que a UF selecionada mudar
    useEffect(() => {
        if (UF) {
            fetch(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`,
            )
                .then((response) => response.json())
                .then((data) => {
                    setCities(data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar cidades: ", error);
                });
        } else {
            setCities([]);
        }
    }, [UF]);

    const sendData = `
        Nome da Corretora: ${brokerName}
        Nome do Responsável: ${responsibleName}
        E-mail: ${email}
        CNPJ: ${cnpj}
        Telefone: ${tel}
        UF: ${UF}
        Cidade: ${city}
        Endereço: ${address}
        Cep: ${cep}
        Quantidade de funcionários da corretora: ${employeesQty}
        Já possui carteira de clientes? ${customerBase}
        Possui venda para lançar na abertura do código? ${haveSales}
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        beABrokerEmailSended.value = true;
        await invoke.site.actions.sendEmail({
            recipientsEmail: recipientsEmail,
            subject: subject,
            data: sendData,
        });
    };

    const formComponent = (
        <>
            <div className="flex justify-center px-10 lg:px-0">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                    <div className="lg:px-48 flex flex-col gap-16">
                        <span className="font-sora font-semibold text-orange4 text-2xl">
                            Seja um corretor<br /> parceiro
                        </span>

                        <form className="flex flex-col gap-4 lg:gap-11">
                            <div className="relative flex items-center gap-2 flex-grow">
                                <SiteInputText
                                    id={"brokerName"}
                                    name={"brokerName"}
                                    label={"Nome da Corretora"}
                                    value={brokerName}
                                    inputValueSetter={setBrokerName}
                                    placeholder={brokerNamePlaceholder}
                                    wfull
                                />
                                {brokerNameError && (
                                    <Image
                                        src={"/Simulador/error-circle-icon.png"}
                                        alt="Error Icon"
                                        className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                        width=""
                                        height=""
                                    />
                                )}
                            </div>
                            <div className="relative flex items-center gap-2 flex-grow">
                                <SiteInputText
                                    id={"responsibleName"}
                                    name={"responsibleName"}
                                    label={"Nome do Responsável"}
                                    value={responsibleName}
                                    inputValueSetter={setResponsibleName}
                                    placeholder={responsibleNamePlaceholder}
                                    wfull
                                />
                                {responsibleNameError && (
                                    <Image
                                        src={"/Simulador/error-circle-icon.png"}
                                        alt="Error Icon"
                                        className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                        width=""
                                        height=""
                                    />
                                )}
                            </div>
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-9">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"email"}
                                        name={"email"}
                                        label={"E-mail"}
                                        value={email}
                                        inputValueSetter={setEmail}
                                        placeholder={emailPlaceholder}
                                        wfull
                                    />
                                    {emailError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"cnpj"}
                                        name={"cnpj"}
                                        label={"CNPJ"}
                                        value={cnpj}
                                        inputValueSetter={setCNPJ}
                                        mask={cnpjMask}
                                        maxLength={18}
                                        placeholder={cnpjPlaceholder}
                                        wfull
                                    />
                                    {cnpjError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-9">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"tel"}
                                        name={"tel"}
                                        label={"Telefone"}
                                        value={tel}
                                        inputValueSetter={setTel}
                                        mask={PhoneMask}
                                        maxLength={16}
                                        placeholder={telPlaceholder}
                                    />
                                    {telError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col-reverse lg:hidden w-full gap-4 lg:gap-9">
                                    <div className="relative flex items-center gap-2 flex-grow">
                                        <SiteInputText
                                            id={"address"}
                                            name={"address"}
                                            label={"Endereço"}
                                            value={address}
                                            inputValueSetter={setAddress}
                                            placeholder={addressPlaceholder}
                                            wfull
                                        />
                                        {addressError && (
                                            <Image
                                                src={"/Simulador/error-circle-icon.png"}
                                                alt="Error Icon"
                                                className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                                width=""
                                                height=""
                                            />
                                        )}
                                    </div>
                                    <div className="relative flex items-center gap-2 flex-grow">
                                        <SiteInputText
                                            id={"cep"}
                                            name={"cep"}
                                            label={"CEP"}
                                            value={cep}
                                            inputValueSetter={setCep}
                                            mask={cepMask}
                                            maxLength={10}
                                            placeholder={cepPlaceholder}
                                            wfull
                                        />
                                        {cepError && (
                                            <Image
                                                src={"/Simulador/error-circle-icon.png"}
                                                alt="Error Icon"
                                                className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                                width=""
                                                height=""
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full lg:gap-9">
                                    <div className="relative flex items-center gap-2 flex-grow">
                                        <SiteUFSelect
                                            id={"uf"}
                                            name={"uf"}
                                            label={"UF:"}
                                            value={UF}
                                            inputValueSetter={setUF}
                                            options={ufs}
                                            placeholder={UFPlaceholder}
                                            wfull
                                        />
                                        {UFError && (
                                            <Image
                                                src={"/Simulador/error-circle-icon.png"}
                                                alt="Error Icon"
                                                className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                                width=""
                                                height=""
                                            />
                                        )}
                                    </div>
                                    <div className="relative flex items-center gap-2 flex-grow">
                                        <SiteCitiesSelect
                                            id={"city"}
                                            name={"city"}
                                            label={"Cidade:"}
                                            value={city}
                                            inputValueSetter={setCity}
                                            options={cities}
                                            placeholder={cities[0]?.nome}
                                            wfull
                                        />
                                        {cityError && (
                                            <Image
                                                src={"/Simulador/error-circle-icon.png"}
                                                alt="Error Icon"
                                                className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                                width=""
                                                height=""
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:flex flex-col lg:flex-row w-full gap-4 lg:gap-9">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"address"}
                                        name={"address"}
                                        label={"Endereço"}
                                        value={address}
                                        inputValueSetter={setAddress}
                                        placeholder={addressPlaceholder}
                                        wfull
                                    />
                                    {addressError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"cep"}
                                        name={"cep"}
                                        label={"CEP"}
                                        value={cep}
                                        inputValueSetter={setCep}
                                        mask={cepMask}
                                        maxLength={10}
                                        placeholder={cepPlaceholder}
                                        wfull
                                    />
                                    {cepError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="relative flex items-center gap-2 flex-grow">
                                <SiteInputText
                                    id={"employeesQty"}
                                    name={"employeesQty"}
                                    label={"Quantos funcionários tem a sua corretora?"}
                                    value={employeesQty}
                                    inputValueSetter={setEmployeesQty}
                                    placeholder={employeesQtyPlaceholder}
                                    wfull
                                />
                                {employeesQtyError && (
                                    <Image
                                        src={"/Simulador/error-circle-icon.png"}
                                        alt="Error Icon"
                                        className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                        width=""
                                        height=""
                                    />
                                )}
                            </div>
                            <div className="hidden lg:flex flex-col gap-9 w-[40%]">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <CustomSelectWithLabels
                                        label={"Já possui carteira de clientes?"}
                                        value={customerBase}
                                        inputValueSetter={setCustomerBase}
                                        options={yesOrNoOptions}
                                        placeholder={customerBasePlaceholder}
                                    />
                                    {customerBaseError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>

                                <div className="relative flex items-center gap-2 flex-grow">
                                    <CustomSelectWithLabels
                                        label={"Possui venda para lançar na<br /> abertura do código?"}
                                        value={haveSales}
                                        inputValueSetter={setHaveSales}
                                        options={yesOrNoOptions}
                                        placeholder={haveSalesPlaceholder}
                                    />
                                    {haveSalesError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>
                                {
                                    /*
                                <SiteInputSelect
                                    id={"customerBase"}
                                    name={"customerBase"}
                                    label={"Já possui carteira de clientes?"}
                                    value={customerBase}
                                    inputValueSetter={setCustomerBase}
                                    options={yesOrNoOptions}
                                    placeholder={customerBasePlaceholder}
                                />
                                <SiteInputSelect
                                    id={"haveSales"}
                                    name={"haveSales"}
                                    label={"Possui venda para lançar na abertura do código?"}
                                    value={haveSales}
                                    inputValueSetter={setHaveSales}
                                    options={yesOrNoOptions}
                                    placeholder={haveSalesPlaceholder}
                                />*/
                                }
                            </div>
                            <div className="flex flex-col lg:hidden">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <CustomSelectWithLabels
                                        label={"Já possui carteira de clientes?"}
                                        value={customerBase}
                                        inputValueSetter={setCustomerBase}
                                        options={yesOrNoOptions}
                                        placeholder={customerBasePlaceholder}
                                    />
                                    {customerBaseError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>

                                <div className="relative flex items-center gap-2 flex-grow">
                                    <CustomSelectWithLabels
                                        label={"Possui venda para lançar na<br /> abertura do código?"}
                                        value={haveSales}
                                        inputValueSetter={setHaveSales}
                                        options={yesOrNoOptions}
                                        placeholder={haveSalesPlaceholder}
                                    />
                                    {haveSalesError && (
                                        <Image
                                            src={"/Simulador/error-circle-icon.png"}
                                            alt="Error Icon"
                                            className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                            width=""
                                            height=""
                                        />
                                    )}
                                </div>
                                {
                                    /*
                                <MobileInputSelectWithLabel
                                    id={"customerBase"}
                                    name={"customerBase"}
                                    label={"Já possui carteira de clientes?"}
                                    value={customerBase}
                                    inputValueSetter={setCustomerBase}
                                    options={yesOrNoOptions}
                                    placeholder={customerBasePlaceholder}
                                />
                                <MobileInputSelectWithLabel
                                    id={"haveSales"}
                                    name={"haveSales"}
                                    label={"Possui venda para lançar na<br /> abertura do código?"}
                                    value={haveSales}
                                    inputValueSetter={setHaveSales}
                                    options={yesOrNoOptions}
                                    placeholder={haveSales}
                                />
                                */
                                }
                            </div>
                            <div className="flex justify-end w-full">
                                <button
                                    onClick={checkFields}
                                    className="bg-orange4 text-white w-full lg:w-auto lg:px-24 py-3 rounded-full"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

    return beABrokerEmailSended.value
        ? <SendingConfirmation signalToChange={beABrokerEmailSended} />
        : formComponent;
}
