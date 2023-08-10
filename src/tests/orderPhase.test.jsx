import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./../App";

test("주문 테스트", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
    await user.click(cherriesCheckbox);

    const orderSummaryButton = screen.getByRole("button", { name: "선데이 주문하기" });
    await user.click(orderSummaryButton);

    const summaryHeading = screen.getByRole("heading", { name: "주문 요약" });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", { name: "Scoops: 6,000원" });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", { name: "Toppings: 1,500원" });
    expect(toppingsHeading).toBeInTheDocument();

    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();

    const tcCheckbox = screen.getByRole("checkbox", { name: "이용약관" });
    await user.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole("button", { name: "주문확인" });
    await user.click(confirmOrderButton);

    const loading = screen.getByText(/로딩중/g);
    expect(loading).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole("heading", { name: /감사합니다/g });
    expect(thankYouHeader).toBeInTheDocument();

    const notLoading = screen.queryByText("로딩중");
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText("주문번호");
    expect(orderNumber).toBeInTheDocument();

    const newOrderButton = screen.getByRole("button", { name: "새 주문하기" });
    await user.click(newOrderButton);

    const scoopsTotal = await screen.findByText("Scoops 총액: 0원");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText("Toppings 총액: 0원");
    expect(toppingsTotal).toBeInTheDocument();

    unmount();
});
