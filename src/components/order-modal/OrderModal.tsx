import React from "react";
import Modal from "../modal/Modal";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams, Link, useLocation } from "react-router";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { addOrder, removeOrder } from "../../services/slices/viewSlice";
import { OrderInfo } from "../../pages";

type Props = {
    isOpen: boolean;
};

export default function OrderModal({ isOpen }: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { id } = useParams();

    const { selectOrder } = useAppSelector((state) => state.view);
    const { data, status } = useAppSelector((state) =>
        location.pathname.startsWith("/profile") ? state.auth : state.order,
    );

    const closeModal = () => {
        navigate(-1);
        dispatch(removeOrder());
    };

    React.useEffect(() => {
        const order = data?.orders.find((item) => item._id === id);

        order && dispatch(addOrder(order));
    }, [id, data]);

    if (status === "connecting" || (status === "connected" && data === null)) {
        return (
            <ClipLoader
                size={150}
                color="#4C4CFF"
                cssOverride={{ margin: "0 auto", borderWidth: "5px" }}
            />
        );
    }

    if (status === "disconnected") {
        return <div>Ошибка при загрузке заказов</div>;
    }

    if (data?.orders?.length && selectOrder) {
        return (
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="pb-10">
                    <OrderInfo />
                </div>
            </Modal>
        );
    }

    return (
        <div style={{ margin: "0 auto", textAlign: "center" }}>
            <div className="text text_type_main-medium mb-4">
                Ингридиент не найден
            </div>
            <Link
                to="/"
                className="text text_type_main-default text_color_inactive"
            >
                В конструктор
            </Link>
        </div>
    );
}
