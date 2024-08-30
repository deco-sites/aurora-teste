import { AppContext } from "site/apps/site.ts";

export interface Props {
    selectedCity: string;
}
//select cd_cidade from cidade where descricao = 'BELO HORIZONTE' -- ou outra uf

const getCityCode = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    const { data, error } = await supabaseClient
        .from("cidade")
        .select("cd_cidade")
        .eq("descricao", props.selectedCity);

    return {
        data,
        error,
    };
};

export default getCityCode;
