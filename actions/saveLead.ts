import { AppContext } from "site/apps/site.ts";
import { useStepThreeInputValues } from "site/sdk/Simulador/ThirdStep/useStepThreeInputValues.ts";

export interface Lead {
    nome: string;
    razao_social: string;
    cpf_cnpj: string;
    cidade: number;
    estado: string;
    telefone: string;
    email: string;
    cd_plano: number;
    somente_titular: boolean;
    possui_plano: boolean;
    cd_tab_preco: number;
    outra_pessoa: boolean;
}

export interface DependentLead {
    cd_faixa: number;
    quantidade: number;
    cd_tab_preco: number;
    cd_lead?: number;
}

export interface Props {
    leadToSave: Lead;
    dependentLead?: DependentLead[];
    whoUseThePlan: string;
    activeOption: number;
}

const saveLead = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;
    const { thirdStepSignal } = useStepThreeInputValues();

    //console.log("Chamou a action SaveLead", props.leadToSave);
    //console.log("props.dependentLead", props.dependentLead);
    //console.log("props.whoUseThePlan", props.whoUseThePlan);
    //console.log("props.activeOption", props.activeOption);

    const { data, error } = await supabaseClient
        .from("leads")
        .insert(props.leadToSave)
        .select();

    if (error) {
        console.log("Erro da saveLeads", error);
    } else {
        console.log("Data da saveLeads", data);
        const cd_lead = data?.[0].cd_lead;
        //console.log("cd_lead gerado", cd_lead);
        //console.log("Verificando 1", thirdStepSignal.value.whoUseThePlan);
        // Verifica se há dependentes para inserir
        if (
            (((props.activeOption === 1 &&
                props.whoUseThePlan !== "somente_eu") ||
                props.activeOption === 2 || props.activeOption === 3) &&
                props.dependentLead && props.dependentLead?.length > 0)
        ) {
            // Mapeando o array para adicionar a nova propriedade
            const updatedDependentLead = props.dependentLead?.map((
                dependent,
            ) => ({
                ...dependent,
                cd_lead, // Adiciona a propriedade cd_lead
            }));
            //console.log("updatedDependentLead", updatedDependentLead);
            saveLeadDependent(updatedDependentLead);
        }
    }

    async function saveLeadDependent(dependentLead) {
        //console.log("Chamou a SaveLeadDependent", props.dependentLead);

        const { data, error } = await supabaseClient
            .from("lead_dependente")
            .insert(dependentLead)
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
    }

    return {
        data,
        error,
    };
};

export default saveLead;
