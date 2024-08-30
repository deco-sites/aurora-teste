import SearchButton, {
    handleSearchClick,
} from "site/islands/Site/search-button.tsx";
import { signal } from "@preact/signals";

export const searchedWord = signal("");

export default function SearchButtonContainer({ option, expandedInput }) {
    //const expandedInput = useSignal(false);

    return (
        <div className="hidden lg:flex flex-grow justify-end gap-12">
            {expandedInput.value && (
                <input
                    type="text"
                    placeholder="Escreva aqui o que você está procurando"
                    id=""
                    name=""
                    className={`${
                        option.id === 4
                            ? "text-pink2 border-pink2 placeholder-pink2"
                            : "text-white border-white placeholder-white"
                    } w-[500px] bg-inherit px-12 rounded-full border outline-none`}
                    value={searchedWord.value}
                    onChange={(e) => {
                        searchedWord.value = e.target.value;
                        //console.log("searchWord", searchedWord.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearchClick(e, expandedInput);
                        }
                    }}
                />
            )}

            {!expandedInput.value && (
                <div
                    className={`flex items-center text-center whitespace-nowrap ${
                        option.id === 3
                            ? "gap-8 justify-end flex-grow"
                            : "gap-14"
                    }`}
                >
                    {option?.menuItems.map((item) => (
                        <a
                            key={item.text}
                            href={item.link}
                            className={`${
                                option.name === "prestador"
                                    ? "text-pink2"
                                    : "text-white"
                            } font-bold text-lg font-sora`}
                            target={item.target}
                        >
                            {item.text}
                        </a>
                    ))}
                </div>
            )}

            <SearchButton option={option} expandedInput={expandedInput} />
        </div>
    );
}
