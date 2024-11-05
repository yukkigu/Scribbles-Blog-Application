import { render, screen, fireEvent } from "@testing-library/react";
import EditPostModal from "../components/EditPostModal";

const renderEditPostModal = (isOpen = true) => {
  const closePost = vi.fn();
  const editPost = vi.fn();
  const submitPost = vi.fn();
  render(
    <EditPostModal
      id={1}
      title="Testing Post Title 1"
      content="Testing Post Content 1"
      isOpen={isOpen}
      onClose={closePost}
      editPost={editPost}
      submitPost={submitPost}
    />
  );
};

describe("Edit Post Modal Component", () => {
  // checks that EditPostModal renders correctly
  it("render EditPostModal", () => {
    renderEditPostModal();
  });
});
