import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";

export default function ChangePasswordIsland() {
    const [errors, setErrors] = useState({ login: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = e.target.login.value;
        const password = e.target.password.value;

        let valid = true;
        let newErrors = { login: "", password: "" };

        if (!login) {
            valid = false;
            newErrors.login = "Informe um login válido.";
        }

        if (!password) {
            valid = false;
            newErrors.password = "Informe uma senha válida.";
        }

        setErrors(newErrors);

        if (valid) {
            // Submeta o formulário ou execute outras ações
            //console.log("Formulário enviado com sucesso!");
        }
    };

    return (
        <>
            <div className="flex justify-center px-10 lg:px-0 pt-14 lg:pt-24 pb-24 lg:pb-32 bg-white">
                <div className="lg:max-w-[1400px] w-full">
                    <div className="flex flex-col lg:px-44 gap-10">
                        <span className="font-sora font-bold text-orange4 text-2xl">
                            Altere sua senha
                        </span>

                        <form
                            className="flex flex-col"
                            method="POST"
                            action="#"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-5 pb-10 border-b border-b-gray12">
                                <div
                                    className={`flex items-center rounded-full px-2 py-3 w-full ${
                                        errors.login
                                            ? "border border-red"
                                            : "bg-gray4"
                                    }`}
                                >
                                    <svg className="w-5 h-5 text-gray-400 ml-6">
                                        <use href="/sprites.svg#UserLoginIcon" />
                                    </svg>
                                    <input
                                        id="login"
                                        name="login"
                                        type="text"
                                        placeholder="Login"
                                        className="bg-transparent outline-none text-black text-opacity-25 placeholder-black placeholder-opacity-25 ml-6 w-full rounded-full"
                                    />
                                </div>
                                {errors.login && (
                                    <span className="text-red text-sm ml-7">
                                        {errors.login}
                                    </span>
                                )}
                                <div
                                    className={`flex items-center rounded-full px-2 py-3 w-full ${
                                        errors.login
                                            ? "border border-red"
                                            : "bg-gray4"
                                    }`}
                                >
                                    <svg className="w-5 h-5 text-gray-400 ml-6">
                                        <use href="/sprites.svg#UserLoginIcon" />
                                    </svg>
                                    <input
                                        id="currentpassword"
                                        name="currentpassword"
                                        type="text"
                                        placeholder="Senha atual"
                                        className="bg-transparent outline-none text-black text-opacity-25 placeholder-black placeholder-opacity-25 ml-6 w-full rounded-full"
                                    />
                                </div>
                                <span className="text-black text-sm text-opacity-60">
                                    A senha deve possuir no mínimo{" "}
                                    <strong className="text-opacity-80">
                                        oito{" "}
                                    </strong>
                                    caracteres. Sendo obrigatório que um dos
                                    caracteres não seja uma letra.<br />
                                    <strong className="text-opacity-80">
                                        Esqueceu sua senha?
                                    </strong>
                                </span>
                                <div
                                    className={`flex items-center rounded-full px-2 py-3 w-full ${
                                        errors.login
                                            ? "border border-red"
                                            : "bg-gray4"
                                    }`}
                                >
                                    <svg className="w-6 h-6 text-gray-400 ml-6">
                                        <use href="/sprites.svg#CheckInputIcon" />
                                    </svg>
                                    <input
                                        id="newpassword"
                                        name="newpassword"
                                        type="text"
                                        placeholder="Nova senha"
                                        className="bg-transparent outline-none text-black text-opacity-25 placeholder-black placeholder-opacity-25 ml-6 w-full rounded-full"
                                    />
                                </div>
                                <div
                                    className={`flex items-center rounded-full px-2 py-3 w-full ${
                                        errors.login
                                            ? "border border-red"
                                            : "bg-gray4"
                                    }`}
                                >
                                    <svg className="w-6 h-6 text-gray-400 ml-6">
                                        <use href="/sprites.svg#CheckInputIcon" />
                                    </svg>
                                    <input
                                        id="confirmnewpassword"
                                        name="confirmnewpassword"
                                        type="text"
                                        placeholder="Confirmação de senha"
                                        className="bg-transparent outline-none text-black text-opacity-25 placeholder-black placeholder-opacity-25 ml-6 w-full rounded-full"
                                    />
                                </div>
                                <div
                                    className={`flex items-center rounded-full px-2 py-3 w-full ${
                                        errors.login
                                            ? "border border-red"
                                            : "bg-gray4"
                                    }`}
                                >
                                    <svg className="w-8 h-6 text-gray-400 ml-6">
                                        <use href="/sprites.svg#VerifiedIcon" />
                                    </svg>
                                    <input
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        placeholder="CPF"
                                        className="bg-transparent outline-none text-black text-opacity-25 placeholder-black placeholder-opacity-25 ml-6 w-full rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center pt-11 gap-[10px]">
                                <button className="flex gap-4 justify-center items-center rounded-full bg-gray4 text-gray13 text-sm px-10 py-4">
                                    Voltar
                                    <Image
                                        src={"/Site/back-icon.svg"}
                                        alt="Icon"
                                    />
                                </button>
                                <button className="flex justify-center items-center gap-3 whitespace-nowrap px-10 lg:px-20 text-sm py-4 bg-orange4 rounded-full text-white">
                                    Mudar senha
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
