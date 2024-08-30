import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";

export default function ForgotPasswordIsland() {
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
            <div className="flex justify-center px-10 lg:px-0 pt-24 pb-32 bg-white">
                <div className="lg:max-w-[1400px] w-full">
                    <div className="flex flex-col lg:px-44 gap-10">
                        <span className="font-sora font-bold text-orange4 text-2xl">
                            Esqueceu sua senha?
                        </span>
                        <span className="text-black text-sm text-opacity-60">
                            Forneça o código do usuário cadastrado para acessar
                            sua conta. Enviaremos um e-mail que permitirá que
                            você redefina a sua senha.<br /> Cheque sua caixa de
                            {" "}
                            <strong className="text-opacity-80">spam</strong> ou
                            {" "}
                            <strong className="text-opacity-80">
                                lixo automático.
                            </strong>
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
                                    Enviar e-mail
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
