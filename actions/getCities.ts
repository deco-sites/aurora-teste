import { AppContext } from "site/apps/site.ts";

export interface Props {
    selectedUF: string;
}

const getCities = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    const { data, error } = await supabaseClient
        .rpc("getcitieswithplans", {
            p_uf: props.selectedUF,
        });
    {
        /*
        .from("cidade")
        .select("descricao")
        .eq("uf", props.selectedUF);*/
    }

    return {
        data,
        error,
    };
};

export default getCities;
