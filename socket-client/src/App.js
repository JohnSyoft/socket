import React, { Component, useEffect, useState } from "react";
import "./App.css";
const { io } = require("socket.io-client");

function App() {
  const [state, setState] = useState("");
  const [msg, setMsg] = useState([
    { msg: "hi", sender: "1234", reciver: "34" },
  ]);

  console.log(msg);

  const socket = io("http://localhost:8000");
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  useEffect(() => {
    socket.on("hi", (arg) => {
      console.log(arg);
    });
    socket.on("jeevan", (arg) => {
      console.log(arg);
    });
    socket.on("recive_message", (arg1, arg2, arg3) => {
      console.log(arg1); // 1
      console.log(arg2); // "2"
      console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
      console.log(arg1);
      // if (arg3 === localStorage.getItem("userId")) {
      console.log("hey you got a message");
      setMsg([...msg, { sender: arg2, reciver: arg3, msg: arg1 }]);
      // }
    });
    console.log("hi");
  });

  return (
    <div className="App">
      <div className="messags">
        {msg.map((item) => (
          <div
            className={`${
              item.sender === localStorage.getItem("userId") && "sender"
            }
            ${item.sender !== localStorage.getItem("userId") && "reciver"}
            `}
            style={
              {
                // marginLeft: `${
                //   item.sender !== localStorage.getItem("userId") && "auto"
                // }`,
                // marginRight: `${
                //   item.sender === localStorage.getItem("userId") && "auto"
                // }`,
              }
            }
          >
            <p
              style={{
                backgroundColor: `${
                  item.sender === localStorage.getItem("userId") && "red"
                }`,
                background: `${
                  item.sender !== localStorage.getItem("userId") && "violet"
                }`,
              }}
            >
              {item.msg}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          placeholder="start Typing a message"
          type={"text"}
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <button
          onClick={() => {
            socket.emit(
              "send_message",
              state,
              localStorage.getItem("userId"),
              localStorage.getItem("reciver")
            );
            setState("");
          }}
        >
          send
        </button>
      </div>
    </div>
  );
}

export default App;
