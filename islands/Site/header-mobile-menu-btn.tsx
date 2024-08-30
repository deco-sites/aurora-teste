import { useEffect, useRef, useState } from "preact/hooks";
import DropdownMobileMenu from "site/islands/Site/header-mobile-menu-dropdown.tsx";

export default function HeaderMobileMenuBtn({ option }) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const MobileMenuRef = useRef(null);

    useEffect(() => {
        if (openMobileMenu) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [openMobileMenu]);

    const backgroundBtnColors = {
        1: "bg-orange6",
        2: "bg-purple3",
        3: "bg-pink8",
        4: "bg-yellow3",
    };

    //console.log("Aqui Erick", option);

    return (
        <>
            <div
                ref={MobileMenuRef}
                onClick={() => setOpenMobileMenu(true)}
                className={`flex items-center gap-5 lg:hidden rounded-3xl ${
                    backgroundBtnColors[option.id]
                } text-white px-5 py-2`}
            >
                <span>Menu</span>
                <img
                    src={"/Site/down-arrow.svg"}
                    alt=""
                    className=""
                />
            </div>
            {openMobileMenu && (
                <DropdownMobileMenu
                    option={option}
                    openerRef={MobileMenuRef}
                    setOpen={setOpenMobileMenu}
                />
            )}
        </>
    );
}
