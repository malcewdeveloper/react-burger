import RootElement from ".";
import { ListOrdersBadge as Badge } from "../ListOrdersBadge";
import { useAppSelector, useAppDispatch } from "../../../../services/store";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderType } from "../../../../types";
import { useNavigate, useLocation } from "react-router";
import { addOrder } from "../../../../services/slices/viewSlice";
import styles from "../../ListOrders.module.css";

type Props = {
    hasStatus?: boolean;
} & OrderType;

export function ListOrdersItem(props: Props) {
    const { ingredients: ingredientsProp, _id: id } = props;

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

    if (isLoading)
        return (
            <RootElement
                {...props}
                onClick={handleOpenModal}
                children="Загрузка..."
            />
        );
    if (isError)
        return (
            <RootElement
                {...props}
                onClick={handleOpenModal}
                children="Ошибка получения данных"
            />
        );

    const ingredients = ingredientsProp
        .map((ingredient) => {
            return data.find((item) => item._id === ingredient);
        })
        .filter(
            (ingredient): ingredient is NonNullable<typeof ingredient> =>
                !!ingredient,
        );

    const total = ingredients.reduce(
        (accumulator, ingredient) => accumulator + ingredient.price,
        0,
    );

    return (
        <RootElement {...props} onClick={handleOpenModal}>
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
