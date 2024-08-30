export const cepMask = (cep: string): string => {
    // Remove todos os caracteres não numéricos
    cep = cep.replace(/\D/g, "");

    // Limita o tamanho da string a 8 caracteres (CEP padrão no Brasil)
    if (cep.length > 8) {
        cep = cep.slice(0, 8);
    }

    // Aplica a máscara xx.xxx-xxx
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2");
    cep = cep.replace(/(\d{3})(\d{3})$/, "$1-$2");

    return cep;
};
