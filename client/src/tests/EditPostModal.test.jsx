import { render, screen, fireEvent } from "@testing-library/react";
import EditPostModal from "../components/EditPostModal";

const renderEditPostModal = (isOpen = true) => {
  const closePost = vi.fn();
  const editPost = vi.fn();
  render(
    <EditPostModal
      id={1}
      title="Testing Post Title 1"
      content="Testing Post Content 1"
      isOpen={isOpen}
      onClose={closePost}
      editPost={editPost}
    />
  );
  return { closePost, editPost };
};

describe("Edit Post Modal Component", () => {
  // checks that EditPostModal renders correctly
  it("render EditPostModal", () => {
    renderEditPostModal();
    // checks that values in title and content are correct
    expect(screen.getByPlaceholderText(/Enter title/).value).toBe("Testing Post Title 1");
    expect(screen.getByPlaceholderText(/Enter content/).value).toBe("Testing Post Content 1");
  });

  // checks that edit post modal is not rendered isOpen is false
  it("do not render modal when isOpen is false", () => {
    renderEditPostModal(false);
    expect(screen.queryByText(/Editing Post/)).toBeNull();
  });

  // checks that edit post modal closes when 'Cancel' button is clicked
  it("closePost is triggered when 'Cancel' button is clicked", () => {
    const { closePost } = renderEditPostModal();
    // click 'Cancel' button
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    // check that button is only clicked once
    expect(closePost).toHaveBeenCalledTimes(1);

    // checks that data of post has not changed
    expect(screen.getByPlaceholderText(/Enter title/).value).toBe("Testing Post Title 1");
    expect(screen.getByPlaceholderText(/Enter content/).value).toBe("Testing Post Content 1");
  });

  // checks that user input is updated correctly
  it("text field is inputted and updated correctly", () => {
    renderEditPostModal();
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "Test Edit Post Title" } });
    fireEvent.change(screen.getByLabelText("content"), {
      target: { value: "Test Edit Post Content" },
    });

    expect(screen.getByLabelText("title").value).toBe("Test Edit Post Title");
    expect(screen.getByLabelText("content").value).toBe("Test Edit Post Content");
  });

  // checks that the placeholder text changes if there are empty fields
  it("error placeholder text shows on empty fields", () => {
    renderEditPostModal();
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("content"), {
      target: { value: "" },
    });
    // empty title and content
    fireEvent.click(screen.getByLabelText("save"));
    expect(screen.getByLabelText("title").placeholder).toBe(
      "Title is empty. Please enter a title."
    );
    expect(screen.getByLabelText("content").placeholder).toBe("Enter content");
  });

  it("error placeholder text shows on empty title", () => {
    renderEditPostModal();
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "" } });
    // empty title
    fireEvent.change(screen.getByLabelText("content"), { target: { value: "Non-Empty Content" } });
    fireEvent.click(screen.getByLabelText("save"));
    expect(screen.getByLabelText("title").placeholder).toBe(
      "Title is empty. Please enter a title."
    );
    expect(screen.getByLabelText("content").placeholder).toBe("Enter content");
  });

  it("error placeholder text shows on empty content", () => {
    renderEditPostModal();
    fireEvent.change(screen.getByLabelText("content"), {
      target: { value: "" },
    });

    // empty content
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "Non-Empty Title" } });
    fireEvent.click(screen.getByLabelText("save"));
    expect(screen.getByLabelText("title").placeholder).toBe("Enter title");
    expect(screen.getByLabelText("content").placeholder).toBe(
      "Content is empty. Please write post content."
    );
  });

  // checks that editPost updates and saves correctly
  it("updates post with new changes and saves", () => {
    const { editPost, closePost } = renderEditPostModal();
    fireEvent.change(screen.getByLabelText("title"), { target: { value: "Edited Post Title" } });
    fireEvent.change(screen.getByLabelText("content"), {
      target: { value: "Edited Post Content" },
    });
    fireEvent.click(screen.getByLabelText("save"));

    // checks that editPost function is called with correct data and id
    expect(editPost).toHaveBeenCalledWith(
      {
        title: "Edited Post Title",
        content: "Edited Post Content",
      },
      1 // id of post that is being edited
    );
    expect(closePost).toHaveBeenCalledTimes(1);
  });
});
