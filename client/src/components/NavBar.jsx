import React, { useState } from "react";
import "./NavBar.css";
import PostModal from "./PostModal";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function NavBar(props) {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  function handleOpen() {
    setCreatePostOpen(true);
  }

  function handleClose() {
    setCreatePostOpen(false);
  }

  function changeMode() {
    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }

  return (
    <nav className="nav-bar">
      <ul>
        <a href="">Home</a>
        <a href="">About</a>
      </ul>
      <div className="nav-container">
        {darkMode ? <DarkModeIcon onClick={changeMode} /> : <LightModeIcon onClick={changeMode} />}
        <button className="button new-post" aria-label="new" onClick={handleOpen}>
          New Post
        </button>
        <PostModal
          isOpen={createPostOpen}
          onClose={handleClose}
          submitPost={props.submitPost}></PostModal>
      </div>
    </nav>
  );
}

export default NavBar;
