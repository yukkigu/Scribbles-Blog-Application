import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../components/Post";

const renderPost = () => {
  const editPost = vi.fn();
  const deletePost = vi.fn();
  render(
    <Post
      key={1}
      id={1}
      title="Testing Post Title"
      content="Testing Post Content"
      editPost={editPost}
      deletePost={deletePost}
    />
  );
  return { editPost, deletePost };
};

describe("Post Component", () => {
  // checks that Post component renders correctly
  it("render Post", () => {
    renderPost();
    expect(screen.getByText("Testing Post Title"));
    expect(screen.getByText("Testing Post Content"));
    expect(screen.getByRole("button", { name: "edit" }));
    expect(screen.getByRole("button", { name: "delete" }));
  });

  // checks that edit modal opens when 'Edit' is clicked
  it("edit modal opens when 'Edit' button is clicked", () => {
    renderPost();
    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    expect(screen.getByText(/Editing Post/)).toBeInTheDocument();
  });

  // closes edit modal when 'Cancel' is clicked
  it("edit modal closes when 'Cancel' button is clicked", () => {
    renderPost();
    fireEvent.click(screen.getByRole("button", { name: "edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByText(/Editing Post/)).toBeNull();
  });

  // checks that edit modal is called with correct arguments
  it("edit modal is called with correct arguments", () => {
    const { editPost } = renderPost();
    fireEvent.click(screen.getByRole("button", { name: "edit" }));
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
      1
    );
    expect(editPost).toHaveBeenCalledTimes(1);
  });

  // opens delete warning when 'Delete' button is clicked
  it("delete modal opens when 'Delete' button is clicked", () => {
    renderPost();
    fireEvent.click(screen.getByRole("button", { name: "delete" }));
    expect(screen.getByText(/Delete Post?/)).toBeInTheDocument();
  });

  // closes delete warning when 'Cancel' button is clicked
  it("delete modal closes when 'Cancel' button is clicked", () => {
    renderPost();
    fireEvent.click(screen.getByRole("button", { name: "delete" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByText(/Delete Post?/)).toBeNull();
  });

  // checks that delete modal is called with correct id
  it("delete is triggered when 'Delete' button is clicked", () => {
    const { deletePost } = renderPost();
    fireEvent.click(screen.getByLabelText("delete"));
    fireEvent.click(screen.getByLabelText("confirm-delete"));
    // checks that deletePost is called with correct id
    expect(deletePost).toHaveBeenCalledWith(1);
    expect(deletePost).toHaveBeenCalledTimes(1);
  });
});
