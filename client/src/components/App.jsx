import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import NavBar from "./NavBar";
import Message from "./Message";
import Post from "./Post";

function App() {
  const pathToServer = "http://localhost:8080";

  const [postArr, setPostArr] = useState([]);
  // retrieve user preference from local storage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "false" ? false : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }

    // store user preferences in localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // receive data from server
  async function fetchPosts() {
    console.log("Fetching posts...");
    try {
      const response = await axios.get(pathToServer + "/getPosts");
      // Sort by id in ascending order
      setPostArr(response.data.sort((a, b) => a.id - b.id));
    } catch (err) {
      console.log(err);
    }
  }

  // Fetches posts from server when website first loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // submits post into database and updates posts in postArr
  async function submitPost(post) {
    console.log("submitting post...");
    try {
      const response = await axios.post(pathToServer + "/add", post);
      console.log("response from server: ", response.data.message);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  // deletes post from database and updates posts in postArr
  async function deletePost(id) {
    try {
      const response = await axios.delete(pathToServer + `/delete/${id}`);
      console.log("response from server: ", response.data.message);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function editPost(data, id) {
    try {
      const response = await axios.patch(pathToServer + `/edit/${id}`, data);
      console.log("response from server: ", response.data.message);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} submitPost={submitPost} />
      <Message />
      {postArr.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            editPost={editPost}
            deletePost={deletePost}
          />
        );
      })}
    </div>
  );
}

export default App;
