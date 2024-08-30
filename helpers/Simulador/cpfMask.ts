export const cpfMask = (cpf: string): string => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);
    }

    cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf;
};
