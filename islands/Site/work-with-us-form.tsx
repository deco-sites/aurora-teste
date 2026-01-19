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
     STATES EXISTENTES
  ======================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [UF, setUF] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [vaga, setVaga] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
     🆕 LGPD
  ======================= */
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);

  const fileInputRef = useRef(null);

  /* =======================
     VALIDAÇÃO
  ======================= */
  const checkFields = (e) => {
    e.preventDefault();

    const nameErrorStatus = name === "";
    const emailErrorStatus = email === "";
    const telErrorStatus = tel === "";
    const UFErrorStatus = UF === "";
    const cityErrorStatus = city === "";
    const addressErrorStatus = address === "";
    const cepErrorStatus = cep === "";
    const vagaErrorStatus = vaga === "";
    const attachmentErrorStatus = selectedFile === null;
    const lgpdErrorStatus = !lgpdAccepted;

    setNameError(nameErrorStatus);
    setEmailError(emailErrorStatus);
    setTelError(telErrorStatus);
    setUFError(UFErrorStatus);
    setCityError(cityErrorStatus);
    setAddressError(addressErrorStatus);
    setCepError(cepErrorStatus);
    setVagaError(vagaErrorStatus);
    setAttachmentError(attachmentErrorStatus);
    setLgpdError(lgpdErrorStatus);

    if (
      !nameErrorStatus &&
      !emailErrorStatus &&
      !telErrorStatus &&
      !UFErrorStatus &&
      !cityErrorStatus &&
      !addressErrorStatus &&
      !cepErrorStatus &&
      !vagaErrorStatus &&
      !attachmentErrorStatus &&
      !lgpdErrorStatus
    ) {
      handleSubmit(e);
    }
  };

  /* =======================
     ENVIO
  ======================= */
  const sendData = `
Nome: ${name}
E-mail: ${email}
Telefone: ${tel}
UF: ${UF}
Cidade: ${city}
Endereço: ${address}
Cep: ${cep}
Vaga: ${vaga}

Consentimento LGPD: SIM
Data/Hora: ${new Date().toLocaleString("pt-BR")}
`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lgpdAccepted) {
      setLgpdError(true);
      return;
    }

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
    <form className="flex flex-col gap-6">
      <SiteInputText
        label="Nome completo"
        value={name}
        onChange={(e) => setName(e)}
        error={nameError}
      />

      <SiteInputText
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e)}
        error={emailError}
      />

      <SiteInputText
        label="Telefone"
        value={tel}
        onChange={(e) => setTel(PhoneMask(e))}
        error={telError}
      />

      <SiteUFSelect
        value={UF}
        onChange={(e) => setUF(e)}
        error={UFError}
        options={ufsOptions}
      />

      <SiteCitiesSelect
        uf={UF}
        value={city}
        onChange={(e) => setCity(e)}
        error={cityError}
        options={citiesOptions}
      />

      <SiteInputText
        label="Endereço"
        value={address}
        onChange={(e) => setAddress(e)}
        error={addressError}
      />

      <SiteInputText
        label="CEP"
        value={cep}
        onChange={(e) => setCep(cepMask(e))}
        error={cepError}
      />

      <SiteInputSelect
        label="Vaga pretendida"
        value={vaga}
        onChange={(e) => setVaga(e)}
        error={vagaError}
        options={[
          { label: "Administrativo", value: "Administrativo" },
          { label: "Comercial", value: "Comercial" },
          { label: "TI", value: "TI" },
        ]}
      />

      {/* Upload currículo */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => setSelectedFile(e.currentTarget.files?.[0] ?? null)}
      />
      {attachmentError && (
        <span className="text-xs text-red">
          Anexe seu currículo.
        </span>
      )}

      {/* LGPD */}
      <div className="flex flex-col gap-2 pt-4">
        <label className="flex items-start gap-3 text-sm text-black text-opacity-70">
          <input
            type="checkbox"
            checked={lgpdAccepted}
            onChange={(e) => {
              setLgpdAccepted(e.currentTarget.checked);
              setLgpdError(false);
            }}
            className="mt-1"
          />
          <span>
            Li e concordo com a{" "}
            <a
              href="/politica-de-privacidade-candidatos"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange4"
            >
              Política de Privacidade
            </a>
            .
          </span>
        </label>

        {lgpdError && (
          <span className="text-xs text-red">
            É necessário aceitar a Política de Privacidade.
          </span>
        )}
      </div>

      <button
        type="submit"
        onClick={checkFields}
        disabled={!lgpdAccepted}
        className={`bg-orange4 text-white w-full lg:w-auto lg:px-24 py-3 rounded-full ${!lgpdAccepted ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        Enviar
      </button>
    </form>
  );


  return workWithUsEmailSended.value
    ? <SendingConfirmation signalToChange={workWithUsEmailSended} />
    : formComponent;
}
