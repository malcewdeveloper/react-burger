import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { Link, useLocation, useNavigate } from "react-router";
import { getFormData } from "../../utils";
import { RequestLoginData } from "../../api/auth/types";
import { login } from "../../services/thunks/authThunks";
import { useAppDispatch } from "../../services/store";

export default function Login() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const data = getFormData<RequestLoginData>(formData);

        dispatch(login(data)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                const searchParams = new URLSearchParams(location.search);
                const redirectTo = searchParams.get("redirectTo");

                navigate(redirectTo ? redirectTo : "/", { replace: true });
            }
        });
    };

    return (
        <>
            <Form
                title="Вход"
                onSubmit={handleSubmit}
                extraClass="mb-20"
                btnText="Войти"
            >
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    extraClass="mb-6"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    extraClass="mb-6"
                />
            </Form>
            <div className="mb-4">
                <span className="text text_type_main-default text_color_inactive mr-2">
                    Вы — новый пользователь?
                </span>
                <Link
                    to="/register"
                    className="link text text_type_main-default text_color_inactive"
                >
                    Зарегистрироваться
                </Link>
            </div>
            <div>
                <span className="text text_type_main-default text_color_inactive mr-2">
                    Забыли пароль?
                </span>
                <Link
                    to="/forgot-password"
                    className="link text text_type_main-default text_color_inactive"
                >
                    Восстановить пароль
                </Link>
            </div>
        </>
    );
}
