import OmbudsmanIsland from "site/islands/Site/ombudsman-form.tsx";

export interface Props {
    recipientsEmail: string;
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
    { recipientsEmail, subject, subtitle, mobileSubtitle }: Props,
) {
    return (
        <OmbudsmanIsland
            recipientsEmail={recipientsEmail}
            subject={subject}
            subtitle={subtitle}
            mobileSubtitle={mobileSubtitle}
        />
    );
}
