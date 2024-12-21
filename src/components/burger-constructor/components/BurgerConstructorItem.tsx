import React from "react";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../../services/store";
import { moveItem } from "../../../services/slices/cartSlice";
import { useDrag, useDrop } from "react-dnd";
import styles from "../BurgerConstructor.module.css";

type ItemProps = {
    id: string;
    thumbnail: string;
    type?: "top" | "bottom";
    text: string;
    price: number;
    isLocked?: boolean;
    extraClass?: string;
    handleClose?: () => void;
};

export function BurgerConstructorItem(props: ItemProps) {
    const dispatch = useAppDispatch();

    const [, drag] = useDrag({
        type: "change",
        item: { id: props.id },
    });

    const [, drop] = useDrop<{ id: string }>({
        accept: "change",
        drop(item) {
            if (props.id && item.id !== props.id) {
                dispatch(moveItem({ fromId: props.id, toId: item.id }));
            }
        },
    });

    return (
        <li
            ref={!props.type ? (node) => drag(drop(node)) : undefined}
            className={`${styles.item} pl-8${
                props.extraClass ? ` ${props.extraClass}` : ""
            }`}
        >
            {!props.type && (
                <button className={styles.grab}>
                    <DragIcon type="primary" />
                </button>
            )}
            <ConstructorElement {...props} />
        </li>
    );
}
