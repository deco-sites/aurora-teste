import Image from "apps/website/components/Image.tsx";

export interface ICardProps {
    icon: string;
    text: string;
    link: string;
    target: string;
}

export default function ServiceCard({ icon, text, link, target }: ICardProps) {
    return (
        <div className="flex flex-col gap-5">
            <a href={link} target={target}>
                <div className="flex justify-center items-center bg-gradient-to-br from-pink1 to-orange4 rounded-3xl w-44 h-44">
                    <Image
                        src={icon}
                        alt="Icon"
                        className=""
                    />
                </div>
            </a>

            <a href={link} target={target}>
                <div className="flex justify-center items-center text-center bg-gray4 rounded-3xl w-44 h-24">
                    <span
                        className="text-lg text-black opacity-60"
                        dangerouslySetInnerHTML={{ __html: text }}
                    >
                    </span>
                </div>
            </a>
        </div>
    );
}
