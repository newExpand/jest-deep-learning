import { screen, render } from "../../../test-utils/testing-library-util";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("올바르지 않은 스쿱 옵션을 넣었을 때 빨간 테두리로 표시되는지 테스트", async () => {
    const user = userEvent.setup();
    render(<ScoopOption />);

    const vanillaInput = screen.getByRole("spinbutton");
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "-1");
    expect(vanillaInput).toHaveClass("is-invalid");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2.5");
    expect(vanillaInput).toHaveClass("is-invalid");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "11");
    expect(vanillaInput).toHaveClass("is-invalid");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "3");
    expect(vanillaInput).not.toHaveClass("is-invalid");
});
