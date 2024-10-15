import React, { useState } from "react";
import "./NavBar.css";
import PostModal from "./PostModal";

function NavBar(props) {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  function handleOpen() {
    setCreatePostOpen(true);
  }

  function handleClose() {
    setCreatePostOpen(false);
  }

  return (
    <nav className="nav-bar">
      <ul>
        <a href="">Home</a>
        <a href="">About</a>
      </ul>
      <button className="button" onClick={handleOpen}>
        New Post
      </button>
      <PostModal
        isOpen={createPostOpen}
        onClose={handleClose}
        submitPost={props.submitPost}></PostModal>
    </nav>
  );
}

export default NavBar;
