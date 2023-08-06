import { render, screen } from "@testing-library/react";

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
