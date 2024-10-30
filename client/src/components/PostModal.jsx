import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

function PostModal(props) {
  if (!props.isOpen) return null;

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  const [placeholder, setPlaceholder] = useState({
    title: "Enter title",
    content: "Enter content",
  });

  function onChange(event) {
    const { name, value } = event.target;
    setNewPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  }

  async function sendPost() {
    if (newPost.title == "") {
      console.log("title empty");
      setPlaceholder({
        title: "Title is empty. Please enter a title.",
        content: "Enter content",
      });
    } else if (newPost.content == "") {
      console.log("content empty");
      setPlaceholder({
        title: "Enter title",
        content: "Content is empty. Please write post content.",
      });
    } else {
      setPlaceholder({
        title: "Enter title",
        content: "Enter content",
      });
      props.submitPost(newPost);
      props.onClose();
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>Create New Post</h2>
          <button className="close-button" aria-label="close" onClick={props.onClose}>
            Close
          </button>
        </div>
        <div className="modal-info">
          <form className="post-form">
            <p>Title</p>
            <textarea
              className="post-title"
              aria-label="title"
              placeholder={placeholder.title}
              name="title"
              value={newPost.title}
              onChange={onChange}></textarea>
            <p>Content</p>
            <textarea
              className="post-content"
              aria-label="content"
              placeholder={placeholder.content}
              name="content"
              value={newPost.content}
              onChange={onChange}></textarea>
          </form>
        </div>
        <button className="button post-submit" aria-label="submit" onClick={sendPost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostModal;
