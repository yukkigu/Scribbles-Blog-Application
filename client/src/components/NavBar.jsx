import React, { useState } from "react";
import "./NavBar.css";
import PostModal from "./PostModal";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function NavBar(props) {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  function handleOpen() {
    setCreatePostOpen(true);
  }

  function handleClose() {
    setCreatePostOpen(false);
  }

  function changeMode() {
    if (props.darkMode) {
      props.setDarkMode(false);
    } else {
      props.setDarkMode(true);
    }
  }

  return (
    <nav className="nav-bar">
      <ul>
        <a href="">Home</a>
        <a href="">About</a>
      </ul>
      <div className="nav-container">
        {props.darkMode ? (
          <DarkModeIcon className="nav-icon dark-icon" onClick={changeMode} />
        ) : (
          <LightModeIcon className="nav-icon light-icon" onClick={changeMode} />
        )}
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
