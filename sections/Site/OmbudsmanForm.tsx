import OmbudsmanIsland from "site/islands/Site/ombudsman-form.tsx";

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
  /**
   * @format rich-text
   */
  subtitle: string;
  /**
   * @format rich-text
   */
  mobileSubtitle: string;
}

export default function OmbudsmanForm(
  { RecipientsEmailArr, CopyToArr, subject, subtitle, mobileSubtitle }: Props,
) {
  return (
    <OmbudsmanIsland
      RecipientsEmailArr={RecipientsEmailArr}
      CopyToArr={CopyToArr}
      subject={subject}
      subtitle={subtitle}
      mobileSubtitle={mobileSubtitle}
    />
  );
}
