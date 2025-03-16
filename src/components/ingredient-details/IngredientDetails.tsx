import React from "react";
import IngredientList from "./components/IngredientList";
import Modal from "../modal/Modal";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router";
import { useAppSelector, useAppDispatch } from "../../services/store";
import {
    addProduct,
    removeProduct,
} from "../../services/slices/view/viewSlice";
import styles from "./IngredientDetails.module.css";

type Props = {
    isOpen: boolean;
};

function IngredientDetails({ isOpen }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const { selectProduct } = useAppSelector((state) => state.view);
    const { data, isLoading } = useAppSelector((state) => state.ingredients);

    const closeModal = () => {
        navigate(-1);
        dispatch(removeProduct());
    };

    React.useEffect(() => {
        const product = data.find((item) => item._id === id);

        product && dispatch(addProduct(product));
    }, [id, data]);

    return isLoading ? (
        <ClipLoader
            size={150}
            color="#4C4CFF"
            cssOverride={{ margin: "0 auto", borderWidth: "5px" }}
        />
    ) : (
        <Modal isOpen={isOpen} onClose={closeModal}>
            {selectProduct ? (
                <div className={`${styles.details} pt-10 pr-10 pl-10 pb-15`}>
                    <header>
                        <h2 className="text text_type_main-large">
                            Детали ингредиента
                        </h2>
                    </header>
                    <div className={styles.content}>
                        <img
                            className={styles.image}
                            src={selectProduct.image}
                            alt={selectProduct.name}
                        />
                        <h3 className="text text_type_main-medium pb-8">
                            {selectProduct.name}
                        </h3>
                        <IngredientList {...selectProduct} />
                    </div>
                </div>
            ) : (
                <div>Ошибка при загрузке данных</div>
            )}
        </Modal>
    );
}

export default IngredientDetails;
