import { AppContext } from "site/apps/site.ts";
import { Lead } from "../commons/types/lead.ts";

export interface Props {
  dataToUpdate: Partial<Omit<Lead, "cd_lead" | "data_lead" | "cd_modalidade">>;
  leadId: number;
}

const UpdateLead = async (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { supabaseClient } = ctx;

  //console.log("Dados dentro da updateLead", props.dataToUpdate);
  //console.log("ID pra atualizar", props.leadId);

  //console.log("Chamou a SaveLeadDependent", props.dependentLead);

  const { data, error } = await supabaseClient
    .from("leads")
    .update(props.dataToUpdate)
    .eq("cd_lead", props.leadId ?? props.dataToUpdate?.cd_lead)
    .select();

  if (error) {
    //console.log("Erro de Update", error);
  } else {
    //console.log("Dados atualizados", data);
  }

  return {
    data,
    error,
  };
};

export default UpdateLead;
