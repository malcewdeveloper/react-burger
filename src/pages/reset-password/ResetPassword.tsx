import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../services/store";
import { resetPassword } from "../../services/thunks/authThunks";
import { getFormData } from "../../utils";
import { RequestResetData } from "../../api/auth/types";

export default function ResetPassword() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const data = getFormData<RequestResetData>(formData);

        dispatch(resetPassword(data)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                navigate("/login", { replace: true });
            }
        });
    };

    if (!location.state?.isForgotPage)
        return <Navigate to="/forgot-password" replace />;

    return (
        <>
            <Form
                title="Восстановление пароля"
                onSubmit={handleSubmit}
                extraClass="mb-20"
                btnText="Сохранить"
            >
                <Input
                    type="password"
                    name="password"
                    placeholder="Введите новый пароль"
                    extraClass="mb-6"
                />
                <Input
                    type="text"
                    name="token"
                    placeholder="Введите код из письма"
                    extraClass="mb-6"
                />
            </Form>
            <div>
                <span className="text text_type_main-default text_color_inactive mr-2">
                    Вспомнили пароль?
                </span>
                <Link
                    to="/login"
                    className="link text text_type_main-default text_color_inactive"
                >
                    Войти
                </Link>
            </div>
        </>
    );
}
