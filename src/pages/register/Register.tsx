import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { Link } from "react-router";
import { getFormData } from "../../utils";
import { RequestRegisterData } from "../../api/auth/types";
import { register } from "../../services/thunks/authThunks";
import { useAppDispatch, useAppSelector } from "../../services/store";

export default function Register() {
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const data = getFormData<RequestRegisterData>(formData);

        dispatch(register(data));
    };

    return (
        <>
            <Form
                title="Регистрация"
                onSubmit={handleSubmit}
                extraClass="mb-20"
                btnText="Зарегистрироваться"
            >
                <Input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    extraClass="mb-6"
                />
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
            <div>
                <span className="text text_type_main-default text_color_inactive mr-2">
                    Уже зарегистрированы?
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
