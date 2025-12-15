import BeAProviderFormIsland from "site/islands/Site/be-a-provider.tsx";

/** @titleBy email */
export interface RecipientsEmail {
  email: string;
}

/** @titleBy email */
export interface CopyEmail {
  email?: string;
}

export interface Props {
  RecipientsEmailArr: RecipientsEmail[];
  CopyToArr?: CopyEmail[];
  subject: string;
}

export default function BeAProviderForm(
  { RecipientsEmailArr, CopyToArr, subject }: Props,
) {
  return (
    <BeAProviderFormIsland
      RecipientsEmailArr={RecipientsEmailArr}
      CopyToArr={CopyToArr}
      subject={subject}
    />
  );
}
