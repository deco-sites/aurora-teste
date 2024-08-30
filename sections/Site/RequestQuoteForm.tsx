import RequestQuoteIsland from "site/islands/Site/request-quote-form.tsx";

export interface Props {
    recipientsEmail: string;
    subject: string;
}

export default function RequestQuoteForm({ recipientsEmail, subject }: Props) {
    return <RequestQuoteIsland recipientsEmail={recipientsEmail} subject={subject} />;
}
