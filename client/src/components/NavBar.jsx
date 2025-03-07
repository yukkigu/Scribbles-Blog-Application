import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./NavBar.css";
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
        <a>
          <Link to="/"> Home</Link>
        </a>
        <a>
          <Link to="/about">About</Link>
        </a>
      </ul>
      <div className="nav-container">
        {props.darkMode ? (
          <DarkModeIcon
            className="nav-icon dark-icon"
            aria-label="dark-icon"
            onClick={changeMode}
          />
        ) : (
          <LightModeIcon
            className="nav-icon light-icon"
            aria-label="light-icon"
            onClick={changeMode}
          />
        )}
        {props.show && (
          <button className="button new-post" aria-label="new" onClick={handleOpen}>
            New Post
          </button>
        )}
        <PostModal
          isOpen={createPostOpen}
          onClose={handleClose}
          submitPost={props.submitPost}></PostModal>
      </div>
    </nav>
  );
}

export default NavBar;
