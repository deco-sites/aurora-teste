import { AppContext } from "site/apps/site.ts";

export interface PossibleData {
    somente_titular?: boolean;
    outra_pessoa?: boolean;
    nome?: string;
    razao_social?: string;
    cpf_cnpj?: string;
    cidade?: number;
    estado?: string;
    telefone?: string;
    email?: string;
    cd_plano?: number;
    possui_plano?: boolean;
    cd_tab_preco?: number;
}

export interface Props {
    dataToUpdate: PossibleData;
    leadId: number;
}

const UpdateLead = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    console.log("Dados dentro da updateLead", props.dataToUpdate);
    console.log("ID pra atualizar", props.leadId);

    //console.log("Chamou a SaveLeadDependent", props.dependentLead);

    const { data, error } = await supabaseClient
        .from("leads")
        .update(props.dataToUpdate)
        .eq("cd_lead", props.leadId)
        .select();

    if (error) {
        console.log("Erro de Update", error);
    } else {
        console.log("Dados atualizados", data);
    }

    return {
        data,
        error,
    };
};

export default UpdateLead;
