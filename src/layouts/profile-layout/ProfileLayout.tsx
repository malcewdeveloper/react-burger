import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router";
import styles from "./ProfileLayout.module.css";
import { useAppDispatch } from "../../services/store";
import { logout } from "../../services/thunks/authThunks";

const items = [
    {
        text: "Профиль",
        href: "/profile",
    },
    {
        text: "История заказов",
        href: "/profile/orders",
    },
];

export default function ProfileLayout() {
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

    return (
        <div className={`${styles.container} pt-30`}>
            <aside className={styles.sidebar}>
                <ul className={styles.list}>
                    {items.map(({ text, href }) => {
                        const isActive = location.pathname === href;

                        return (
                            <li key={text}>
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
                                    {text}
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
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </aside>
            <Outlet />
        </div>
    );
}
