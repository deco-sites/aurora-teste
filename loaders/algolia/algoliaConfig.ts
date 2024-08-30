import { Secret } from "apps/website/loaders/secret.ts";
import algolia, { SearchIndex } from "https://esm.sh/algoliasearch@4.20.0";
import { createFetchRequester } from "npm:@algolia/requester-fetch@4.20.0";

export interface Props {
    indexName: string;
    applicationId: Secret;
    adminAPIKey: Secret;
}

export type Algolia = SearchIndex;

/** @title Algolia config setup */
export default function loader(
    { indexName, applicationId, adminAPIKey }: Props,
): Algolia {
    const applicationString = typeof applicationId === "string"
        ? applicationId
        : applicationId.get() as string;

    const adminAPIKeyString = typeof adminAPIKey === "string"
        ? adminAPIKey
        : adminAPIKey.get() as string;

    const client = algolia(applicationString, adminAPIKeyString, {
        requester: createFetchRequester(), // Fetch makes it perform mutch better
    });

    const index = client.initIndex(indexName);

    return index;
}
