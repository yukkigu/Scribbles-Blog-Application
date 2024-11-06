import { render, screen, fireEvent } from "@testing-library/react";
import Message from "../components/Message";

const renderMessage = () => {
  render(<Message />);
};

describe("Message Component", () => {
  // checks that message is rendered correctly
  it("render Message", () => {
    renderMessage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Welcome to Scribbles!");
    expect(screen.getByLabelText("subtext")).toHaveTextContent(
      "This is a platform for users to freely write and share their interests. Feel free to contribute by adding new posts."
    );
  });
});
