import { Input as YaInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

type IconName =
    | "ArrowDownIcon"
    | "ArrowUpIcon"
    | "BurgerIcon"
    | "CheckMarkIcon"
    | "CloseIcon"
    | "CurrencyIcon"
    | "DeleteIcon"
    | "DragIcon"
    | "EditIcon"
    | "HideIcon"
    | "InfoIcon"
    | "ListIcon"
    | "LockIcon"
    | "LogoutIcon"
    | "MenuIcon"
    | "PlusIcon"
    | "ProfileIcon"
    | "RefreshIcon"
    | "ShowIcon";

type Props = {
    type?: "text" | "email" | "password";
    placeholder?: string;
    icon?: IconName;
    name: string;
    disabled?: boolean;
    error?: boolean;
    value?: string;
    onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorText?: string;
    isControlled?: boolean;
    size?: "default" | "small";
    extraClass?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ value: propValue, onChange, isControlled, ...props }, ref) => {
        const [value, setValue] = React.useState(propValue ? propValue : "");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);

            if (onChange) {
                onChange(e);
            }
        };

        return (
            // @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture is legacy
            <YaInput
                value={isControlled && propValue ? propValue : value}
                onChange={handleChange}
                ref={ref}
                {...props}
            />
        );
    },
);

export default Input;
