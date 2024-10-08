import React, { useState } from "react";
import "./NavBar.css";
import PostModal from "./PostModal";

function NavBar() {
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
      <PostModal isOpen={createPostOpen} onClose={handleClose} new={true}></PostModal>
    </nav>
  );
}

export default NavBar;
