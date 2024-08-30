import Image from "apps/website/components/Image.tsx";

export default function AttentionSection() {
    return (
        <>
            <div className="bg-orange1 flex justify-center items-center p-14 lg:p-0 lg:py-14">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-28">
                    <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
                        <Image
                            src={"/Site/attention-icon.png"}
                            alt={"icon"}
                            className=""
                        />
                        <span className="text-white font-sora font-medium text-4xl uppercase">
                            ATENÇÃO
                        </span>
                    </div>
                    <div className="">
                        <span className="text-white font-sora text-lg lg:text-base">
                            As funcionalidades do APP e Portal só serão
                            liberadas depois que<br />{" "}
                            você preencher o questionário da Jornada de Cuidado!
                            <br />
                            <br />
                            Depois de concluído, é só fazer o login novamente
                            que todos os<br />{" "}
                            nossos serviços estarão liberados para você.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
