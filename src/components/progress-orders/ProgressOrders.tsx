import styles from "./ProgressOrders.module.css";
import { ProgressOrdersColumn } from "./components/ProgressOrdersColumn";
import { OrderType } from "../../types";

type Props = {
    orders: OrderType[];
    total: number;
    totalToday: number;
};

export default function ProgressOrders({ total, totalToday, orders }: Props) {
    return (
        <aside className={`${styles.aside} pt-25`}>
            <div className={`${styles.top} pb-15`}>
                <>
                    <ProgressOrdersColumn title="Готовы:">
                        {orders
                            .filter((order) => order.status === "done")
                            .map((order) => (
                                <p
                                    key={order._id}
                                    className={`${styles.columnItem} text text_type_digits-default`}
                                    style={{ color: "#00CCCC" }}
                                >
                                    {order.number}
                                </p>
                            ))}
                    </ProgressOrdersColumn>
                    <ProgressOrdersColumn title="В работе:">
                        {orders
                            .filter((order) => order.status === "pending")
                            .map((order) => (
                                <p
                                    key={order._id}
                                    className={`${styles.columnItem} text text_type_digits-default`}
                                >
                                    {order.number}
                                </p>
                            ))}
                    </ProgressOrdersColumn>
                </>
            </div>
            <div className="pb-15">
                <h3 className="text text_type_main-medium">
                    Выполнено за все время:
                </h3>
                <div
                    className="text text_type_digits-large"
                    style={{
                        textShadow: "0 4px 32px rgb(51 51 255 / 50%)",
                    }}
                >
                    {total}
                </div>
            </div>
            <div className="text text_type_main-medium">
                <h3 className="text text_type_main-medium">
                    Выполнено за сегодня:
                </h3>
                <div
                    className="text text_type_digits-large"
                    style={{
                        textShadow: "0 4px 32px rgb(51 51 255 / 50%)",
                    }}
                >
                    {totalToday}
                </div>
            </div>
        </aside>
    );
}
