import { observe } from "deco/observability/observe.ts";
import { useEffect } from "preact/hooks";

export interface Props {
    rootId: string;
    scroll?: "smooth" | "auto";
    interval?: number;
    infinite?: boolean;
    alwaysGo?: boolean;
}

const ATTRIBUTES = {
    "data-slider": "data-slider",
    "data-slider-item": "data-slider-item",
    'data-slide="prev"': 'data-slide="prev"',
    'data-slide="next"': 'data-slide="next"',
    "data-dot": "data-dot",
    "data-link": "data-link",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
    const delta = container.width / 1_000;

    if (element.right < container.left - delta) {
        return 0.0;
    }

    if (element.left > container.right + delta) {
        return 0.0;
    }

    if (element.left < container.left - delta) {
        return element.right - container.left + delta;
    }

    if (element.right > container.right + delta) {
        return container.right - element.left + delta;
    }

    return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
    // deno-lint-ignore no-explicit-any
    typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, scroll, interval, infinite, alwaysGo }: Props) => {
    const root = document.getElementById(rootId);
    const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
    let items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
    const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
    const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
    const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);
    const links = root?.querySelectorAll(`[${ATTRIBUTES["data-link"]}]`);

    if (!root || !slider || !items || items.length === 0) {
        console.warn(
            "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
            { root, slider, items, rootId },
        );

        return;
    }

    if (items?.length && items.length < 2 && alwaysGo) {
        console.warn(
            "To use alwaysGo prop, at least 2 items are required for correct operation. Items provided:",
            { items },
        );

        return;
    }

    const observer = new IntersectionObserver(
        (elements) =>
            elements.forEach((item) => {
                const index =
                    Number(item.target.getAttribute("data-slider-item")) || 0;

                let dotIndex = index;

                if (items && index >= items?.length - 2) {
                    dotIndex = index - (items.length - 2);
                } else if (dots && index === -1) {
                    dotIndex = dots?.length - 1;
                }

                const dot = alwaysGo ? dots?.item(dotIndex) : dots?.item(index);
                const link = alwaysGo
                    ? links?.item(dotIndex)
                    : links?.item(index);

                if (item.isIntersecting) {
                    dot?.setAttribute("disabled", "");
                    link?.removeAttribute("disabled");
                } else {
                    dot?.removeAttribute("disabled");
                    link?.setAttribute("disabled", "");
                }

                if (!infinite) {
                    if (index === 0) {
                        if (item.isIntersecting) {
                            prev?.setAttribute("disabled", "");
                        } else {
                            prev?.removeAttribute("disabled");
                        }
                    }
                    if (items && index === items.length - 1) {
                        if (item.isIntersecting) {
                            next?.setAttribute("disabled", "");
                        } else {
                            next?.removeAttribute("disabled");
                        }
                    }
                }
            }),
        { threshold: THRESHOLD, root: slider },
    );

    // If items length be <= 2, it is necessary to clone first and second elements for it to work
    if (alwaysGo && items?.length) {
        switch (items.length) {
            case 2: {
                const first_item = items[0];
                const second_item = items[1];
                const clone_item = first_item.cloneNode(true) as HTMLElement;
                const second_clone_item = second_item.cloneNode(
                    true,
                ) as HTMLElement;

                slider?.appendChild(clone_item);
                slider?.appendChild(second_clone_item);

                // so we need to get items again before clone infos
                // is needed at least 4 items to alwaysGo works
                items = undefined;
                items = root?.querySelectorAll(
                    `[${ATTRIBUTES["data-slider-item"]}]`,
                );
                break;
            }
            case 3: {
                const first_item = items[0];
                const clone_item = first_item.cloneNode(true) as HTMLElement;

                slider?.appendChild(clone_item);

                // so we need to get items again before clone infos
                // is needed at least 4 items to alwaysGo works
                items = undefined;
                items = root?.querySelectorAll(
                    `[${ATTRIBUTES["data-slider-item"]}]`,
                );
                break;
            }
        }
    }

    const cloneAndRemoveItems = (
        onClickNext: boolean,
        itemsPerPage: number = 1,
    ) => {
        if (!items || items.length === 0) return;

        if (onClickNext) {
            for (let i = 0; i < itemsPerPage; i++) {
                const firstItem = items[i];
                const clonedItem = firstItem.cloneNode(true) as HTMLElement;
                slider.appendChild(clonedItem);
                firstItem.remove();
            }
        } else {
            for (let i = 0; i < itemsPerPage; i++) {
                const lastItem = items[items.length - 1 - i];
                const clonedItem = lastItem.cloneNode(true) as HTMLElement;
                slider.insertBefore(clonedItem, items[0]);
                lastItem.remove();
            }
        }

        // Update items NodeList after modification
        items = root.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
        reconfigureObserver();

        return;
    };

    const getElementsInsideContainer = () => {
        if (!items || items.length === 0) return;

        const indices: number[] = [];
        const sliderRect = slider.getBoundingClientRect();

        for (let index = 0; index < items.length; index++) {
            // const item = items.item(index);
            const item = items[index];
            const rect = item.getBoundingClientRect();

            const ratio = intersectionX(rect, sliderRect) / rect.width;

            if (ratio > THRESHOLD) {
                indices.push(index);
            }
        }

        return indices;
    };

    const goToItem = (index: number) => {
        if (!items || items.length === 0) return;
        const item = items.item(index);

        if (!isHTMLElement(item)) {
            console.warn(
                `Element at index ${index} is not an html element. Skipping carousel`,
            );

            return;
        }

        slider.scrollTo({
            top: 0,
            behavior: scroll,
            left: item.offsetLeft - root.offsetLeft,
        });
    };

    const onClickPrev = async () => {
        if (!items || items.length === 0) return;

        const indices = getElementsInsideContainer();
        if (!indices || indices.length === 0) return;
        // Wow! items per page is how many elements are being displayed inside the container!!
        const itemsPerPage = indices.length;
        const isShowingFirst = indices[0] === 0;
        const pageIndex = Math.floor(
            indices[indices.length - 1] / itemsPerPage,
        );

        if (isShowingFirst && alwaysGo) {
            await cloneAndRemoveItems(false, itemsPerPage);

            goToItem(0);

            return;
        }

        goToItem(
            isShowingFirst ? items.length - 1 : (pageIndex - 1) * itemsPerPage,
        );
    };

    const onClickNext = async () => {
        if (!items || items.length === 0) return;

        const indices = getElementsInsideContainer();

        if (!indices || indices.length === 0) return;
        // Wow! items per page is how many elements are being displayed inside the container!!
        const itemsPerPage = indices.length;
        const isShowingLast = indices[indices.length - 1] === items.length - 1;

        const pageIndex = Math.floor(indices[0] / itemsPerPage);

        if (alwaysGo && isShowingLast) {
            await cloneAndRemoveItems(true, itemsPerPage);

            goToItem(pageIndex * itemsPerPage);
            return;
        }

        goToItem(isShowingLast ? 0 : (pageIndex + 1) * itemsPerPage);
    };

    const reconfigureObserver = () => {
        if (!items || items.length === 0) return;

        observer.disconnect();
        items.forEach((item) => observer.observe(item));
    };

    items.forEach((item) => observer.observe(item));

    for (let it = 0; it < (dots?.length ?? 0); it++) {
        // dots?.item(it).addEventListener("click", () => goToItem(it));

        dots?.item(it).addEventListener("click", () => {
            if (items && alwaysGo) {
                const idx = it < items?.length ? it : it - items?.length;
                goToItem(idx + 1);
            } else {
                goToItem(it);
            }
        });
    }

    prev?.addEventListener("click", onClickPrev);
    next?.addEventListener("click", onClickNext);

    const timeout = interval && setInterval(onClickNext, interval);

    // Unregister callbacks
    return () => {
        if (!items || items.length === 0) return;

        items.forEach((item) => observer.unobserve(item));

        for (let it = 0; it < (dots?.length ?? 0); it++) {
            dots?.item(it).removeEventListener("click", () => goToItem(it));
        }

        prev?.removeEventListener("click", onClickPrev);
        next?.removeEventListener("click", onClickNext);

        observer.disconnect();

        clearInterval(timeout);
    };
};

function Slider({
    rootId,
    scroll = "smooth",
    interval,
    infinite = false,
    alwaysGo = false,
}: Props) {
    useEffect(
        () => setup({ rootId, scroll, interval, infinite, alwaysGo }),
        [rootId, scroll, interval, infinite, alwaysGo],
    );

    return <div data-slider-controller-js />;
}

export default Slider;
