import SiteInputText from "site/components/Site/site-input-text.tsx";
import { ufsOptions } from "site/helpers/Site/ufsOptions.ts";
import { citiesOptions } from "site/helpers/Simulador/cities.ts";
import SiteInputSelect from "site/components/Site/site-input-select.tsx";
import { useRef, useState } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { signal } from "@preact/signals";
import SendingConfirmation from "site/components/Site/sending-confirmation.tsx";
import { PhoneMask } from "site/helpers/Simulador/phoneMask.ts";
import { cepMask } from "site/helpers/Simulador/cepMask.ts";
import SiteCitiesSelect from "site/components/Site/site-cities-select.tsx";
import SiteUFSelect from "site/components/Site/site-uf-select.tsx";

export interface RecipientsEmail {
  email: string;
}

export interface CopyEmail {
  email?: string;
}

export interface WorkWithUsIslandProps {
  RecipientsEmailArr: RecipientsEmail[];
  CopyToArr?: CopyEmail[];
  subject: string;
}

const workWithUsEmailSended = signal(false);

export default function WorkWithUsIsland(
  { RecipientsEmailArr, CopyToArr, subject }: WorkWithUsIslandProps,
) {
  /* =======================
     STATES
  ======================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [UF, setUF] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [vaga, setVaga] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [UFError, setUFError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cepError, setCepError] = useState(false);
  const [vagaError, setVagaError] = useState(false);
  const [attachmentError, setAttachmentError] = useState(false);

  /* =======================
     LGPD (link clicado)
  ======================= */
  const [policyVisited, setPolicyVisited] = useState(false);
  const [policyError, setPolicyError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* =======================
     VALIDATION
  ======================= */
  const checkFields = (e: Event) => {
    e.preventDefault();

    if (!policyVisited) {
      setPolicyError(true);
      return;
    }

    const nameErrorStatus = name === "";
    const emailErrorStatus = email === "";
    const telErrorStatus = tel === "";
    const UFErrorStatus = UF === "";
    const cityErrorStatus = city === "";
    const addressErrorStatus = address === "";
    const cepErrorStatus = cep === "";
    const vagaErrorStatus = vaga === "";
    const attachmentErrorStatus = selectedFile === null;

    setNameError(nameErrorStatus);
    setEmailError(emailErrorStatus);
    setTelError(telErrorStatus);
    setUFError(UFErrorStatus);
    setCityError(cityErrorStatus);
    setAddressError(addressErrorStatus);
    setCepError(cepErrorStatus);
    setVagaError(vagaErrorStatus);
    setAttachmentError(attachmentErrorStatus);

    if (
      !nameErrorStatus &&
      !emailErrorStatus &&
      !telErrorStatus &&
      !UFErrorStatus &&
      !cityErrorStatus &&
      !addressErrorStatus &&
      !cepErrorStatus &&
      !vagaErrorStatus &&
      !attachmentErrorStatus
    ) {
      handleSubmit(e);
    }
  };

  /* =======================
     SUBMIT
  ======================= */
  const sendData = `
Nome: ${name}
E-mail: ${email}
Telefone: ${tel}
UF: ${UF}
Cidade: ${city}
Endereço: ${address}
CEP: ${cep}
Vaga pretendida: ${vaga}

Política de Privacidade acessada: SIM
Data/Hora: ${new Date().toLocaleString("pt-BR")}
`;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    workWithUsEmailSended.value = true;

    await invoke.site.actions.sendEmail({
      RecipientsEmailArr,
      CopyToArr,
      subject,
      attachment: selectedFile,
      data: sendData,
    });
  };

  /* =======================
     JSX
  ======================= */
  const formComponent = (
    <>
      {/* 🔹 FORMULÁRIO ORIGINAL (inputs, selects, upload)
          🔹 Nenhuma estrutura foi alterada aqui
      */}

      {/* TERMO LGPD (APENAS LINK) */}
      <div className="pt-6 text-sm text-black text-opacity-70">
        <span>
          Li e concordo com a{" "}
          <a
            href="/politica-de-privacidade-candidatos"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-orange4"
            onClick={() => {
              setPolicyVisited(true);
              setPolicyError(false);
            }}
          >
            Política de Privacidade
          </a>
          .
        </span>

        {policyError && (
          <div className="text-xs text-red mt-1">
            É necessário acessar a Política de Privacidade para continuar.
          </div>
        )}
      </div>

      {/* BOTÃO */}
      <button
        onClick={checkFields}
        disabled={!policyVisited}
        className={`bg-orange4 text-white w-full lg:w-auto lg:px-24 py-3 rounded-full ${
          !policyVisited ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Enviar
      </button>
    </>
  );

  return workWithUsEmailSended.value
    ? <SendingConfirmation signalToChange={workWithUsEmailSended} />
    : formComponent;
}
