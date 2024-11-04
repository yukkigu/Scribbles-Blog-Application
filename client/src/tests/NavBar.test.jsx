import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";

const renderNavBar = () => {
  // mocks submitPost function
  const submitPost = vi.fn();
  render(<NavBar submitPost={submitPost} />);
};

describe("Navigation Bar Component", () => {
  // checks that navigation bar is rendered properly
  it("renders NavBar", () => {
    renderNavBar();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "new" })).toBeInTheDocument();
  });

  // checks that post modal opens when 'New Post' button is clicked
  it("opens PostModal when 'New Post' button is clicked", () => {
    renderNavBar();

    // open PostModal
    fireEvent.click(screen.getByRole("button", { name: "new" }));

    expect(screen.getByText(/Create New Post/i)).toBeInTheDocument();
  });

  // checks that post modal closes when 'Close' button is clicked
  it("closes PostModal when 'onClose' is triggered by clicking 'Close'", () => {
    renderNavBar();

    // open PostModal
    fireEvent.click(screen.getByRole("button", { name: "new" }));

    // closes modal
    fireEvent.click(screen.getByText(/Close/i));
    // checks that post modal is closed
    expect(screen.queryByText(/Create new post/i)).toBeNull();
  });
});
