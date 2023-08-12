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

    const hasToppings = totals.toppings > 0;
    let toppingsDisplay = null;

    if (hasToppings) {
        const toppingsArray = Object.keys(optionCounts.toppings);
        const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

        toppingsDisplay = (
            <>
                <h2>Toppings: {formatCurrency(totals.toppings)}원</h2>
                <ul>{toppingList}</ul>
            </>
        );
    }

    return (
        <div>
            <h1>주문 내용</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}원</h2>
            <ul>{scoopList}</ul>
            {toppingsDisplay}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
};

export default OrderSummary;
