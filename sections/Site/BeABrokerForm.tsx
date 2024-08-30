import BeABrokerFormIsland from "site/islands/Site/be-a-broker-form.tsx";

export interface Props {
    recipientsEmail: string;
    subject: string;
}

export default function BeABrokerForm({ recipientsEmail, subject }: Props) {
    return <BeABrokerFormIsland recipientsEmail={recipientsEmail} subject={subject} />;
}
