export default function ColorfullBanner() {
    return (
        <>
            <div className="flex justify-center px-10 lg:px-0 bg-white">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16 lg:py-32">
                    <div className="flex flex-col lg:flex-row gap-6 justify-between bg-purple rounded-[20px] px-12 lg:px-40 py-14">
                        <span className="font-sora text-2xl font-semibold text-yellow">
                            Imagine oferecer um plano<br />{" "}
                            que acompanha, de verdade,<br />{" "}
                            a saúde dos beneficiários.
                        </span>
                        <span className="text-white">
                            E, a partir de um histórico de demandas, avisa e
                            aconselha novas<br />{" "}
                            consultas e exames, acolhe as necessidades
                            particulares de cada um e<br />{" "}
                            oferece a melhor solução, com um atendimento
                            humanizado, responsável,<br />{" "}
                            acessível e individualizado.{" "}
                            <strong>
                                Imaginou? Agora, a gente cuida!
                            </strong>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
