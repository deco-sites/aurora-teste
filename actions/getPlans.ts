import { AppContext } from "site/apps/site.ts";

export interface Props {
    age_range: string;
    city_code: number;
    plan_type: number;
}

const getPlans = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { supabaseClient } = ctx;
    //console.log("PROPS da GETPLANS", props.age_range);
    const age_range = "19 a 23 anos";
    const city_code = 310620;
    const plan_type = 3;

    const { data, error } = await supabaseClient
        .rpc("getplans", {
            age_range: props.age_range,
            city_code: props.city_code,
            plan_type: props.plan_type,
        });

    if (error) console.log("Erro:", error);

    return {
        data,
        error,
    };
};

export default getPlans;
