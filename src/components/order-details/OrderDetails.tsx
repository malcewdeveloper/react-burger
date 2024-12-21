import React from "react";
import { useAppSelector } from "../../services/store";
import styles from "./OrderDetails.module.css";
import doneSrc from "../../images/done.png";

function OrderDetails() {
    const { isLoading, isError, number } = useAppSelector(
        (state) => state.order,
    );

    return (
        <div className={`${styles.order} pt-30 pb-30 pl-25 pr-25`}>
            {isLoading ? (
                <h2 className="text text_type_main-medium pb-15">Загрузка</h2>
            ) : isError ? (
                <h2 className="text text_type_main-medium pb-15">
                    {"Не удалось создать заказ. Пожалуйста, попробуйте снова."}
                </h2>
            ) : (
                <>
                    <h2
                        className={`${styles.title} text text_type_digits-large pb-8`}
                    >
                        {number}
                    </h2>
                    <h3 className="text text_type_main-medium pb-15">
                        идентификатор заказа
                    </h3>
                    <img
                        className={styles.image}
                        src={doneSrc}
                        alt="Иконка галочки на фиолетовом фоне"
                    />
                    <p className="text text_type_main-default pt-15 pb-2">
                        Ваш заказ начали готовить
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            )}
        </div>
    );
}

export default OrderDetails;
