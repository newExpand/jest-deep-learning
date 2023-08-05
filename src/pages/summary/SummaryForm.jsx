import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryForm = () => {
    const [tcChecked, setTcChecked] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>실제 아이스크림이 배달 되진 않습니다.</Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            위
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: "blue" }}>이용약관</span>
            </OverlayTrigger>
            에 동의합니다.
        </span>
    );

    return (
        <Form>
            <Form.Group controlId="이용약관">
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                주문확인
            </Button>
        </Form>
    );
};

export default SummaryForm;
