import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    screen.debug();
  });
});
