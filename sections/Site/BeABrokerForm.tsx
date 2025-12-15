import BeABrokerFormIsland from "site/islands/Site/be-a-broker-form.tsx";

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
  textButton: string;
}

export default function BeABrokerForm(
  { RecipientsEmailArr, CopyToArr, subject }: Props,
) {
  return (
    <BeABrokerFormIsland
      RecipientsEmailArr={RecipientsEmailArr}
      CopyToArr={CopyToArr}
      subject={subject}
    />
  );
}
