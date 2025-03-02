import React from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListOrdersBadge as Badge } from "./ListOrdersBadge";
import { useAppSelector, useAppDispatch } from "../../../services/store";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderType } from "../../../types";
import { useNavigate, useLocation } from "react-router";
import { addOrder } from "../../../services/slices/viewSlice";
import styles from "../ListOrders.module.css";

type Props = {
    hasStatus?: boolean;
} & OrderType;

const status = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
};

export function ListOrdersItem(props: Props) {
    const {
        name,
        status: statusProp,
        ingredients: ingredientsProp,
        _id: id,
        number,
        createdAt,
        hasStatus,
    } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isLoading, isError, data } = useAppSelector(
        (state) => state.ingredients,
    );

    const handleOpenModal = () => {
        navigate(id, {
            state: { background: location },
        });
        dispatch(addOrder(props));
    };

    const RootElement = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className={styles.item} onClick={handleOpenModal}>
                <div className={`${styles.itemHeader} pb-6`}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <FormattedDate
                        className="text text_type_main-default text_color_inactive"
                        date={new Date(createdAt)}
                    />
                </div>
                <h3 className="text text_type_main-medium">{name}</h3>
                <div className="pb-6">
                    {hasStatus ? (
                        <p
                            className="text text_type_main-default pt-2"
                            style={
                                statusProp === "done"
                                    ? { color: "#00CCCC" }
                                    : undefined
                            }
                        >
                            {status[statusProp]}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className={styles.itemBottom}>{children}</div>
            </div>
        );
    };

    if (isLoading) return <RootElement children="Загрузка..." />;
    if (isError) return <RootElement children="Ошибка получения данных" />;

    const ingredients = ingredientsProp
        .map((ingredient) => {
            return data.find((item) => item._id === ingredient);
        })
        .filter(
            (ingredient): ingredient is NonNullable<typeof ingredient> =>
                !!ingredient,
        );

    const total = ingredients.reduce(
        (accumulator, ingredient) =>
            ingredient.type === "bun"
                ? accumulator + ingredient.price * 2
                : accumulator + ingredient.price,
        0,
    );

    return (
        <RootElement>
            <div className={`${styles.itemBadges}`}>
                {ingredients.slice(0, 6).map((ingredient, index) => {
                    return (
                        <Badge
                            text={
                                ingredients.length > 6 && index === 5
                                    ? `+${ingredients.length - 6}`
                                    : undefined
                            }
                            key={index}
                            background={`center / cover no-repeat url("${ingredient.image_mobile}"), #131316`}
                            style={{
                                left: `-${16 * index}px`,
                                zIndex: -index,
                            }}
                        />
                    );
                })}
            </div>
            <p className={`${styles.price} text text_type_digits-default`}>
                <span>{total}</span>
                <CurrencyIcon type="primary" />
            </p>
        </RootElement>
    );
}
