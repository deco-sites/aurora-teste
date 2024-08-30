import WorkWithUsIsland from "site/islands/Site/work-with-us-form.tsx";

export interface Props {
    recipientsEmail: string;
    subject: string;
}

export default function WorkWithUs({ recipientsEmail, subject }: Props) {
    return (
        <WorkWithUsIsland recipientsEmail={recipientsEmail} subject={subject} />
    );
}
