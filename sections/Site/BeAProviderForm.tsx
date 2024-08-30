import BeAProviderFormIsland from "site/islands/Site/be-a-provider.tsx";

export interface Props {
    recipientsEmail: string;
    subject: string;
}

export default function BeAProviderForm({ recipientsEmail, subject }: Props) {
    return <BeAProviderFormIsland recipientsEmail={recipientsEmail} subject={subject} />;
}
