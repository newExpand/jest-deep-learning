import SummaryForm from "../SummaryForm";
import { screen, render, fireEvent } from "@testing-library/react";

test("초기 이용약관 체크박스와 버튼 상태 테스트", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", { name: /이용약관/g });
    const checkedEnabledButton = screen.getByRole("button", { name: "주문확인" });

    // 체크박스가 체크가 안됐는지 확인
    expect(checkbox).not.toBeChecked();

    // 버튼이 비활성화 상태인지 확인
    expect(checkedEnabledButton).toBeDisabled();
});

test("이용약관 체크박스 체크 시 버튼 활성화 및 체크박스 체크 해제 시 버튼 비활성화 테스트", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", { name: /이용약관/g });
    const checkedEnabledButton = screen.getByRole("button", { name: "주문확인" });

    // 체크박스에 체크를 했을 때, 버튼 활성화
    fireEvent.click(checkbox);
    expect(checkedEnabledButton).toBeEnabled();

    // 체크박스 체크 해제 했을 때, 버튼 비활성화
    fireEvent.click(checkbox);
    expect(checkedEnabledButton).toBeDisabled();
});
