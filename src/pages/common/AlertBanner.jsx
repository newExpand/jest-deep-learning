import Alert from "react-bootstrap/Alert";

const AlertBanner = ({ message, variant }) => {
    const alertMessage = message || "예상치 못한 에러입니다. 나중에 다시 시도해 주세요.";
    const alertVariant = variant || "danger";

    return (
        <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
            {alertMessage}
        </Alert>
    );
};

export default AlertBanner;
