import { screen, render, waitFor } from "../../../test-utils/testing-library-util";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("토핑과 스쿱 라우트에 대한 에러핸들링 테스트", async () => {
    server.resetHandlers(
        rest.get("http://localhost:3030/scoops", (req, res, ctx) => res(ctx.status(500))),
        rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
            res(ctx.status(500))
        )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole("alert");

        expect(alerts).toHaveLength(2);
    });
});

test("주문한 스쿱이 없을 때 주문하기 버튼 비활성화 테스트", async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const orderSummaryButton = screen.getByRole("button", { name: "선데이 주문하기" });
    expect(orderSummaryButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(orderSummaryButton).toBeEnabled();

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "0");
    expect(orderSummaryButton).toBeDisabled();
});
