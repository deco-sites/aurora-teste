import { AppContext } from "site/apps/site.ts";

export interface DependentLead {
    cd_faixa: number;
    quantidade: number;
    cd_tab_preco?: number;
    cd_lead?: number;
}

export interface Props {
    dependentLead?: DependentLead[];
}

const saveLeadDependents = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    //console.log("Chamou a SaveLeadDependent", props.dependentLead);

    const { data, error } = await supabaseClient
        .from("lead_dependente")
        .insert(props.dependentLead)
        .select();

    if (error) {
        console.log("Erro de inserção na saveLeadsDependent", error);
    } else {
        console.log("Dados inseridos na saveLeadsDependent", data);
    }

    return {
        data,
        error,
    };
};

export default saveLeadDependents;
