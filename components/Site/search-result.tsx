export default function SearchResult(
    { title, text, link }: { text: string; link: string },
) {
    return (
        <div className="flex flex-col bg-white rounded-[20px] px-10 py-8 max-h-96 gap-8">
            <span className="text-gray10 text-lg font-semibold">{title}</span>
            <span className="truncate text-gray10">{text}</span>
            <a href={link}>
                <button className="rounded-full px-8 py-4 border border-pink1 text-pink1">
                    Acessar
                </button>
            </a>
        </div>
    );
}
