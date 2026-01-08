import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

import BaseIcon from "site/components/ui/Icon.tsx";

function Link({
    children,
    className,
    ...props
}: JSX.HTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            href="/simulador-aurora"
            style={{ zIndex: 999 }}
            className={className ? " " + className : ""}
            {...props}
        >
            {children}
        </a>
    );
}

function Button({
    children,
    className,
    ...props
}: JSX.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className={`
                whitespace-nowrap bg-yellow text-orange1 rounded-full
                ${(className ? " " + className : "")}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

const calculatorIconSize = 24;

function CalculatorIcon({
    className,
    ...props
}: Omit<JSX.SVGAttributes<SVGSVGElement>, "id" | "size">) {
    return (
        <BaseIcon
            id="CalculatorIcon"
            class={"h-auto" + (className ? " " + className : "")}
            size={calculatorIconSize}
            strokeWidth={1}
            {...props}
        />
    );
}

function CollapseIcon({
    className,
    ...props
}: Omit<
    JSX.SVGAttributes<SVGSVGElement>,
    "id" | "size" | "width" | "height" | "stroke"
>) {
    return (
        <BaseIcon
            id="UncoloredArrowRight"
            className={"rotate-180" + (className ? " " + className : "")}
            width={16}
            height={12}
            stroke="#FF8461"
            {...props}
        />
    );
}

function RequestYourQuote_ForMobile() {
    const isExpanded = useSignal(false);

    return (
        <Link className="lg:hidden fixed bottom-3 right-[23px] z-[999]">
            <Button
                className="relative button-border-effect"
                onClick={(event) => {
                    if (!isExpanded.value) {
                        event.stopPropagation();
                        event.preventDefault();
                        isExpanded.value = true;
                    }
                }}
            >
                <div
                    style={{
                        "--inline-padding": "1.5rem",
                        "--icon-size": calculatorIconSize + "px",
                    }}
                    className={`
                        request-your-quote for-mobile
                        overflow-hidden
                        flex items-center gap-2 pl-[var(--inline-padding)]
                        transition-[max-width] duration-300
                        ${isExpanded.value ? " expanded" : ""}
                    `}
                >
                    <CalculatorIcon className="my-4 min-w-[var(--icon-size)]" />

                    <span
                        className={`
                            whitespace-nowrap pointer-events-none
                            transition-opacity duration-300 delay-[-1ms] animate-fadeIn
                            ${isExpanded.value ? " opacity-100 pointer-events-auto" : " opacity-0"}
                        `}
                    >
                        Solicite sua cotação
                    </span>

                    <button
                        type="button"
                        disabled={!isExpanded.value}
                        className={`
                            self-stretch pr-[var(--inline-padding)]
                            transition-opacity duration-300 delay-[-1ms] animate-fadeIn
                            ${isExpanded.value ? " opacity-100" : " opacity-0"}
                        `}
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            isExpanded.value = false;
                        }}
                    >
                        <CollapseIcon />
                    </button>
                </div>
            </Button>
        </Link>
    );
}

function RequestYourQuote_ForDesktop() {
    return (
        <Link className="hidden lg:flex fixed bottom-5 right-10 left-auto flex gap-8">
            <Button className="relative button-border-effect">
                <div
                    style={{
                        "--inline-padding": "1.5rem",
                        "--icon-size": calculatorIconSize + "px",
                    }}
                    className={`
                        request-your-quote group overflow-hidden
                        flex gap-2 py-4 px-[var(--inline-padding)]
                        transition-[max-width] duration-300 delay-150
                    `}
                >
                    <CalculatorIcon className="min-w-[var(--icon-size)]" />

                    <span
                        className={`
                            whitespace-nowrap pointer-events-none opacity-0
                            transition-opacity duration-300 delay-[-1ms]
                            group-hover:pointer-events-auto
                            group-hover:opacity-100
                            group-hover:animate-fadeIn
                            group-hover:delay-150
                        `}
                    >
                        Solicite sua cotação
                    </span>
                </div>
            </Button>
        </Link>
    );
}

export default function RequestYourQuote() {
    return (
        <>
            <RequestYourQuote_ForMobile />
            <RequestYourQuote_ForDesktop />
        </>
    );
}
