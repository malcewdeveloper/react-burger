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
import { useNavigate, useLocation, useParams } from "react-router";
import { ItemType } from "../../../types";
import styles from "../BurgerIngredients.module.css";

export function BurgerIngredientsItem(props: ItemType) {
    const { name, price, image, __v: count, _id: propId } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    const isModal = location.state?.modal;

    const [openModal, setOpenModal] = React.useState(false);

    const [, drag] = useDrag({
        type: "item",
        item: props,
    });

    const handleOpenModal = () => {
        navigate(`/ingredients/${props._id}`, { state: { modal: true } });

        setOpenModal(true);
        dispatch(addProduct(props));
    };

    const handleCloseModal = () => {
        navigate("/");

        setOpenModal(false);
        dispatch(removeProduct());
    };

    React.useEffect(() => {
        if (isModal && id === propId) {
            setOpenModal(true);
        }
    }, [isModal, id, propId]);

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
