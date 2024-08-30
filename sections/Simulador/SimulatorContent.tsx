import ControlFormSteps from "../../islands/Simulador/control-form-steps.tsx";
import Site from "site/apps/site.ts";
import type { App as A, AppContext as AC } from "deco/mod.ts";

export default function Section(props: ReturnType<typeof loader>) {
  const { ageRanges, ufs } = props;

  return (
    <>
      <ControlFormSteps ageRanges={ageRanges} ufs={ufs} />
    </>
  );
}

export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;

export const loader = async (
  props: string,
  req: Request,
  ctx: AppContext,
) => {
  const { supabaseClient } = ctx;

  const ageRanges = await supabaseClient
    .from("faixas_etarias")
    .select("*");

  const ufs = await supabaseClient
    .from("uf")
    .select("*");

  return {
    ageRanges,
    ufs,
  };
};
