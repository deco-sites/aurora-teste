import SiteInputText from "site/components/Site/site-input-text.tsx";
import SiteInputSelect from "site/components/Site/site-input-select.tsx";
import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { citiesOptions } from "site/helpers/Simulador/cities.ts";
import SiteTextArea from "site/components/Site/text-area.tsx";
import { useEffect, useState } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import SendingConfirmation from "site/components/Site/sending-confirmation.tsx";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import SiteUFSelect from "site/components/Site/site-uf-select.tsx";
import SiteCitiesSelect from "site/components/Site/site-cities-select.tsx";
import Image from "apps/website/components/Image.tsx";

export interface RequestQuoteIslandProps {
    recipientsEmail: string;
    subject: string;
}

const talkToUsEmailSended = signal(false);

export default function TalkToUsIsland(
    { recipientsEmail, subject }: RequestQuoteIslandProps,
) {
    const [namePlaceholder, setNamePlaceholder] = useState("Escreva aqui");
    const [emailPlaceholder, setEmailPlaceholder] = useState(
        "seuemail@email.com",
    );
    const [telPlaceholder, setTelPlaceholder] = useState("(xx) x xxxx xxxx");
    const [UFPlaceholder, setUFPlaceholder] = useState("MG");
    const [cityPlaceholder, setCityPlaceholder] = useState("Belo Horizonte");
    const [textAreaPlaceHolder, setTextAreaPlaceHolder] = useState(
        "Escreva sua mensagem aqui",
    );

    useEffect(() => {
        const updateNamePlaceholder = () => {
            if (window.innerWidth < 640) {
                setNamePlaceholder("Nome completo");
                setEmailPlaceholder("E-mail");
                setTelPlaceholder("Telefone");
                setUFPlaceholder("UF");
                setCityPlaceholder("Cidade");
                setTextAreaPlaceHolder("Escreva sua mensagem aqui");
            } else {
                setNamePlaceholder("Escreva aqui");
                setEmailPlaceholder("seuemail@email.com");
                setTelPlaceholder("(xx) x xxxx xxxx");
                setUFPlaceholder("MG");
                setCityPlaceholder("Belo Horizonte");
                setTextAreaPlaceHolder("Escreva sua mensagem aqui");
            }
        };

        updateNamePlaceholder(); // Set initial placeholder based on screen size
        globalThis.addEventListener("resize", updateNamePlaceholder);

        return () =>
            globalThis.removeEventListener("resize", updateNamePlaceholder);
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [UF, setUF] = useState("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [UFError, setUFError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const checkFields = (e) => {
        e.preventDefault();

        // Verifica os campos e atualiza os estados de erro
        const nameErrorStatus = name === "";
        const emailErrorStatus = email === "";
        const telErrorStatus = tel === "";
        const UFErrorStatus = UF === "";
        const cityErrorStatus = city === "";
        const messageErrorStatus = message === "";

        setNameError(nameErrorStatus);
        setEmailError(emailErrorStatus);
        setTelError(telErrorStatus);
        setUFError(UFErrorStatus);
        setCityError(cityErrorStatus);
        setMessageError(messageErrorStatus);

        // Se todos os erros forem resolvidos, envie o formulário
        if (
            !nameErrorStatus &&
            !emailErrorStatus &&
            !telErrorStatus &&
            !UFErrorStatus &&
            !cityErrorStatus &&
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
        Nome: ${name}
        E-mail: ${email}
        Telefone: ${tel}
        UF: ${UF}
        Cidade: ${city}
        Mensagem: ${message}
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        talkToUsEmailSended.value = true;
        await invoke.site.actions.sendEmail({
            recipientsEmail: recipientsEmail,
            subject: subject,
            data: sendData,
        });
    };

    const formComponent = (
        <div className="flex justify-center px-10 lg:px-0">
            <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32 lg:px-32">
                <form className="flex flex-col gap-4 lg:gap-11">
                    <span className="lg:hidden font-bold text-xl text-gray3">
                        Informações de contato:
                    </span>
                    <div className="relative flex items-center gap-2 flex-grow">
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

                    <div className="block lg:hidden w-full">
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
                    <div className="flex mb-6 lg:mb-3 gap-4 lg:gap-11 border-b border-b-black pb-10 border-opacity-5 lg:pb-0 lg:border-none">
                        <div className="hidden lg:block">
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
                                label={"UF:"}
                                value={UF}
                                inputValueSetter={setUF}
                                options={ufs}
                            />
                            {UFError && (
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
                            placeholder={textAreaPlaceHolder}
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
    );

    return talkToUsEmailSended.value
        ? <SendingConfirmation signalToChange={talkToUsEmailSended} />
        : formComponent;
}
