import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import { Button } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
    const { resetOrder } = useOrderDetails();
    const [error, setError] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios
            .post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch((error) => {
                setError(true);
                // TODO: 에러 핸들링할 예정
            });
    }, []);

    const handleClick = () => {
        resetOrder();

        setOrderPhase("진행중");
    };

    const newOrderButton = <Button onClick={handleClick}>새 주문하기</Button>;

    if (error) {
        return (
            <>
                <AlertBanner message={null} variant={null} />
                {newOrderButton}
            </>
        );
    }

    if (orderNumber) {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>감사합니다!</h1>
                <p>당신의 주문번호는 {orderNumber}입니다.</p>
                <p style={{ fontSize: "25%" }}>
                    이용약관에 따라 지금은 아무 일도 일어나지 않습니다
                </p>
                {newOrderButton}
            </div>
        );
    } else {
        return <div>로딩중</div>;
    }
};

export default OrderConfirmation;
