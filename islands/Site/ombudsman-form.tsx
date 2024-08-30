//Queremos te ouvir.<br /> Deixe sua mensagem <br />abaixo.
//Queremos te<br /> ouvir. Deixe<br /> sua mensagem <br />abaixo.

import SiteInputText from "site/components/Site/site-input-text.tsx";
import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { citiesOptions } from "site/helpers/Simulador/cities.ts";
import SiteInputSelect from "site/components/Site/site-input-select.tsx";
import SiteTextArea from "site/components/Site/text-area.tsx";
import { useEffect, useState } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import SendingConfirmation from "site/components/Site/sending-confirmation.tsx";
import { protocolMask } from "site/helpers/Simulador/protocolMask.ts";
import { cpfMask } from "site/helpers/Simulador/cpfMask.ts";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import { cepMask } from "site/helpers/Simulador/cepMask.ts";
import SiteUFSelect from "site/components/Site/site-uf-select.tsx";
import SiteCitiesSelect from "site/components/Site/site-cities-select.tsx";
import Image from "apps/website/components/Image.tsx";

export interface OmbudsmanIslandProps {
    recipientsEmail: string;
    subtitle: string;
    mobileSubtitle: string;
    subject: string;
}

const ombudsmanEmailSended = signal(false);

export default function OmbudsmanIsland(
    { recipientsEmail, subject, subtitle, mobileSubtitle }:
        OmbudsmanIslandProps,
) {
    const [protocolNumberPlaceholder, setProtocolNumberPlaceholder] = useState(
        "xxxxxxxxxxxxxxxxxxxx",
    );
    const [cardCodePlaceholder, setCardCodePlaceholder] = useState(
        "xxxxxxxxxxxxxxxxx",
    );
    const [namePlaceholder, setNamePlaceholder] = useState("Escreva aqui");
    const [emailPlaceholder, setEmailPlaceholder] = useState(
        "seuemail@email.com",
    );
    const [cpfPlaceholder, setCpfPlaceholder] = useState("xxx.xxx.xxx-xx");
    const [telPlaceholder, setTelPlaceholder] = useState("(xx) x xxxx xxxx");
    const [UFPlaceholder, setUFPlaceholder] = useState("MG");
    const [cityPlaceholder, setCityPlaceholder] = useState("Belo Horizonte");
    const [addressPlaceholder, setAddressPlaceholder] = useState(
        "Rua, Bairro e Número",
    );
    const [cepPlaceholder, setCepPlaceholder] = useState("xx.xxx-xxx");
    const [textareaPlaceholder, setTextareaPlaceholder] = useState(
        "Escreva sua mensagem aqui",
    );

    useEffect(() => {
        const updateNamePlaceholder = () => {
            if (window.innerWidth < 640) {
                setProtocolNumberPlaceholder("Número do Protocolo");
                setCardCodePlaceholder("Código da Carteirinha");
                setNamePlaceholder("Nome Completo");
                setEmailPlaceholder("Email");
                setCpfPlaceholder("CPF");
                setTelPlaceholder("Telefone");
                setUFPlaceholder("UF");
                setCityPlaceholder("Cidade");
                setAddressPlaceholder("Endereço");
                setCepPlaceholder("CEP");
                setTextareaPlaceholder("Escreva sua mensagem aqui");
            } else {
                setProtocolNumberPlaceholder("xxxxxxxxxxxxxxxxxxxx");
                setCardCodePlaceholder("xxxxxxxxxxxxxxxxx");
                setNamePlaceholder("Escreva aqui");
                setEmailPlaceholder("seuemail@email.com");
                setCpfPlaceholder("xxx.xxx.xxx-xx");
                setTelPlaceholder("(xx) x xxxx xxxx");
                setUFPlaceholder("MG");
                setCityPlaceholder("Belo Horizonte");
                setAddressPlaceholder("Rua, Bairro e Número");
                setCepPlaceholder("xx.xxx-xxx");
                setTextareaPlaceholder("Escreva sua mensagem aqui");
            }
        };

        updateNamePlaceholder(); // Set initial placeholder based on screen size
        globalThis.addEventListener("resize", updateNamePlaceholder);

        return () =>
            globalThis.removeEventListener("resize", updateNamePlaceholder);
    }, []);

    const [protocolNumber, setProtocolNumber] = useState("");
    const [cardCode, setCardCode] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [UF, setUF] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [cep, setCep] = useState("");
    const [message, setMessage] = useState("");

    const [protocolNumberError, setProtocolNumberError] = useState(false);
    const [cardCodeError, setCardCodeError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cpfError, setCpfError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [UFError, setUFError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cepError, setCepError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const checkFields = (e) => {
        e.preventDefault();

        // Verifica os campos e atualiza os estados de erro
        const protocolNumberErrorStatus = protocolNumber === "";
        const cardCodeErrorStatus = cardCode === "";
        const nameErrorStatus = name === "";
        const emailErrorStatus = email === "";
        const cpfErrorStatus = cpf === "";
        const telErrorStatus = tel === "";
        const UFErrorStatus = UF === "";
        const cityErrorStatus = city === "";
        const addressErrorStatus = address === "";
        const cepErrorStatus = cep === "";
        const messageErrorStatus = message === "";

        setProtocolNumberError(protocolNumberErrorStatus);
        setCardCodeError(cardCodeErrorStatus);
        setNameError(nameErrorStatus);
        setEmailError(emailErrorStatus);
        setCpfError(cpfErrorStatus);
        setTelError(telErrorStatus);
        setUFError(UFErrorStatus);
        setCityError(cityErrorStatus);
        setAddressError(addressErrorStatus);
        setCepError(cepErrorStatus);
        setMessageError(messageErrorStatus);

        // Se todos os erros forem resolvidos, envie o formulário
        if (
            !protocolNumberErrorStatus &&
            !cardCodeErrorStatus &&
            !nameErrorStatus &&
            !emailErrorStatus &&
            !cpfErrorStatus &&
            !telErrorStatus &&
            !UFErrorStatus &&
            !cityErrorStatus &&
            !addressErrorStatus &&
            !cepErrorStatus &&
            !messageErrorStatus
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
        Número do Protocolo: ${protocolNumber}
        Código da Carteirinha: ${cardCode}
        Nome: ${name}
        E-mail: ${email}
        CPF: ${cpf}
        Telefone: ${tel}
        UF: ${UF}
        Cidade: ${city}
        Endereço: ${address}
        Cep: ${cep}
        Mensagem: ${message}
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        ombudsmanEmailSended.value = true;
        await invoke.site.actions.sendEmail({
            recipientsEmail: recipientsEmail,
            subject: subject,
            data: sendData,
        });
    };

    const formComponent = (
        <>
            <div className="flex justify-center px-10 lg:px-0">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32 lg:px-32">
                    <div className="mb-14 flex flex-col px-8 gap-5 lg:gap-0 lg:flex-row lg:items-center justify-between lg:px-14 lg:pb-16 lg:border-b border-b-black border-opacity-15 ">
                        <span className="font-sora text-2xl text-orange1 font-bold">
                            Ouvidoria <br /> Aurora Saúde
                        </span>
                        <div className="flex flex-col gap-4 lg:max-w-[500px] text-black text-opacity-50">
                            <span
                                className="hidden lg:block"
                                dangerouslySetInnerHTML={{ __html: subtitle }}
                            >
                            </span>

                            <span
                                className="block lg:hidden"
                                dangerouslySetInnerHTML={{
                                    __html: mobileSubtitle,
                                }}
                            >
                            </span>
                        </div>
                    </div>
                    <form className="flex flex-col gap-4 lg:gap-11">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 border-b border-b-black border-opacity-15 lg:border-none pb-10 lg:pb-0">
                            <div className="relative flex items-center gap-2 flex-grow">
                                <SiteInputText
                                    id={"protocol"}
                                    name={"protocol"}
                                    label={"Número do Protocolo"}
                                    value={protocolNumber}
                                    inputValueSetter={setProtocolNumber}
                                    placeholder={protocolNumberPlaceholder}
                                    mask={protocolMask}
                                    maxLength={20}
                                    wfull
                                />
                                {protocolNumberError && (
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
                                    id={"cardcode"}
                                    name={"cardcode"}
                                    label={"Código da Carteirinha"}
                                    value={cardCode}
                                    inputValueSetter={setCardCode}
                                    placeholder={cardCodePlaceholder}
                                    mask={protocolMask}
                                    maxLength={17}
                                    wfull
                                />
                                {cardCodeError && (
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
                        <div className="relative flex items-center gap-2">
                            <SiteInputText
                                id={"name"}
                                name={"name"}
                                label={"Nome"}
                                value={name}
                                inputValueSetter={setName}
                                placeholder={namePlaceholder}
                                wfull
                            />
                            {nameError && (
                                <Image
                                    src={"/Simulador/error-circle-icon.png"}
                                    alt="Error Icon"
                                    className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                    width=""
                                    height=""
                                />
                            )}
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5">
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
                            <div className="block lg:hidden">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"tel"}
                                        name={"tel"}
                                        label={"Telefone"}
                                        value={tel}
                                        inputValueSetter={setTel}
                                        placeholder={telPlaceholder}
                                        mask={PhoneMask}
                                        maxLength={16}
                                        wfull
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
                            </div>
                            <div className="relative flex items-center gap-2 flex-grow">
                                <SiteInputText
                                    id={"cpf"}
                                    name={"cpf"}
                                    label={"CPF"}
                                    value={cpf}
                                    inputValueSetter={setCpf}
                                    placeholder={cpfPlaceholder}
                                    mask={cpfMask}
                                    maxLength={14}
                                    wfull
                                />
                                {cpfError && (
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
                        <div className="flex flex-col gap-4 lg:hidden">
                            <div className="relative flex items-center gap-2 flex-grow">
                                <SiteInputText
                                    id={"cep"}
                                    name={"cep"}
                                    label={"CEP"}
                                    value={cep}
                                    inputValueSetter={setCep}
                                    placeholder={cepPlaceholder}
                                    mask={cepMask}
                                    maxLength={10}
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
                        </div>
                        <div className="flex mb-3 gap-4 lg:gap-8 border-b border-b-black border-opacity-15 lg:border-none pb-10 lg:pb-0">
                            <div className="hidden lg:block">
                                <div className="relative flex items-center gap-2 flex-grow">
                                    <SiteInputText
                                        id={"tel"}
                                        name={"tel"}
                                        label={"Telefone"}
                                        value={tel}
                                        inputValueSetter={setTel}
                                        placeholder={telPlaceholder}
                                        mask={PhoneMask}
                                        maxLength={16}
                                        wfull
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
                            </div>
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
                        <div className="hidden lg:flex flex-col lg:flex-row gap-5">
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
                                    placeholder={cepPlaceholder}
                                    mask={cepMask}
                                    maxLength={10}
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
                            <SiteTextArea
                                id={"message"}
                                name={"message"}
                                value={message}
                                inputValueSetter={setMessage}
                                placeholder={textareaPlaceholder}
                            />
                            {messageError && (
                                <Image
                                    src={"/Simulador/error-circle-icon.png"}
                                    alt="Error Icon"
                                    className="h-5 w-5 absolute top-50 right-4" //lg:left-[615px]
                                    width=""
                                    height=""
                                />
                            )}
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
        </>
    );

    return ombudsmanEmailSended.value
        ? <SendingConfirmation signalToChange={ombudsmanEmailSended} />
        : formComponent;
}
