import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import NavBar from "./NavBar";
import Message from "./Message";
import Post from "./Post";

function App() {
  // // testing connection from client to server
  // const [fruitArr, setFruitArr] = useState([]);

  const pathToServer = "http://localhost:8080";

  const [postArr, setPostArr] = useState([]);
  // receive data from server
  async function fetchPosts() {
    console.log("Fetching posts...");
    try {
      const response = await axios.get(pathToServer + "/getPosts");
      setPostArr(response.data);
      console.log("response in fetch ", response.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Fetches posts from server when website first loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // submits post into database and updates post in postArr
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

  async function deletePost(id) {
    console.log("deleting post... ", id);
    try {
      const response = await axios.post(pathToServer + `/delete/${id}`);
    } catch (err) {
      console.error(err);
    }
    setPostArr((prevPosts) => {
      return prevPosts.filter((post, index) => {
        return index !== id;
      });
    });
  }

  function getPost(id) {
    console.log("getting post with id ... ", id);
    console.log(postArr[id]);
    return postArr[id];
  }

  return (
    <div>
      <NavBar submitPost={submitPost} />
      <Message />
      {postArr.map((post, index) => {
        return (
          <Post
            key={index}
            id={index}
            title={post.title}
            content={post.content}
            submitPost={submitPost}
            deletePost={deletePost}
          />
        );
      })}
    </div>
  );
}

export default App;
