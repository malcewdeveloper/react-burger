import React from "react";
import styles from "./OrderDetails.module.css";
import doneSrc from "../../images/done.png";

function randomNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
}

function OrderDetails() {
    return (
        <div className={`${styles.order} pt-30 pb-30 pl-25 pr-25`}>
            <h2 className={`${styles.title} text text_type_digits-large pb-8`}>
                {randomNumber()}
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
        </div>
    );
}

export default OrderDetails;
