import SummaryForm from "../SummaryForm";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("초기 이용약관 체크박스와 버튼 상태 테스트", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", { name: /이용약관/g });
    const checkedEnabledButton = screen.getByRole("button", { name: "주문확인" });

    // 체크박스가 체크가 안됐는지 확인
    expect(checkbox).not.toBeChecked();

    // 버튼이 비활성화 상태인지 확인
    expect(checkedEnabledButton).toBeDisabled();
});

test("이용약관 체크박스 체크 시 버튼 활성화 및 체크박스 체크 해제 시 버튼 비활성화 테스트", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", { name: /이용약관/g });
    const checkedEnabledButton = screen.getByRole("button", { name: "주문확인" });

    // 체크박스에 체크를 했을 때, 버튼 활성화
    await user.click(checkbox);
    expect(checkedEnabledButton).toBeEnabled();

    // 체크박스 체크 해제 했을 때, 버튼 비활성화
    await user.click(checkbox);
    expect(checkedEnabledButton).toBeDisabled();
});

test("마우스를 올렸을 때 팝오버 노출 유무 테스트", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // 처음엔 팝오버가 숨겨져 있어야 함
    const nullPopOver = screen.queryByText("실제 아이스크림이 배달 되진 않습니다.");
    expect(nullPopOver).not.toBeInTheDocument();

    // 체크박스 라벨에 마우스 올렸을 때 팝오버가 보여야 함
    const termsAndConditions = screen.queryByText("이용약관");
    await user.hover(termsAndConditions);
    const popOver = screen.queryByText("실제 아이스크림이 배달 되진 않습니다.");
    expect(popOver).toBeInTheDocument();

    // 체크박스 라베엘 마우스가 벗어났을 때 팝오버가 숨겨져야 함
    await user.unhover(termsAndConditions);
    expect(popOver).not.toBeInTheDocument();
});
