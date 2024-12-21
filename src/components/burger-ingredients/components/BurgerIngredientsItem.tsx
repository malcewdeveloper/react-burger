import React from "react";
import Modal from "../../modal/Modal";
import IngredientDetails from "../../ingredient-details/IngredientDetails";
import { addProduct, removeProduct } from "../../../services/slices/viewSlice";
import { useAppDispatch } from "../../../services/store";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { ItemType } from "../../../types";
import styles from "../BurgerIngredients.module.css";

export function BurgerIngredientsItem(props: ItemType) {
    const { name, price, image, __v: count } = props;

    const [openModal, setOpenModal] = React.useState(false);

    const dispatch = useAppDispatch();
    const [, drag] = useDrag({
        type: "item",
        item: props,
    });

    const handleOpenModal = () => {
        setOpenModal(true);
        dispatch(addProduct(props));
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        dispatch(removeProduct());
    };

    return (
        <>
            <li
                onClick={handleOpenModal}
                className={`${styles.item} pl-4 pr-4`}
                ref={drag}
            >
                <img src={image} alt={name} />
                <div className={`${styles.currency} pt-2 pb-2`}>
                    <span
                        className={`text text_type_main-default ${styles.price}`}
                    >
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{name}</p>
                {!!count && <Counter count={count} />}
            </li>
            <Modal isOpen={openModal} onClose={handleCloseModal}>
                <IngredientDetails {...props} />
            </Modal>
        </>
    );
}
