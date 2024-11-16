import React from "react";
import "./About.css";
import NavBar from "./NavBar";

function About(props) {
  return (
    <div className="about-container">
      <NavBar darkMode={props.darkMode} setDarkMode={props.setDarkMode} show={false} />
      <h1>About Scribbles</h1>
      <p className="subtext">
        Scribbles is a very simple blogging application where users can post about their interests,
        daily life, and activities they want to share. The purpose of this website is to create a
        platform for user to communicate and share their experiences.
      </p>
    </div>
  );
}

export default About;
