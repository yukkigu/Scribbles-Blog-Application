import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

function PostModal(props) {
  if (!props.isOpen) return null;

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
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
    console.log("In sendPost... \n post data: ", newPost);
    props.submitPost(newPost);
    props.onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>Create New Post</h2>
          <button className="close-button" onClick={props.onClose}>
            Close
          </button>
        </div>
        <div className="modal-info">
          <form className="post-form">
            <p>Title</p>
            <textarea
              className="post-title"
              placeholder="Enter title"
              name="title"
              value={newPost.title}
              onChange={onChange}></textarea>
            <p>Content</p>
            <textarea
              className="post-content"
              placeholder="Enter content"
              name="content"
              value={newPost.content}
              onChange={onChange}></textarea>
          </form>
        </div>
        <button className="button post-submit" onClick={sendPost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostModal;
