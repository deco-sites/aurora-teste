import WorkWithUsIsland from "site/islands/Site/work-with-us-form.tsx";

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

export default function WorkWithUs(
  { RecipientsEmailArr, CopyToArr, subject }: Props,
) {
  return (
    <WorkWithUsIsland
      RecipientsEmailArr={RecipientsEmailArr}
      CopyToArr={CopyToArr}
      subject={subject}
    />
  );
}
