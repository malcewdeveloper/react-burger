import React from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { updateUser } from "../../services/thunks/authThunks";

export default function Profile() {
    const [editState, setEdit] = React.useState({
        name: false,
        email: false,
        password: false,
    });

    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [formState, setFormState] = React.useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: "",
    });

    const [isChanged, setChanged] = React.useState(false);

    const inputsRefs = {
        name: React.useRef<HTMLInputElement>(null),
        email: React.useRef<HTMLInputElement>(null),
        password: React.useRef<HTMLInputElement>(null),
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof typeof formState,
    ) => {
        if (!isChanged) setChanged(true);

        setFormState((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const handleEdit = (field: keyof typeof editState) => {
        setEdit((prevState) => ({ ...prevState, [field]: true }));
        setTimeout(() => inputsRefs[field].current?.focus());
    };

    const handleBlur = (field: keyof typeof editState) => {
        setEdit((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const handleCancel = () => {
        setFormState({
            name: user ? user.name : "",
            email: user ? user.email : "",
            password: "",
        });
        setChanged(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        Object.values(inputsRefs).forEach((ref) => ref.current?.blur());

        dispatch(updateUser(formState));

        setChanged(false);
    };

    return (
        <Form onSubmit={handleSubmit} extraClass={`${styles.form} pt-30`}>
            <Input
                ref={inputsRefs.name}
                name="name"
                type="text"
                placeholder="Имя"
                value={formState.name}
                icon={!editState.name ? "EditIcon" : "CloseIcon"}
                onIconClick={() => handleEdit("name")}
                onBlur={() => handleBlur("name")}
                onChange={(e) => handleChange(e, "name")}
                disabled={!editState.name}
                isControlled
                extraClass="mb-6"
            ></Input>
            <Input
                ref={inputsRefs.email}
                name="email"
                type="email"
                placeholder="Логин"
                value={formState.email}
                icon={!editState.email ? "EditIcon" : "CloseIcon"}
                onIconClick={() => handleEdit("email")}
                onBlur={() => handleBlur("email")}
                onChange={(e) => handleChange(e, "email")}
                disabled={!editState.email}
                isControlled
                extraClass="mb-6"
            ></Input>
            <Input
                ref={inputsRefs.password}
                name="password"
                type="password"
                placeholder="Пароль"
                value={formState.password}
                icon={!editState.password ? "EditIcon" : "CloseIcon"}
                onIconClick={() => handleEdit("password")}
                onBlur={() => handleBlur("password")}
                onChange={(e) => handleChange(e, "password")}
                disabled={!editState.password}
                isControlled
                extraClass="mb-6"
            ></Input>
            {isChanged && (
                <>
                    <Button
                        htmlType="reset"
                        extraClass={`${styles.button} mr-2`}
                        onClick={handleCancel}
                    >
                        Отменить
                    </Button>
                    <Button
                        htmlType="submit"
                        extraClass={`${styles.button} ml-2`}
                    >
                        Сохранить
                    </Button>
                </>
            )}
        </Form>
    );
}
