export const nameMask = (name: string): string => {
    // Remove números e caracteres especiais, exceto acentos e espaços
    name = name.replace(/[^a-zA-Zà-úÀ-Ú\s]/g, "");

    // Coloca em lowercase e depois capitaliza a primeira letra de cada palavra
    name = name.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });

    return name;
};
