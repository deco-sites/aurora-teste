import { AppContext } from "site/apps/site.ts";

export interface Props {
    selectedAgeRange: string;
}
//select cd_cidade from cidade where descricao = 'BELO HORIZONTE' -- ou outra uf

const getAgeRangeCode = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;

    const { data, error } = await supabaseClient
        .from("faixas_etarias")
        .select("cd_faixa")
        .eq("faixa", props.selectedAgeRange);

    return {
        data,
        error,
    };
};

export default getAgeRangeCode;
