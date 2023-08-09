import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const { totals } = useOrderDetails();

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
            .then((response) => setItems(response.data))
            .catch((error) => {
                setError(true);
            });

        return () => {
            controller.abort();
        };
    }, [optionType]);

    if (error) {
        return <AlertBanner />;
    }

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>개당 {formatCurrency(pricePerItem[optionType])}</p>
            <p>
                {title} 총액: {formatCurrency(totals[optionType])}원
            </p>
            <Row>{optionItems}</Row>
        </>
    );
};

export default Options;
