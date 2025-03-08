import React from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderType } from "../../../../types";
import styles from "../../ListOrders.module.css";

type Props = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    hasStatus?: boolean;
} & OrderType;

const status = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
};

const RootElement = (props: Props) => {
    const {
        number,
        createdAt,
        name,
        hasStatus,
        status: statusProp,
        children,
        onClick,
    } = props;

    return (
        <div className={styles.item} onClick={onClick}>
            <div className={`${styles.itemHeader} pb-6`}>
                <p className="text text_type_digits-default">{`#${number}`}</p>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date(createdAt)}
                />
            </div>
            <h3 className="text text_type_main-medium">{name}</h3>
            <div className="pb-6">
                {hasStatus ? (
                    <p
                        className="text text_type_main-default pt-2"
                        style={
                            statusProp === "done"
                                ? { color: "#00CCCC" }
                                : undefined
                        }
                    >
                        {status[statusProp]}
                    </p>
                ) : (
                    ""
                )}
            </div>
            <div className={styles.itemBottom}>{children}</div>
        </div>
    );
};

export default RootElement;
