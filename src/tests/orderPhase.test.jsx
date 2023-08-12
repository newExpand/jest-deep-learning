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

    const summaryHeading = screen.getByRole("heading", { name: "주문 내용" });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", { name: "Scoops: 6,000원" });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", { name: "Toppings: 1,500원" });
    expect(toppingsHeading).toBeInTheDocument();

    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();

    const tcCheckbox = screen.getByRole("checkbox", { name: /이용약관/ });
    await user.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole("button", { name: "주문확인" });
    await user.click(confirmOrderButton);

    const loading = screen.getByText("로딩중");
    expect(loading).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole("heading", { name: /감사합니다/ });
    expect(thankYouHeader).toBeInTheDocument();

    const notLoading = screen.queryByText("진행중");
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/주문번호/);
    expect(orderNumber).toBeInTheDocument();

    const newOrderButton = screen.getByRole("button", { name: "새 주문하기" });
    await user.click(newOrderButton);

    const scoopsTotal = await screen.findByText("Scoops 총액: 0원");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText("Toppings 총액: 0원");
    expect(toppingsTotal).toBeInTheDocument();

    unmount();
});

test("토핑을 선택하지 않았을 때 토핑헤더가 없는지에 대한 테스트", async () => {
    const user = userEvent.setup();
    render(<App />);

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const orderSummaryButton = screen.getByRole("button", { name: "선데이 주문하기" });
    await user.click(orderSummaryButton);

    const scoopsHeading = screen.getByRole("heading", { name: /Scoops: / });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingHeader = screen.queryByRole("heading", { name: /Toppings: / });
    expect(toppingHeader).not.toBeInTheDocument();
});

test("토핑이 주문되었다가 삭제되었을 때에 대한 테스트", async () => {
    const user = userEvent.setup();
    render(<App />);

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const cherriesTopping = screen.getByRole("checkbox", { name: "Cherries" });
    await user.click(cherriesTopping);
    expect(cherriesTopping).toBeChecked();

    const toppingsTotal = screen.getByText(/Toppings 총액: /, { exact: false });
    expect(toppingsTotal).toHaveTextContent("Toppings 총액: 1,500원");

    await user.click(cherriesTopping);
    expect(cherriesTopping).not.toBeChecked();
    expect(toppingsTotal).toHaveTextContent("Toppings 총액: 0원");

    const orderSummaryButton = screen.getByRole("button", { name: "선데이 주문하기" });
    await user.click(orderSummaryButton);

    const scoopsHeading = screen.getByRole("heading", { name: "Scoops: 2,000원" });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.queryByRole("heading", { name: /Toppings: / });
    expect(toppingsHeading).not.toBeInTheDocument();
});
