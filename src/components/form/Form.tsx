import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Form.module.css";

type Props = {
    children: React.ReactNode;
    title?: React.ReactNode;
    btnText?: string;
    onSubmit: (e: React.FormEvent) => void;
    extraClass?: string;
};

export default function Form(props: Props) {
    const { children, title, btnText, onSubmit, extraClass } = props;

    return (
        <form
            className={`${styles.form}` + (extraClass ? ` ${extraClass}` : "")}
            onSubmit={onSubmit}
        >
            {title && (
                <h2 className="text text_type_main-medium mb-6">{title}</h2>
            )}
            {children}
            {btnText && <Button htmlType="submit">{btnText}</Button>}
        </form>
    );
}
