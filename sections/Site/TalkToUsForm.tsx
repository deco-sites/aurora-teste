import TalkToUsIsland from "site/islands/Site/talk-to-us-form.tsx";

export interface Props {
    recipientsEmail: string;
    subject: string;
}

export default function TalkToUsForm({ recipientsEmail, subject }: Props) {
    return <TalkToUsIsland recipientsEmail={recipientsEmail} subject={subject} />;
}
