import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

const OrderEntry = () => {
    const { totals } = useOrderDetails();

    return (
        <div>
            <h1>당신의 선데이를 주문하세요!</h1>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>전체 총액: {formatCurrency(totals.scoops + totals.toppings)}원</h2>
        </div>
    );
};

export default OrderEntry;
