import React from "react";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import { BurgerConstructorItem as Item } from "./components/BurgerConstructorItem";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { useNavigate } from "react-router";
import {
    addItem,
    removeItem,
    clearCart,
} from "../../services/slices/cartSlice";
import {
    incrementCount,
    decrementCount,
    incrementBun,
    decrementAll,
} from "../../services/slices/ingredientsSlice";
import { postOrder } from "../../services/thunks/orderThunks";
import { useDrop } from "react-dnd";
import { ItemType, ItemTypeWithId } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../utils";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
    const [openModal, setOpenModal] = React.useState(false);
    const { data } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [, drop] = useDrop<ItemType>({
        accept: "item",
        drop(item) {
            dispatch(addItem({ ...item, id: uuidv4() } as ItemTypeWithId));

            if (item.type === "bun") {
                dispatch(incrementBun(item._id));
            } else {
                dispatch(incrementCount(item._id));
            }
        },
        hover(item) {},
    });

    const filteredItems = data.filter((item) => item.type !== "bun");
    const bunItem = data.find((item) => item.type === "bun");
    const count = React.useMemo(
        () => data.reduce((prev, current) => prev + current.price, 0),
        [data],
    );

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleSubmitOrder = async () => {
        handleOpenModal();

        const result = await dispatch(
            postOrder({
                ingredients: data.map((item) => item._id),
            }),
        );

        if (postOrder.fulfilled.match(result)) {
            dispatch(clearCart());
            dispatch(decrementAll());
        }

        if (postOrder.rejected.match(result) && !getCookie("token")) {
            navigate("/login");
        }
    };

    return (
        <aside ref={drop} className={`${styles.aside} pl-4 pr-4 pt-25`}>
            {!data.length ? (
                <h2
                    className="text text_type_main-medium"
                    style={{
                        textAlign: "center",
                        marginTop: "auto",
                        marginBottom: "auto",
                    }}
                >
                    <div className="pb-5">Ваша корзина пуста.</div>
                    Добавьте ингредиенты, <br />
                    чтобы&nbsp;продолжить.
                </h2>
            ) : (
                <>
                    {bunItem && (
                        <Item
                            id={bunItem.id}
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
                                id={item.id}
                                key={item.id}
                                thumbnail={item.image}
                                text={item.name}
                                price={item.price}
                                handleClose={() => {
                                    dispatch(removeItem(item.id));
                                    dispatch(decrementCount(item._id));
                                }}
                            />
                        ))}
                    </ul>
                    {bunItem && (
                        <Item
                            id={bunItem.id}
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
                            <p className="text text_type_digits-medium">
                                {count}
                            </p>
                            <CurrencyIcon
                                type="primary"
                                className={styles.icon}
                            />
                        </div>
                        <Button
                            onClick={handleSubmitOrder}
                            htmlType="button"
                            size="large"
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </>
            )}
            <Modal isOpen={openModal} onClose={handleCloseModal}>
                <OrderDetails />
            </Modal>
        </aside>
    );
}

export default BurgerConstructor;
