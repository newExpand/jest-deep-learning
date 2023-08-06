import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("각각의 스쿱 옵션의 이미지가 서버에 표시되는지 테스트", () => {
    render(<Options optionType="scoops" />);

    // 이미지를 찾았는지
    const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // 이미지 alt 텍스트 확인
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});