import Image from "apps/website/components/Image.tsx";
import { MutableRefObject } from "https://esm.sh/v128/preact@10.19.6/compat/src/index.js";
import { useClickOutsideListener } from "site/helpers/Site/useClickOutsideListener.ts";
import { useRef } from "preact/hooks";

interface DropdownSectionsProps {
    option: number;
    openerRef: MutableRefObject<HTMLElement | null>;
    setOpen: (state: boolean) => void;
}

export default function DropdownSections({
    option,
    openerRef,
    setOpen,
}: DropdownSectionsProps) {
    const dropdownRef = useRef(null);
    useClickOutsideListener(dropdownRef, openerRef, setOpen);

    const handleClickInside = (event: MouseEvent) => {
        event.stopPropagation();
    };

    const backgroundColors = {
        1: "bg-orange1",
        2: "bg-darkPurple",
        3: "bg-pink2",
        4: "bg-yellow",
    };

    return (
        <div
            ref={dropdownRef}
            onClick={handleClickInside}
            className={`flex flex-col gap-1 justify-center items-center absolute -bottom-44 left-0 w-full ${
                backgroundColors[option.id]
            } rounded-[20px]`}
        >
            <a
                href="/"
                target="_self"
                className="w-full"
            >
                <button className="flex gap-5 items-center justify-center text-white bg-orange6 rounded-full px-4 py-2 w-full">
                    Sou Cliente
                    <Image
                        src={"/Site/down-arrow.svg"}
                        alt=""
                        className="rotate-180"
                    />
                </button>
            </a>
            <a
                href="https://6167prd-plano.cloudmv.com.br/mvsaudeweb/#/login/empresa"
                target="_blank"
                className="w-full"
            >
                <button className="flex gap-5 items-center justify-center text-white bg-darkPurple rounded-full px-4 py-2 w-full">
                    Sou Empresa
                </button>
            </a>
            <a
                href="/corretor"
                target="_self"
                className="w-full"
            >
                <button className="flex gap-5 items-center justify-center text-white bg-pink2 rounded-full px-4 py-2 w-full">
                    Sou Corretor
                </button>
            </a>
            <a
                href="https://6167prd-plano.cloudmv.com.br/mvautorizadorguias/"
                target="_blank"
                className="w-full"
            >
                <button className="flex gap-5 items-center justify-center text-white bg-yellow rounded-full px-4 py-2 w-full">
                    Sou Prestador
                </button>
            </a>
        </div>
    );
}
