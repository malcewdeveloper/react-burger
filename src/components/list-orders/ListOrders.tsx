import styles from "./ListOrders.module.css";
import React from "react";

type Props = {
    title?: string;
    wrapProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >;
    extraClass?: string;
    children?: React.ReactNode;
};

export default function ListOrders({
    title,
    wrapProps,
    extraClass,
    children,
}: Props) {
    return (
        <main className={`${styles.main} ${extraClass ? extraClass : ""}`}>
            {title && (
                <h1 className="text text_type_main-large pt-10 pb-5">
                    {title}
                </h1>
            )}
            <section className={`${styles.wrapper} pr-4`} {...wrapProps}>
                {children}
            </section>
        </main>
    );
}
