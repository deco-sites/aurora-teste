import TalkToUsIsland from "site/islands/Site/talk-to-us-form.tsx";

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

export default function TalkToUsForm(
  { RecipientsEmailArr, CopyToArr, subject }: Props,
) {
  return (
    <TalkToUsIsland
      RecipientsEmailArr={RecipientsEmailArr}
      CopyToArr={CopyToArr}
      subject={subject}
    />
  );
}
