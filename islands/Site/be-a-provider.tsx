import SiteInputText from "site/components/Site/site-input-text.tsx";
import SiteInputSelect from "site/components/Site/site-input-select.tsx";
import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { citiesOptions } from "site/helpers/Simulador/cities.ts";
import { useEffect, useState } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import SendingConfirmation from "site/components/Site/sending-confirmation.tsx";
import { cnpjMask } from "site/helpers/Simulador/cnpjMask.ts";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import { cepMask } from "site/helpers/Simulador/cepMask.ts";
import SiteUFSelect from "site/components/Site/site-uf-select.tsx";
import SiteCitiesSelect from "site/components/Site/site-cities-select.tsx";
import Image from "apps/website/components/Image.tsx";

export interface RequestQuoteIslandProps {
    recipientsEmail: string;
    subject: string;
}

const beAProviderEmailSended = signal(false);

export default function BeAProviderFormIsland(
    { recipientsEmail, subject }: RequestQuoteIslandProps,
) {
    const [socialReasonPlaceholder, setSocialReasonPlaceholder] = useState(
        "Escreva aqui",
    );
    const [responsibleNamePlaceholder, setResponsibleNamePlaceholder] =
        useState(
            "Escreva aqui",
        );
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

    useEffect(() => {
        const updateNamePlaceholder = () => {
            if (globalThis.innerWidth < 640) {
                setSocialReasonPlaceholder("Razão Social");
                setResponsibleNamePlaceholder("Nome do Responsável");
                setEmailPlaceholder("Email");
                setCnpjPlaceholder("CNPJ");
                setTelPlaceholder("Telefone");
                setUFPlaceholder("UF");
                setCityPlaceholder("Cidade");
                setAddressPlaceholder("Endereço");
                setCepPlaceholder("CEP");
            } else {
                setSocialReasonPlaceholder("Escreva aqui");
                setResponsibleNamePlaceholder("Escreva aqui");
                setEmailPlaceholder("seuemail@email.com");
                setCnpjPlaceholder("xx. xxx. xxx/xxxx-xx");
                setTelPlaceholder("(xx) x xxxx xxxx");
                setUFPlaceholder("MG");
                setCityPlaceholder("Belo Horizonte");
                setAddressPlaceholder("Rua, Bairro e Número");
                setCepPlaceholder("xx.xxx-xxx");
            }
        };

        updateNamePlaceholder(); // Set initial placeholder based on screen size
        globalThis.addEventListener("resize", updateNamePlaceholder);

        return () =>
            globalThis.removeEventListener("resize", updateNamePlaceholder);
    }, []);

    const [socialReason, setSocialReason] = useState("");
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

    const [socialReasonError, setSocialReasonError] = useState(false);
    const [responsibleNameError, setResponsibleNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cnpjError, setCNPJError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [UFError, setUFError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cepError, setCepError] = useState(false);

    const checkFields = (e) => {
        e.preventDefault();

        // Verifica os campos e atualiza os estados de erro
        const socialReasonErrorStatus = socialReason === "";
        const responsibleNameErrorStatus = responsibleName === "";
        const emailErrorStatus = email === "";
        const cnpjErrorStatus = cnpj === "";
        const telErrorStatus = tel === "";
        const UFErrorStatus = UF === "";
        const cityErrorStatus = city === "";
        const addressErrorStatus = address === "";
        const cepErrorStatus = cep === "";

        setSocialReasonError(socialReasonErrorStatus);
        setResponsibleNameError(responsibleNameErrorStatus);
        setEmailError(emailErrorStatus);
        setCNPJError(cnpjErrorStatus);
        setTelError(telErrorStatus);
        setUFError(UFErrorStatus);
        setCityError(cityErrorStatus);
        setAddressError(addressErrorStatus);
        setCepError(cepErrorStatus);

        // Se todos os erros forem resolvidos, envie o formulário
        if (
            !socialReasonErrorStatus &&
            !responsibleNameErrorStatus &&
            !emailErrorStatus &&
            !cnpjErrorStatus &&
            !telErrorStatus &&
            !UFErrorStatus &&
            !cityErrorStatus &&
            !addressErrorStatus &&
            !cepErrorStatus
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
        Razão Social: ${socialReason}
        Nome do Responsável: ${responsibleName}
        E-mail: ${email}
        CNPJ: ${cnpj}
        Telefone: ${tel}
        UF: ${UF}
        Cidade: ${city}
        Endereço: ${address}
        Cep: ${cep}
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        beAProviderEmailSended.value = true;
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
                            Seja um prestador<br /> credenciado
                        </span>
                        <div className="flex flex-col gap-4 lg:max-w-[500px] text-black text-opacity-50">
                            <span>
                                Você, médico, clínica ou laboratório, é
                                apaixonado por cuidar da saúde das pessoas?
                                Aqui, na Aurora Saúde, acreditamos que a
                                colaboração é a chave para promover o bem-estar.
                            </span>
                            <span>
                                Convidamos você a se tornar um prestador
                                credenciado e fazer parte da nossa rede de
                                cuidados de qualidade. Junte-se a nós na missão
                                de oferecer atendimento excepcional e acessível
                                a mais pessoas.
                            </span>
                            <span>
                                Esse pode ser o começo de uma jornada conosco
                                para cuidar e estar junto de quem mais precisa!
                            </span>
                        </div>
                    </div>
                    <form className="flex flex-col gap-4 lg:gap-11">
                        <div className="relative flex items-center gap-2 flex-grow">
                            <SiteInputText
                                id={"socialReason"}
                                name={"socialReason"}
                                label={"Razão Social"}
                                value={socialReason}
                                inputValueSetter={setSocialReason}
                                placeholder={socialReasonPlaceholder}
                                wfull
                            />
                            {socialReasonError && (
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
                                    className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                    width=""
                                    height=""
                                />
                            )}
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
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
                                        className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
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
                                        className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                        width=""
                                        height=""
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex gap-11">
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
                                        className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                        width=""
                                        height=""
                                    />
                                )}
                            </div>
                            <div className="hidden lg:flex gap-11 lg:w-3/5">
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
                        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-11">
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
                                        className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
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
                                        className="h-5 w-5 absolute top-50 -right-6" //lg:left-[615px]
                                        width=""
                                        height=""
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 lg:hidden">
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

                        <div className="flex justify-end w-full mt-4 lg:mt-0">
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

    return beAProviderEmailSended.value
        ? <SendingConfirmation signalToChange={beAProviderEmailSended} />
        : formComponent;
}
