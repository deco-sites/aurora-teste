import Icon from "site/components/ui/Icon.tsx";

export default function QuickAccessIcon(
    { text, icon, link }: { text: string; icon: string; link: string },
) {
    return (
        <a href={link}>
            <button className="flex items-center justify-center gap-4 bg-white bg-opacity-40 rounded-full px-7 py-6 text-white">
                <Icon
                    class="h-auto"
                    id={icon}
                    strokeWidth={1}
                    size={25}
                />
                <span>{text}</span>
            </button>
        </a>
    );
}
