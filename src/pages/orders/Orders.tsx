import ListOrders from "../../components/list-orders/ListOrders";
import { ListOrdersItem } from "../../components/list-orders/components/ListOrdersItem";
import { useAppSelector } from "../../services/store";
import { ClipLoader } from "react-spinners";

export default function Orders() {
    const { data, status } = useAppSelector((state) => state.auth);

    if (status === "error") {
        return <div>Ошибка при загрузке заказов</div>;
    }

    if (data?.orders?.length && status === "connected") {
        return (
            <ListOrders
                extraClass="pt-10"
                wrapProps={{
                    style: {
                        gap: 24,
                    },
                }}
            >
                {data.orders
                    .slice()
                    .reverse()
                    .map((item) => (
                        <ListOrdersItem hasStatus key={item._id} {...item} />
                    ))}
            </ListOrders>
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
