import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderSummary = ({ setOrderPhase }) => {
    const { totals, optionCounts } = useOrderDetails();

    const scoopArray = Object.entries(optionCounts.scoops);
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingsArray = Object.keys(optionCounts.toppings);
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

    return (
        <div>
            <h1>주문 내용</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}원</h2>
            <ul>{scoopList}</ul>
            <h2>Toppings: {formatCurrency(totals.toppings)}원</h2>
            <ul>{toppingList}</ul>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
};

export default OrderSummary;
