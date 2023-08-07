import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderSummary = () => {
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
            <h2>스쿱: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            <h2>토핑: {formatCurrency(totals.toppings)}</h2>
            <ul>{toppingList}</ul>
            <SummaryForm />
        </div>
    );
};

export default OrderSummary;
