import QuestionBox from "site/components/Site/frequently-asked-questions-option.tsx";

export default function FrequentlyAskedQuestionsIsland({ questions }) {
    return (
        <>
            <div className="flex justify-center bg-gray4 px-10 lg:px-0 border-b border-b-gray9">
                <div className="flex flex-col gap-16 lg:w-[1400px] w-full pt-10 lg:pt-24 pb-16">
                    <span className="font-sora font-bold text-2xl text-pink6 lg:pl-12">
                        Dúvidas Frequentes
                    </span>
                    <div className="flex flex-col gap-5 lg:gap-7">
                        {questions.map((question, index) => (
                            <QuestionBox
                                key={index}
                                question={question}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 py-14 bg-gray4">
                <span className="text-pink1 font-bold text-xl">
                    Ficou com alguma outra dúvida?
                </span>
                <a href="/fale-com-a-gente">
                    <button className="bg-pink6 text-white rounded-[20px] px-5 py-2">
                        Fale com a Aurora
                    </button>
                </a>
            </div>
        </>
    );
}
