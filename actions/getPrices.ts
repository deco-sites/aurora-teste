import { AppContext } from "site/apps/site.ts";

export interface Props {
    plan_code: number;
    ageranges: string[];
}

const getPrices = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;
    //console.log("BATEU AQUI NA GETPRICES", props.ageranges);

    const { data, error } = await supabaseClient
        .rpc("getprices", {
            plan_code: props.plan_code,
            ageranges: props.ageranges,
        });

    return {
        data,
        error,
    };
};

export default getPrices;
