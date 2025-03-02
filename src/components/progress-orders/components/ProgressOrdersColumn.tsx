import React from "react";
import styles from "../ProgressOrders.module.css";

type Props = {
    title: string;
    children: React.ReactNode;
};

export function ProgressOrdersColumn({ title, children }: Props) {
    return (
        <div className={styles.columnRoot}>
            <h3 className="text text_type_main-medium pb-5">{title}</h3>
            <div className={styles.column}>{children}</div>
        </div>
    );
}
