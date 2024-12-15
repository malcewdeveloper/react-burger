import React from "react";
import {
    ConstructorElement,
    Button,
    DragIcon,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/store";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import styles from "./BurgerConstructor.module.css";

type ItemProps = {
    thumbnail: string;
    type?: "top" | "bottom";
    text: string;
    price: number;
    isLocked?: boolean;
    extraClass?: string;
    handleClose?: () => void;
};

function Item(props: ItemProps) {
    return (
        <li className={`${styles.item} pl-8 ${props.extraClass}`}>
            {!!!props.type && (
                <button className={styles.grab}>
                    <DragIcon type="primary" />
                </button>
            )}
            <ConstructorElement {...props} />
        </li>
    );
}

function BurgerConstructor() {
    const [openModal, setOpenModal] = React.useState(false);
    const { data } = useAppSelector((state) => state.cart);

    const filteredItems = data.filter((item) => item.type !== "bun");
    const bunItem = data.find((item) => item.type === "bun");
    const count = data.reduce((prev, current) => prev + current.price, 0);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <aside className={`${styles.aside} pl-4 pr-4 pt-25`}>
            {bunItem && (
                <Item
                    thumbnail={bunItem.image}
                    text={`${bunItem.name} (верх)`}
                    price={bunItem.price}
                    type="top"
                    isLocked
                />
            )}
            <ul className={`${styles.list} pt-4`}>
                {filteredItems.map((item) => (
                    <Item
                        key={item._id}
                        thumbnail={item.image}
                        text={item.name}
                        price={item.price}
                    />
                ))}
            </ul>
            {bunItem && (
                <Item
                    thumbnail={bunItem.image}
                    text={`${bunItem.name} (низ)`}
                    price={bunItem.price}
                    type="bottom"
                    extraClass="pt-4"
                    isLocked
                />
            )}
            <div className={`${styles.info} pt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{count}</p>
                    <CurrencyIcon type="primary" className={styles.icon} />
                </div>
                <Button
                    onClick={handleOpenModal}
                    htmlType="button"
                    size="large"
                >
                    Оформить заказ
                </Button>
                <Modal isOpen={openModal} onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal>
            </div>
        </aside>
    );
}

export default BurgerConstructor;
