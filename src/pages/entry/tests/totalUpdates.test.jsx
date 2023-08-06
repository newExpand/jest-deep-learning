import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("스쿱이 바꼈을 때 바뀐 스쿱갯수가 반영 되는지 테스트", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // 처음 시작은 0원인지에 대한 테스트
    const scoopsSubTotal = screen.getByText("스쿱 총액: 원", { exact: false });
    expect(scoopsSubTotal).toHaveTextContent("0");

    // 바닐라 스쿱이 1개일 때에 얼마인지 테스트
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubTotal).toHaveTextContent("2000");

    // 초콜릿 스쿱이 2개일 때에 얼마인지 테스트
    const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopsSubTotal).toHaveTextContent("6000");
});
