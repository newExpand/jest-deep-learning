import { screen, render, waitFor } from "../../../test-utils/testing-library-util";
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
