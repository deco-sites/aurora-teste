import FrequentlyAskedQuestionsIsland from "site/islands/Site/frequently-asked-questions.tsx";

/** @titleBy questionTitle */
export interface Question {
    questionTitle: string;
    questionText: string;
}

export interface Props {
    questions: Question[];
}

export default function FrequentlyAskedQuestions({ questions }: Props) {
    return <FrequentlyAskedQuestionsIsland questions={questions} />;
}
