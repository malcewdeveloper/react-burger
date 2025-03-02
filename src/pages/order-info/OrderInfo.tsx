import React from "react";
import { useParams, Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderInfoItem } from "./components/OrderInfoItem";
import { ClipLoader } from "react-spinners";
import { addOrder } from "../../services/slices/viewSlice";
import styles from "./OrderInfo.module.css";

type Props = {};

const statusMap = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
};

export default function OrderInfo(props: Props) {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { id } = useParams();
    const { selectOrder } = useAppSelector((state) => state.view);
    const { data, status } = useAppSelector((state) =>
        location.pathname.startsWith("/profile") ? state.auth : state.order,
    );
    const { data: ingredients } = useAppSelector((state) => state.ingredients);

    React.useEffect(() => {
        if (data?.orders?.length) {
            const currentOrder = data.orders.find((order) => order._id === id);

            currentOrder && dispatch(addOrder(currentOrder));
        }
    }, [data, status]);

    if (status === "error") {
        return <div>Ошибка при загрузке заказов</div>;
    }

    if (data?.orders?.length && selectOrder && ingredients.length) {
        const ingredientCount = selectOrder.ingredients.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;

            return acc;
        }, {} as { [id: string]: number });

        const ingredientsWithCount = Object.keys(ingredientCount).map((id) => ({
            id,
            count: ingredientCount[id],
        }));

        const totalPrice = Object.keys(ingredientCount).reduce((total, id) => {
            const ingredient = ingredients.find(
                (ingredient) => ingredient._id === id,
            );

            if (ingredient) {
                total += ingredient.price * ingredientCount[id];
            }

            return total;
        }, 0);

        return (
            <div className={styles.container}>
                <div className="pb-15">
                    <p
                        className={`${styles.number} text text_type_digits-default pb-10`}
                    >
                        #{selectOrder.number}
                    </p>
                    <h1 className="text text_type_main-medium pb-3">
                        {selectOrder.name}
                    </h1>
                    <div
                        className="text text_type_main-default"
                        style={{
                            color:
                                selectOrder.status === "done" ? "#00cccc" : "",
                        }}
                    >
                        {statusMap[selectOrder.status]}
                    </div>
                </div>
                <div className={styles.content}>
                    <h2 className="text text_type_main-medium pb-6">Состав:</h2>
                    <ul className={`${styles.list} pr-8`}>
                        {ingredientsWithCount.map((ingredient) => (
                            <OrderInfoItem
                                key={ingredient.id}
                                {...ingredient}
                            />
                        ))}
                    </ul>
                </div>
                <div className={`${styles.bottom} pt-10`}>
                    <FormattedDate
                        className="text text_type_main-default text_color_inactive"
                        date={new Date(selectOrder.createdAt)}
                    />
                    <div className={styles.total}>
                        <span className="text text_type_digits-default mr-2">
                            {totalPrice}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ClipLoader
            size={150}
            color="#4C4CFF"
            cssOverride={{
                margin: "0 auto",
                borderWidth: "5px",
                marginTop: "auto",
                marginBottom: "auto",
            }}
        />
    );
}
