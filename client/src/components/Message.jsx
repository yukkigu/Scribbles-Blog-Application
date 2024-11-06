import React from "react";
import "./Message.css";

function Message() {
  return (
    <div>
      <h1>Welcome to Scribbles!</h1>
      <p className="subtext" aria-label="subtext">
        This is a platform for users to freely write and share their interests. <br />
        Feel free to contribute by adding new posts.
      </p>
    </div>
  );
}

export default Message;
