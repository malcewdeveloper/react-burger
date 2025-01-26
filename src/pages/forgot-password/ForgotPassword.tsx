import React from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../services/store";
import { RequestForgotData } from "../../api/auth/types";
import { forgotPassword } from "../../services/thunks/authThunks";
import { getFormData } from "../../utils";

export default function ForgotPassword() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const data = getFormData<RequestForgotData>(formData);

        dispatch(forgotPassword(data)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                navigate("/reset-password", { state: { isForgotPage: true } });
            }
        });
    };

    return (
        <>
            <Form
                title="Восстановление пароля"
                onSubmit={handleSubmit}
                extraClass="mb-20"
                btnText="Восстановить"
            >
                <Input
                    type="email"
                    name="email"
                    placeholder="Укажите e-mail"
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
