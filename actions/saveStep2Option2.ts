import { AppContext } from "site/apps/site.ts";

export interface Lead {
    razao_social: string;
    nome: string;
    //cpf_cnpj: string;
    estado: string;
    cidade: number;
    telefone: string;
    email: string;
}

export interface Props {
    leadToSave: Lead;
    activeOption: number;
}

const saveStep2Option2 = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    console.log("Chamou a saveStep2Option2", props.leadToSave);

    const { data, error } = await supabaseClient
        .from("leads")
        .insert(props.leadToSave)
        .select();

    if (error) {
        console.log("Erro de inserção", error);
    } else {
        console.log("Dados inseridos", data);
    }

    return {
        data,
        error,
    };
};

export default saveStep2Option2;
