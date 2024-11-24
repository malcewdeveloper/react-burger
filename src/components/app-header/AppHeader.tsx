import React from "react";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
        href: "/orders",
        icon: (active: boolean) => (
            <ListIcon type={active ? "primary" : "disabled"} />
        ),
    },
];

function Item(props: ItemProps) {
    return (
        <a
            href={props.href}
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
        </a>
    );
}

function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={`${styles.container}`}>
                <nav className={styles.navigation}>
                    {items.map((item) => (
                        <Item
                            key={item.text}
                            active={item.href === window.location.pathname}
                            {...item}
                        />
                    ))}
                </nav>
                <Logo />
                <Item
                    text="Личный кабинет"
                    className={styles.profile}
                    href="/profile"
                    active={false}
                    icon={(active) => (
                        <ProfileIcon type={active ? "primary" : "disabled"} />
                    )}
                />
            </div>
        </header>
    );
}

export default AppHeader;
