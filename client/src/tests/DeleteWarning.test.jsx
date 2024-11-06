import { render, screen, fireEvent } from "@testing-library/react";
import DeleteWarning from "../components/DeleteWarning";

const renderDeleteWarning = (isOpen = true) => {
  const closeWarning = vi.fn();
  const deletePost = vi.fn();
  render(<DeleteWarning id={1} isOpen={isOpen} onClose={closeWarning} deletePost={deletePost} />);
  return { closeWarning, deletePost };
};

describe("Delete Warning Component", () => {
  // checks that DeleteWarning modal renders correctly
  it("render Delete Warning modal", () => {
    renderDeleteWarning();
    expect(screen.getByText(/Delete Post?/)).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByLabelText("delete")).toBeInTheDocument();
  });

  // checks that deleteWarning modal is not rendered when isOpen is false
  it("do not render modal when isOpen is false", () => {
    renderDeleteWarning(false);
    expect(screen.queryByText(/Delete Post?/)).toBeNull();
  });

  // checks that deleteWarning modal closes when 'Cancel' button is clicked
  it("closeWarning is triggered when 'Cancel' button is clicked", () => {
    const { closeWarning } = renderDeleteWarning();
    // click 'Cancel' button
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    // check that button is only clicked once
    expect(closeWarning).toHaveBeenCalledTimes(1);
  });

  // checks that post deletes correctly
  it("deletePost is triggered when 'Delete' button is clicked", () => {
    const { closeWarning, deletePost } = renderDeleteWarning();
    fireEvent.click(screen.getByLabelText("delete"));

    // checks that deletePost is called with correct id
    expect(deletePost).toHaveBeenCalledWith(1);
    expect(deletePost).toHaveBeenCalledTimes(1);

    expect(closeWarning).toHaveBeenCalledTimes(1);
  });
});
