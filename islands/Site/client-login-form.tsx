import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";

export default function ClientLoginFormIsland() {
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
            <div className="flex justify-center px-10 lg:px-0 bg-white">
                <div className="lg:max-w-[1400px] w-full pt-12 pb-16">
                    <div className="flex flex-col lg:px-44 gap-10">
                        <span className="font-sora font-bold text-orange4 text-2xl">
                            Faça login como<br /> beneficiário
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
                                        errors.password
                                            ? "border border-red"
                                            : "bg-gray4"
                                    }`}
                                >
                                    <svg className="w-5 h-5 text-gray-400 ml-6">
                                        <use href="/sprites.svg#LockIcon" />
                                    </svg>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Senha"
                                        className="bg-transparent outline-none text-black text-opacity-25 placeholder-black placeholder-opacity-25 ml-6 w-full rounded-full"
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-red text-sm ml-7">
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between items-center pt-11 gap-8 lg:gap-0">
                                <div className="flex gap-3">
                                    <button className="rounded-full border border-gray8 text-gray8 text-sm px-8 py-3">
                                        Esqueceu sua senha?
                                    </button>
                                    <button className="rounded-full border border-gray8 text-gray8 text-sm px-8 py-3">
                                        Alterar sua senha
                                    </button>
                                </div>
                                <button className="flex justify-center items-center gap-3 px-20 text-sm py-4 bg-orange4 rounded-full text-white">
                                    Entrar
                                    <Image
                                        src={"/Site/arrow-login-icon.svg"}
                                        alt="Icon"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
