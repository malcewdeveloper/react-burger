import React from "react";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router";
import styles from "./AppHeader.module.css";

type ItemProps = {
    className?: string;
    href: string;
    text: string;
    active: boolean;
    icon: (active: boolean) => React.ReactNode;
};

const items = [
    {
        text: "Конструктор",
        href: "/",
        icon: (active: boolean) => (
            <BurgerIcon type={active ? "primary" : "disabled"} />
        ),
    },
    {
        text: "Лента заказов",
        href: "/feed",
        icon: (active: boolean) => (
            <ListIcon type={active ? "primary" : "disabled"} />
        ),
    },
];

function Item(props: ItemProps) {
    return (
        <Link
            to={props.href}
            className={`${
                !!props.className ? props.className : styles.item
            } pt-4 pb-4 pl-5 pr-5`}
        >
            {props.icon(props.active)}
            <span
                className={`text text_type_main-default${
                    props.active ? "" : " text_color_inactive"
                } ml-2`}
            >
                {props.text}
            </span>
        </Link>
    );
}

function AppHeader() {
    const location = useLocation();

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={`${styles.container}`}>
                <nav className={styles.navigation}>
                    {items.map((item) => (
                        <Item
                            key={item.text}
                            active={
                                item.href === "/"
                                    ? location.pathname === "/" ||
                                      location.pathname.startsWith(
                                          "/ingredients",
                                      )
                                    : location.pathname.startsWith(item.href)
                            }
                            {...item}
                        />
                    ))}
                </nav>
                <Logo />
                <Item
                    text="Личный кабинет"
                    className={styles.profile}
                    href="/profile"
                    active={location.pathname.startsWith("/profile")}
                    icon={(active) => (
                        <ProfileIcon type={active ? "primary" : "disabled"} />
                    )}
                />
            </div>
        </header>
    );
}

export default AppHeader;
