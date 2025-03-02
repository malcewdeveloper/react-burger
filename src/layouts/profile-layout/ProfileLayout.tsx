import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch } from "../../services/store";
import { logout } from "../../services/thunks/authThunks";
import { connect, disconnect } from "../../services/slices/authSlice";
import styles from "./ProfileLayout.module.css";

type Props = {
    hasMenu?: boolean;
};

const items = [
    {
        title: "Профиль",
        href: "/profile",
        text: "В этом разделе вы можете изменить свои персональные данные",
    },
    {
        title: "История заказов",
        href: "/profile/orders",
        text: "В этом разделе вы можете просмотреть свою историю заказов",
    },
];

export default function ProfileLayout({ hasMenu = true }: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout()).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                navigate("/login", { replace: true });
            }
        });
    };

    React.useEffect(() => {
        dispatch(connect("wss://norma.nomoreparties.space/orders"));

        return () => {
            dispatch(disconnect());
        };
    }, []);

    return (
        <div className={styles.container}>
            {hasMenu && (
                <aside className={`${styles.sidebar} pt-30`}>
                    <ul className={styles.list}>
                        {items.map(({ title, href }) => {
                            const isActive = location.pathname === href;

                            return (
                                <li key={title}>
                                    <Button
                                        type="secondary"
                                        size="large"
                                        htmlType="button"
                                        extraClass={`${
                                            styles.button
                                        } text text_type_main-medium ${
                                            isActive
                                                ? styles.active
                                                : "text_color_inactive"
                                        }`}
                                        onClick={() =>
                                            navigate(href, { replace: false })
                                        }
                                    >
                                        {title}
                                    </Button>
                                </li>
                            );
                        })}
                        <li>
                            <Button
                                type="secondary"
                                size="large"
                                htmlType="button"
                                onClick={handleLogout}
                                extraClass={`${styles.button} text text_type_main-medium text_color_inactive`}
                            >
                                Выход
                            </Button>
                        </li>
                    </ul>
                    <p
                        className="text text_type_main-default text_color_inactive mt-20"
                        style={{ opacity: 0.4 }}
                    >
                        {
                            items.find(
                                (item) =>
                                    item.href === location.pathname ||
                                    item.href === "/orders",
                            )?.text
                        }
                    </p>
                </aside>
            )}
            <Outlet />
        </div>
    );
}
