import { AppContext } from "site/apps/site.ts";
import { invoke } from "../runtime.ts";

export interface DependentLead {
    cd_lead_dep: number;
    cd_tab_preco: number;
}

export interface Props {
    dependentsToUpdate: DependentLead[];
}

const RealUpdateDependents = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    // Itera sobre cada dependente no array dependentsToUpdate
    for (const dependent of props.dependentsToUpdate) {
        // Atualiza a tabela lead_dependente para o cd_lead_dep correspondente
        const { data, error } = await supabaseClient
            .from("lead_dependente")
            .update({ cd_tab_preco: dependent.cd_tab_preco })
            .eq("cd_lead_dep", dependent.cd_lead_dep)
            .select();

        if (error) {
            console.log("Erro no Update", error);
            return { error }; // Saída antecipada se houver erro
        } else {
            console.log("Dados Atualizados", data);
        }
    }

    return {
        message: "Todos os dependentes foram atualizados com sucesso",
    };
};

export default RealUpdateDependents;
