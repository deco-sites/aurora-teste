import { AppContext } from "site/apps/site.ts";

export interface Lead {
    nome: string;
    cpf_cnpj: string;
    cidade: number;
    estado: string;
    telefone: string;
    email: string;
    possui_plano: boolean;
    cd_faixa: number;
}

export interface Props {
    leadToSave: Lead;
    activeOption: number;
}

const saveStep2Option1 = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    console.log("Chamou a saveStep2Option1", props.leadToSave);

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

export default saveStep2Option1;
