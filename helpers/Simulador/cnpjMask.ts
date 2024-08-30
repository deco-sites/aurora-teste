export const cnpjMask = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, "");

  cnpj = cnpj.substring(0, 14);

  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
  cnpj = cnpj.replace(
    /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
    "$1.$2.$3/$4-$5",
  );

  return cnpj;
};
