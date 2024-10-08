import React, { useState } from "react";
import "./Modal.css";

function PostModal(props) {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>{props.new ? "Create New Post" : "Editing Post"}</h2>
          <button onClick={props.onClose}>{props.new ? "Close" : "Cancel"}</button>
        </div>
        <div className="modal-info">
          <form className="post-form">
            <p>Title</p>
            <textarea className="post-title" placeholder="Enter title"></textarea>
            <p>Content</p>
            <textarea className="post-content" placeholder="Enter content"></textarea>
          </form>
        </div>
        <button className="button post-submit">{props.new ? "Post" : "Save Changes"}</button>
      </div>
    </div>
  );
}

export default PostModal;
