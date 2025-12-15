import { AppContext } from "site/apps/site.ts";

export interface Props {
  plan_code: number;
  ageranges: string[];
  plan_type: number;
}

const getPrices = async (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { supabaseClient } = ctx;
  //console.log("BATEU AQUI NA GETPRICES 1:", props.plan_type);
  //console.log("BATEU AQUI NA GETPRICES 2:", props.plan_code);
  //console.log("BATEU AQUI NA GETPRICES 3:", props.ageranges);

  const { data, error } = await supabaseClient
    .rpc("getprices", {
      plan_code: props.plan_code,
      ageranges: props.ageranges,
      plan_type: props.plan_type,
    });

  return {
    data,
    error,
  };
};

export default getPrices;
