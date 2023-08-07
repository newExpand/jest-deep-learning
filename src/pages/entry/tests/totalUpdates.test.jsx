import { screen, render } from "../../../test-utils/testing-library-util";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("스쿱이 바꼈을 때 바뀐 스쿱갯수가 반영 되는지 테스트", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // 처음 시작은 0원인지에 대한 테스트
    const scoopsSubTotal = screen.getByText("Scoops 총액: 0원", { exact: false });
    expect(scoopsSubTotal).toHaveTextContent("0");

    // 바닐라 스쿱이 1개일 때에 얼마인지 테스트
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubTotal).toHaveTextContent("Scoops 총액: 2,000원");

    // 초콜릿 스쿱이 2개일 때에 얼마인지 테스트
    const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopsSubTotal).toHaveTextContent("Scoops 총액: 6,000원");
});

test("토핑을 추가했을 때 바뀐 토핑값이 반영되는지 테스트", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    // 처음 시작은 0원인지에 대한 테스트
    const toppingSubTotal = screen.getByText("Toppings 총액: 0원", { exact: false });
    expect(toppingSubTotal).toHaveTextContent("0");

    // 체리 체크박스 클릭했을 때 가격 테스트
    const CherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });

    await user.click(CherriesCheckbox);
    expect(toppingSubTotal).toHaveTextContent("Toppings 총액: 1,500원");

    // M&Ms 체크박스 클릭했을 때 가격 테스트
    const MAndMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });

    await user.click(MAndMsCheckbox);
    expect(toppingSubTotal).toHaveTextContent("Toppings 총액: 3,000원");

    // M&Ms 체크박스 체크 풀었을 때 가격 테스트
    await user.click(MAndMsCheckbox);
    expect(toppingSubTotal).toHaveTextContent("Toppings 총액: 1,500원");
});
