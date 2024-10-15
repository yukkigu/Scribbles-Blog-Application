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
        <h3>Are you sure you want to delete this post?</h3>
        <div className="button-container warning-container">
          <button className="button" onClick={props.onClose}>
            No
          </button>
          <button className="button confirm-delete" onClick={deletePost}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteWarning;
