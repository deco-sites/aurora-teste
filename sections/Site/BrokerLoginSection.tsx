export default function BrokerLoginSection() {
    return (
        <>
            <div className="flex justify-center bg-aquagreen px-10 lg:px-0">
                <div className="flex flex-col lg:flex-row gap-16 lg:w-[1400px] w-full pt-32 pb-36">
                    <div className="flex flex-col items-center gap-16 lg:flex-row bg-yellow rounded-[20px] lg:pl-20 lg:pr-12 py-16">
                        <div className="flex flex-col px-10 lg:px-0 text-pink6 gap-4 lg:gap-5">
                            <span className="font-sora font-bold text-2xl">
                                Minhas Vendas
                            </span>
                            <span>
                                Aqui você preenche, envia e gerencia suas
                                propostas com segurança e agilidade. Aproveite
                                para conhecer as campanhas de vendas vigentes,
                                consultar comissões e participar das premiações.
                            </span>
                        </div>
                        <div className="flex justify-center items-center">
                            <a
                                href="https://souaurorasaude.planium.io/web/login/?target=venda"
                                target="_blank"
                            >
                                <button className="bg-pink6 w-fit text-white rounded-full py-3 px-16">
                                    Entrar
                                </button>
                            </a>
                        </div>
                        {
                            /*
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col items-center lg:flex-row gap-6">
                                <input
                                    className="bg-white rounded-full py-3 px-11 placeholder-black placeholder-opacity-40 lg:placeholder-opacity-25 outline-none"
                                    type="text"
                                    placeholder={"Usuário"}
                                />
                                <input
                                    className="bg-white rounded-full py-3 px-11 placeholder-black placeholder-opacity-40 lg:placeholder-opacity-25 outline-none"
                                    type="text"
                                    placeholder={"Senha"}
                                />
                                <button className="bg-pink6 w-fit text-white rounded-full py-3 px-20">
                                    Entrar
                                </button>
                            </div>
                            <div className="flex justify-center lg:justify-end gap-5 text-black text-xs lg:text-sm text-opacity-40 lg:text-opacity-25">
                                <a href="#">
                                    <span className="underline underline-offset-4">
                                        Cadastrar-se
                                    </span>
                                </a>
                                <a href="#">
                                    <span className="underline underline-offset-4">
                                        Esqueci minha senha
                                    </span>
                                </a>
                            </div>
                        </div>
                        */
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
