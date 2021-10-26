import React, { useEffect, useState } from "react";
import {
  useCollection,
  useCollectionData,
  useDocument,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import Loader from "./Loader";
import axios from "axios";

const Chat = ({ chatId, token, user }) => {

  // Component State
  const chatRef = db.collection(`/chats/${chatId}/messages`);
  const q = chatRef.orderBy("createdAt", "asc").limit(50);

  const [messages, loading, error] = useCollectionData(q, {
    idField: "id",
  });
  const [lastItem, setLastItem] = useState("");
  const [form, setForm] = useState("");

  // Use Effect
  useEffect(()=>{
    // Look for last message 
    if(!loading){
      // const last = document.getElementById(messages[messages.length - 1].id);
      // last.scrollIntoView({})
      const chatDiv = document.getElementById("chatContainer");
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages])


  // Handlers

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!form.trim()) {
      return;
    }
    console.log(form);
    // Call api
    const url = `/chat/${chatId}`;
    const authHeader = "Bearer" + " " + token;
    axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": authHeader,
      },
      data: {
        text: form
      },
    }) 
    .then(()=>{
      setForm("");
    })
    .catch(err => {
      console.error(err);
    })
  };

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  if (messages && !loading) {
    return (
      <div>
        <h3> Bienvenido al chat, {user.handle} </h3>
        <div
          id="chatContainer"
          className="card bg-dark p-4"
          style={{
            overflow: "scroll",
            overflowX: "hidden",
            maxHeight: "400px",
            height: "400px"
          }}
        >
          {loading ? (
            <p> loading... </p>
          ) : (
            messages.map((message, index) => {

              return (
                <div key={message.id} className="">
                  <div
                    className="row card bg-info p-2 mt-1 d-flex shadow"
                    style={{ width: "max-content", maxWidth: "300px"}}
                  >
                    <h6 className="text-white p-0 m-0">
                      {" "}
                      <span style={{ fontWeight: "400" }}>
                        {" "}
                        {message.handle}:{" "}
                      </span>{" "}
                      {message.text}{" "}
                    </h6>
                    <h6
                      className="text-light"
                      style={{ fontWeight: "300", fontSize: "10px" }}
                    >
                      {" "}
                    </h6>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-2" id="chatForm">
          <input
            type="text"
            className="form-control"
            placeholder="message"
            onChange={handleChange}
            value={form}
          />
        </form>
          <button type="submit" className="btn btn-success mt-2" form="chatForm">
            Send Message
          </button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Chat;
