import { App, AppContext as AC } from "deco/mod.ts";
import website, { Props } from "apps/website/mod.ts";
import type { Supabase } from "../loaders/supabase/supabaseConfig.ts";
import type { Algolia } from "site/loaders/algolia/algoliaConfig.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { Sendgrid } from "site/loaders/sendgrid/sendgridConfig.ts";

type WebsiteApp = ReturnType<typeof website>;

export interface SiteProps extends Props {
  algolia: Algolia;
  supabaseClient: Supabase;
  sendgrid: Sendgrid;
}

/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(
  { supabaseClient, algolia, sendgrid, ...state }: SiteProps,
): App<Manifest, SiteProps, [
  WebsiteApp,
]> {
  return {
    state: {
      supabaseClient,
      algolia,
      sendgrid,
      ...state,
    },
    manifest,
    dependencies: [
      website(state),
    ],
  };
}

export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
