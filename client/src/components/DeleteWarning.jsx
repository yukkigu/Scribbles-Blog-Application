import React, { useState } from "react";
import "./Modal.css";

function DeleteWarning(props) {
  if (!props.isOpen) return null;

  function deletePost() {
    props.deletePost(props.id);
    props.onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="delete-heading">Delete Post?</h3>
        <p className="subtext delete-text">This action cannot be undone.</p>
        <div className="button-container warning-container">
          <button className="button" onClick={props.onClose}>
            Cancel
          </button>
          <button className="button confirm-delete" onClick={deletePost}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteWarning;
