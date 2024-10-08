import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import NavBar from "./NavBar";
import Message from "./Message";
import Post from "./Post";

function App() {
  // testing connection from client to server
  const [fruitArr, setFruitArr] = useState([]);

  // receive data from server
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setFruitArr(response.data.fruits);
  };

  // send data to server
  const [data, setData] = useState({ data: "John Doe" });

  const sendData = async () => {
    console.log("sending data...");
    try {
      const response = await axios.post("http://localhost:8080/api/data", data);
      console.log("response from server: ", response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    // testing connection from client to server
    // <div className="testing">
    //     <input placeholder="enter text"></input>
    //     <button onClick={sendData}>Test</button>
    //     {fruitArr.map((fruit, index) => {
    //       return (
    //         <div key={index}>
    //           <p>{fruit}</p>
    //         </div>
    //       );
    //     })}
    //   </div>
    <div>
      <NavBar />
      <Message />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
