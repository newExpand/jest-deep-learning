import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";

const Options = ({ optionType }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => {
                // TODO: 에러 처리
            });
    }, [optionType]);

    // TODO: null 나중에 토핑옵션으로 교체
    const ItemComponent = optionType === "scoops" ? ScoopOption : null;

    const optionItems = items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ));

    return <Row>{optionItems}</Row>;
};

export default Options;
