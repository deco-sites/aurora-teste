import QuickAccess from "site/components/Site/quick-access.tsx";
import { AppContext } from "site/apps/site.ts";
import algolia from "https://esm.sh/algoliasearch@4.20.0";
import { createFetchRequester } from "npm:@algolia/requester-fetch@4.20.0";
import type { SectionProps } from "deco/mod.ts";
import SearchResult from "site/components/Site/search-result.tsx";

type Props = Partial<{
    adminApiKey: string;
    applicationId: string;
}>;

export default function SearchPage(props: SectionProps<typeof loader>) {
    return (
        <div className="flex flex-col items-center px-10 lg:px-0">
            <div className="lg:max-w-[1400px] w-full">
                <div className="flex flex-col gap-16 py-16">
                    <QuickAccess />

                    <div className="flex justify-between items-center pb-7 border-b border-b-gray12">
                        <div className="flex gap-4">
                            <span className="text-gray10 text-xl">
                                Resultados da Pesquisa:
                            </span>
                            <span className="text-orange1 text-xl font-bold">
                                {props.searchedWord}
                            </span>
                        </div>
                        <button className="text-orange4 font-bold">
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-gray4 w-full flex justify-center">
                <div className="lg:max-w-[1400px] w-full lg:py-20 flex flex-col gap-6">
                    {props.resultsFound.map((result, index) => (
                        <SearchResult
                            key={index}
                            title={result.title}
                            text={result.text}
                            link={result.path}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
    const query = new URL(req.url).search;
    const params = new URLSearchParams(query);
    const searchedWord = params.get("query");
    let resultsFound = [];

    const { algolia } = ctx;

    {
        /*
    const client = algolia("aplicationId", "adminKey", {
        requester: createFetchRequester(), // Fetch makes it perform mutch better
    });*/
    }

    //const index = client.initIndex("testIndex");

    try {
        const { hits } = await algolia.search(searchedWord);
        //console.log("Hits:", hits);
        resultsFound = hits;
        //return hits;
    } catch (error) {
        console.log(error);
    }

    return {
        ...props,
        ctx,
        searchedWord,
        resultsFound,
    };
};
