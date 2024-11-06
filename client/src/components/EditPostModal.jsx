import React, { useState } from "react";
import "./Modal.css";

function PostModal(props) {
  if (!props.isOpen) return null;

  const [editPost, setEditPost] = useState({
    title: props.title,
    content: props.content,
  });

  const [placeholder, setPlaceholder] = useState({
    title: "Enter title",
    content: "Enter content",
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

  async function sendPost() {
    if (editPost.title == "") {
      setPlaceholder({
        title: "Title is empty. Please enter a title.",
        content: "Enter content",
      });
    } else if (editPost.content == "") {
      setPlaceholder({
        title: "Enter title",
        content: "Content is empty. Please write post content.",
      });
    } else {
      setPlaceholder({
        title: "Enter title",
        content: "Enter content",
      });
      props.editPost(editPost, props.id);
      props.onClose();
    }
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
              placeholder={placeholder.title}
              name="title"
              value={editPost.title}
              onChange={onChange}></textarea>
            <p>Content</p>
            <textarea
              className="post-content"
              placeholder={placeholder.content}
              name="content"
              value={editPost.content}
              onChange={onChange}></textarea>
          </form>
        </div>
        <button className="button post-submit" onClick={sendPost}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default PostModal;
