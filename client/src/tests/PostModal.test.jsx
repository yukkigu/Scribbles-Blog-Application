import { render, screen, fireEvent } from "@testing-library/react";
import PostModal from "../components/PostModal";

const renderPostModal = (isOpen = true) => {
  const handleClose = vi.fn();
  const submitPost = vi.fn();
  render(<PostModal isOpen={isOpen} onClose={handleClose} submitPost={submitPost} />);
  //  return handleClose and submitPost so we can access them in test cases
  return { handleClose, submitPost };
};

describe("Post Modal Component", () => {
  // checks that Post Modal component renders correctly
  it("render PostModal", () => {
    renderPostModal(true);
    expect(screen.getByText(/Create New Post/i)).toBeInTheDocument();
  });

  // checks that post modal is not rendered when isOpen is false
  it("do not render modal when isOpen is false", () => {
    renderPostModal(false);
    expect(screen.queryByText(/Create New Post/i)).toBeNull();
  });

  // checks that post modal closes when 'Close' button is clicked
  it("onClose is triggered when 'Close' button is clicked", () => {
    const { handleClose } = renderPostModal();
    // click 'Close' button
    fireEvent.click(screen.getByLabelText("close"));
    // check that button is only clicked once
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // checks that user input is updated correctly
  it("text field is inputted and updated correctly", () => {
    renderPostModal();
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "Test Post Title" } });
    fireEvent.change(screen.getByLabelText("content"), { target: { value: "Test Post Content" } });

    expect(screen.getByLabelText("title").value).toBe("Test Post Title");
    expect(screen.getByLabelText("content").value).toBe("Test Post Content");
  });

  // checks that the placeholder text changes if there are empty fields
  it("error placeholder text shows on empty fields", () => {
    renderPostModal();
    // empty title and content
    fireEvent.click(screen.getByLabelText("submit"));
    expect(screen.getByLabelText("title").placeholder).toBe(
      "Title is empty. Please enter a title."
    );
    expect(screen.getByLabelText("content").placeholder).toBe("Enter content");
  });

  it("error placeholder text shows on empty title", () => {
    renderPostModal();
    // empty title
    fireEvent.change(screen.getByLabelText("content"), { target: { value: "Non-Empty Content" } });
    fireEvent.click(screen.getByLabelText("submit"));
    expect(screen.getByLabelText("title").placeholder).toBe(
      "Title is empty. Please enter a title."
    );
    expect(screen.getByLabelText("content").placeholder).toBe("Enter content");
  });

  it("error placeholder text shows on empty content", () => {
    renderPostModal();
    // empty content
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "Non-Empty Title" } });
    fireEvent.click(screen.getByLabelText("submit"));
    expect(screen.getByLabelText("title").placeholder).toBe("Enter title");
    expect(screen.getByLabelText("content").placeholder).toBe(
      "Content is empty. Please write post content."
    );
  });

  // checks that submitPost sends the correct data
  it("submitPost is called when submit is clicked and sends correct data", async () => {
    const { submitPost, handleClose } = renderPostModal();
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "Test Post Title" } });
    fireEvent.change(screen.getByLabelText("content"), { target: { value: "Test Post Content" } });
    fireEvent.click(screen.getByLabelText("submit"));

    expect(submitPost).toHaveBeenCalledWith({
      title: "Test Post Title",
      content: "Test Post Content",
    });
    // checks that handleClose is called once when submit is clicked
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
