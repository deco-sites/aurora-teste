import { invoke } from "../../runtime.ts";
import { searchedWord } from "site/islands/Site/search-button-container.tsx";

export const handleSearchClick = async (e, expandedInput) => {
    e.stopPropagation();

    if (expandedInput.value === false) {
        expandedInput.value = true;
    } else {
        //console.log("Faz a pesquisa");
        await invoke.site.actions.search();
        const link = `/pesquisa?query=${searchedWord.value}`;
        globalThis.location.replace(link);
    }
};

export default function SearchButton({ option, expandedInput }) {
    const handleClick = (e) => handleSearchClick(e, expandedInput);

    return (
        <div
            onClick={handleClick}
            className={`flex gap-2 ${
                option.name === "prestador"
                    ? "text-pink2 border-pink2"
                    : "text-white border-white"
            } items-center border rounded-full px-7 py-3 cursor-pointer flex-shrink-0`}
        >
            <img
                src={option.name === "prestador"
                    ? "/Site/search-icon-pink.svg"
                    : "/Site/search-icon.svg"}
                alt=""
                className="w-7 h-7"
            />
            <span>Buscar</span>
        </div>
    );
}
