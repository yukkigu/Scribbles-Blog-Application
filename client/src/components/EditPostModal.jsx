import React, { useState } from "react";
import "./Modal.css";

function PostModal(props) {
  if (!props.isOpen) return null;

  const [editPost, setEditPost] = useState({
    title: "",
    content: "",
  });

  function onChange(event) {
    const { name, value } = event.target;
    setEditPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  }

  function sendPost() {
    console.log(editPost);
    props.submitPost(editPost);
    props.onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>Editing Post</h2>
          <button className="close-button" onClick={props.onClose}>
            Cancel
          </button>
        </div>
        <div className="modal-info">
          <form className="post-form">
            <p>Title</p>
            <textarea
              className="post-title"
              placeholder="Enter title"
              name="title"
              value={editPost.title}
              onChange={onChange}></textarea>
            <p>Content</p>
            <textarea
              className="post-content"
              placeholder="Enter content"
              name="content"
              value={editPost.content}
              onChange={onChange}></textarea>
          </form>
        </div>
        <button className="button post-submit">Save Changes</button>
      </div>
    </div>
  );
}

export default PostModal;
