//Faça parte do plano<br /> de saúde que anda junto.
//Faça parte<br /> do plano<br /> de saúde que <br />anda junto.
import SiteInputText from "site/components/Site/site-input-text.tsx";
import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { citiesOptions } from "site/helpers/Simulador/cities.ts";
import SiteInputSelect from "site/components/Site/site-input-select.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import SendingConfirmation from "site/components/Site/sending-confirmation.tsx";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import { cepMask } from "site/helpers/Simulador/cepMask.ts";
import SiteCitiesSelect from "site/components/Site/site-cities-select.tsx";
import SiteUFSelect from "site/components/Site/site-uf-select.tsx";

export interface WorkWithUsIslandProps {
    recipientsEmail: string;
    subject: string;
}

const workWithUsEmailSended = signal(false);

export default function WorkWithUsIsland(
    { recipientsEmail, subject }: WorkWithUsIslandProps,
) {
    const [namePlaceholder, setNamePlaceholder] = useState("Escreva aqui");
    const [emailPlaceholder, setEmailPlaceholder] = useState(
        "seuemail@email.com",
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
            if (window.innerWidth < 640) {
                setNamePlaceholder("Nome Completo");
                setEmailPlaceholder("Email");
                setTelPlaceholder("Telefone");
                setUFPlaceholder("UF");
                setCityPlaceholder("Cidade");
                setAddressPlaceholder("Endereço");
                setCepPlaceholder("CEP");
            } else {
                setNamePlaceholder("Escreva aqui");
                setEmailPlaceholder("seuemail@email.com");
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

    const fileInputRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [UF, setUF] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [cep, setCep] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [UFError, setUFError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cepError, setCepError] = useState(false);

    const checkFields = (e) => {
        e.preventDefault();

        // Verifica os campos e atualiza os estados de erro
        const nameErrorStatus = name === "";
        const emailErrorStatus = email === "";
        const telErrorStatus = tel === "";
        const UFErrorStatus = UF === "";
        const cityErrorStatus = city === "";
        const addressErrorStatus = address === "";
        const cepErrorStatus = cep === "";

        setNameError(nameErrorStatus);
        setEmailError(emailErrorStatus);
        setTelError(telErrorStatus);
        setUFError(UFErrorStatus);
        setCityError(cityErrorStatus);
        setAddressError(addressErrorStatus);
        setCepError(cepErrorStatus);

        // Se todos os erros forem resolvidos, envie o formulário
        if (
            !nameErrorStatus &&
            !emailErrorStatus &&
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
        Nome: ${name}
        E-mail: ${email}
        Telefone: ${tel}
        UF: ${UF}
        Cidade: ${city}
        Endereço: ${address}
        Cep: ${cep}
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        workWithUsEmailSended.value = true;
        await invoke.site.actions.sendEmail({
            recipientsEmail: recipientsEmail,
            subject: subject,
            attachment: selectedFile,
            data: sendData,
        });
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedFile({
                    name: file.name,
                    type: file.type,
                    content: reader.result.split(",")[1], // Pega o conteúdo base64
                });
            };
        }
    };

    const formComponent = (
        <>
            <div className="flex justify-center px-10 lg:px-0">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32 lg:px-32">
                    <div className="mb-14 flex flex-col px-8 gap-5 lg:gap-0 lg:flex-row lg:items-center justify-between lg:px-14 lg:pb-16 lg:border-b border-b-black border-opacity-15 ">
                        <span className="font-sora text-2xl text-orange1 font-bold">
                            Trabalhe <br /> Conosco
                        </span>
                        <div className="flex flex-col gap-4 lg:max-w-[500px] text-black text-opacity-50">
                            <span>
                                Nossa essência é estar sempre juntos,
                                colaborando e apoiando uns aos outros em nossa
                                jornada pelo bem-estar e pela saúde.
                            </span>
                            <span>
                                Faça parte de nossa equipe, em que a empatia,
                                dedicação e excelência constroem um sistema de
                                saúde eficaz. Se você é apaixonado por cuidar
                                dos outros, comprometido com a qualidade e
                                valoriza respeito, inovação e excelência, a
                                Aurora Saúde é o lugar ideal.
                            </span>
                            <span>
                                Estamos à procura de talentos comprometidos para
                                fazer a diferença na vida das pessoas. Junte-se
                                a nós!
                            </span>
                        </div>
                    </div>
                    <form className="flex flex-col gap-4 lg:gap-11">
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

                        <div className="flex lg:hidden">
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

                        <div className="hidden lg:flex gap-10">
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

                        <div className="flex gap-4 lg:gap-10 flex-col-reverse lg:flex-row">
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

                        <div className="flex gap-4 lg:hidden pb-10 border-b border-b-black border-opacity-10 lg:border-none">
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
                        <div className="flex pt-10 lg:pt-0 flex-col lg:flex-row gap-4 lg:gap-0 justify-between w-full">
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <button
                                    className="flex justify-center items-center gap-5 bg-transparent border border-orange4 text-orange4 w-full lg:w-auto lg:px-10 py-3 rounded-full"
                                    onClick={handleButtonClick}
                                >
                                    <Image
                                        src={"/Site/clip-icon.svg"}
                                        alt="Clip Icon"
                                        className=""
                                    />
                                    Envie o seu currículo
                                </button>
                                {selectedFile && (
                                    <span className="text-xs text-red">
                                        {selectedFile.name}
                                    </span>
                                )}
                            </div>
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

    return workWithUsEmailSended.value
        ? <SendingConfirmation signalToChange={workWithUsEmailSended} />
        : formComponent;
}
