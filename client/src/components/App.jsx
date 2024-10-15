import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import NavBar from "./NavBar";
import Message from "./Message";
import Post from "./Post";

function App() {
  // // testing connection from client to server
  // const [fruitArr, setFruitArr] = useState([]);

  // // receive data from server
  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:8080/api");
  //   setFruitArr(response.data.fruits);
  // };

  // // send data to server
  // const [data, setData] = useState("");

  // function handleChange(event) {
  //   console.log(event.target.value);
  //   setData(event.target.value);
  // }

  // const sendData = async (event) => {
  //   console.log("sending data... ", data);
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/data", { data: data });
  //     console.log("response from server: ", response.data.message);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  const [postArr, setPostArr] = useState([]);

  function submitPost(post) {
    console.log("submitting post...");
    setPostArr((prevPosts) => {
      return [...prevPosts, post];
    });
  }

  function deletePost(id) {
    console.log("deleting post... ", id);
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
      {/* <div className="testing">
        <input placeholder="enter text" value={data} onChange={handleChange}></input>
        <button onClick={sendData}>Test</button>
        {fruitArr.map((fruit, index) => {
          return (
            <div key={index}>
              <p>{fruit}</p>
            </div>
          );
        })}
      </div> */}

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
