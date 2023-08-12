import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-util";

import Options from "../Options";

test("각각의 스쿱 옵션의 이미지가 서버에 표시되는지 테스트", async () => {
    render(<Options optionType="scoops" />);

    // 이미지를 찾았는지
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // 이미지 alt 텍스트 확인
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("각각의 토핑 옵션의 이미지가 서버에 표시되는지 테스트", async () => {
    render(<Options optionType="toppings" />);

    // 이미지를 찾았는지
    const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);

    // 이미지 alt 텍스트 확인
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("잘못된 스쿱값을 넣었을 때 전체 갯수에 반영되는지 테스트", async () => {
    const user = await userEvent.setup();
    render(<Options optionType="scoops" />);

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

    const scoopsSubTotal = screen.getByText(/Scoops 총액:/);

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2.5");

    expect(scoopsSubTotal).toHaveTextContent("Scoops 총액: 0원");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "100");

    expect(scoopsSubTotal).toHaveTextContent("Scoops 총액: 0원");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "-1");

    expect(scoopsSubTotal).toHaveTextContent("Scoops 총액: 0원");
});
