import { AppContext } from "site/apps/site.ts";
import saveLeadDependents from "site/actions/saveLeadDependents.ts";
import { invoke } from "../runtime.ts";

export interface DependentLead {
    cd_faixa?: number;
    quantidade?: number;
    cd_tab_preco?: number;
    cd_lead?: number;
}

export interface Props {
    dependentLead?: DependentLead[];
    leadId: number;
}

const UpdateDependents = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    console.log("Dados dentro da updateLead", props.dependentLead);
    console.log("ID pra atualizar", props.leadId);

    //console.log("Chamou a SaveLeadDependent", props.dependentLead);

    //O update na verdade irá remover os registros antigos e insrir novamente os dados atualizados
    const { data, error } = await supabaseClient
        .from("lead_dependente")
        .delete()
        .eq("cd_lead", props.leadId);

    if (error) {
        console.log("Erro de Exclusão", error);
    } else {
        console.log("Dados Excluídos", data);
        saveNewDependents();
    }

    async function saveNewDependents() {
        const { data, error } = await supabaseClient
            .from("lead_dependente")
            .insert(props.dependentLead)
            .select();

        if (error) {
            console.log("Erro de inserção na saveLeadsDependent", error);
        } else {
            console.log("Dados inseridos na saveLeadsDependent", data);
        }
    }

    return {
        data,
        error,
    };
};

export default UpdateDependents;
