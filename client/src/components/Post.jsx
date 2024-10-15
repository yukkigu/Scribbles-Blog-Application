import React, { useState } from "react";
import "./Post.css";
import EditPostModal from "./EditPostModal";
import DeleteWarning from "./DeleteWarning";

function Post(props) {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);

  function openPost() {
    setCreatePostOpen(true);
  }

  function closePost() {
    setCreatePostOpen(false);
  }

  function openWarning() {
    setDeleteWarningOpen(true);
  }

  function closeWarning() {
    setDeleteWarningOpen(false);
  }

  return (
    <div className="post-container">
      <h3 className="post-title" value="title">
        {props.title}
      </h3>
      <p className="post-text" value="content">
        {props.content}
      </p>
      <div className="button-container">
        <button className="button edit" onClick={openPost}>
          Edit
        </button>
        <EditPostModal
          id={props.id}
          isOpen={createPostOpen}
          onClose={closePost}
          submitPost={props.submitPost}></EditPostModal>
        <button className="button delete" onClick={openWarning}>
          Delete
        </button>
        <DeleteWarning
          id={props.id}
          isOpen={deleteWarningOpen}
          onClose={closeWarning}
          deletePost={props.deletePost}></DeleteWarning>
      </div>
    </div>
  );
}

export default Post;
