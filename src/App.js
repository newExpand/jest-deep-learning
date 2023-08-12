import { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
    const [orderPhase, setOrderPhase] = useState("진행중");

    let Component = OrderEntry;
    switch (orderPhase) {
        case "진행중":
            Component = OrderEntry;
            break;
        case "리뷰":
            Component = OrderSummary;
            break;
        case "완료":
            Component = OrderConfirmation;
            break;
        default:
    }

    return (
        <OrderDetailsProvider>
            <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
        </OrderDetailsProvider>
    );
}

export default App;
