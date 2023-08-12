import { screen, render } from "../../../test-utils/testing-library-util";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderConfirmation from "../OrderConfirmation";

test("주문했을 때 서버 오류에 대한 테스트", async () => {
    server.resetHandlers(
        rest.post("http://localhost:3030/order", (req, res, ctx) => res(ctx.status(500)))
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("예상치 못한 에러입니다. 나중에 다시 시도해 주세요.");
});
