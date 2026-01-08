import RequestQuoteIsland from "site/islands/Site/request-quote-form.tsx";

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

export default function RequestQuoteForm(
  { RecipientsEmailArr, CopyToArr, subject }: Props,
) {
  return (
    <RequestQuoteIsland
      RecipientsEmailArr={RecipientsEmailArr}
      CopyToArr={CopyToArr}
      subject={subject}
    />
  );
}
