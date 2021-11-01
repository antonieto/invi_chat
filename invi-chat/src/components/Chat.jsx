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
  useEffect(() => {
    // Look for last message
    if (!loading) {
      // const last = document.getElementById(messages[messages.length - 1].id);
      // last.scrollIntoView({})
      const chatDiv = document.getElementById("chatContainer");
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  // Handlers

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!form.trim()) {
      return;
    }
    const content = form;
    setForm("");
    // Call api
    const url = `https://us-central1-invi-chat.cloudfunctions.net/api/chat/${chatId}`;
    const authHeader = "Bearer" + " " + token;
    axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authHeader,
      },
      data: {
        text: content,
      },
    })
      .then(() => {
        setForm("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  if (messages && !loading) {
    return (
      <div>
        <div
          id="chatContainer"
          className="card bg-dark p-4"
          style={{
            overflow: "scroll",
            overflowX: "hidden",
            maxHeight: "400px",
            height: "400px",
          }}
        >
          {messages.length === 0 ? (
            <div
              className="container w-100 h-100"
              style={{
                position: "relative",
              }}
            >
              <div className="center-item">
                <h5 className="m-0 text-center" style={{ fontWeight: 400 }}>
                  {" "}
                  Send a first message!{" "}
                </h5>
              </div>
            </div>
          ) : null}
          {loading ? (
            <p> loading... </p>
          ) : (
            messages.map((message, index) => {
              return (
                <div
                  key={message.id}
                  className={`d-flex ${
                    message.handle === user.handle
                      ? "justify-content-end"
                      : null
                  }`}
                >
                  <div
                    className={`row card ${
                      message.handle === user.handle ? "bg-primary" : "bg-info"
                    } p-2 mt-1 shadow`}
                    style={{ width: "max-content", maxWidth: "300px" }}
                  >
                    <h6
                      className={`${
                        message.handle === user.handle ? "" : "text-white"
                      } p-0 m-0`}
                    >
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
        <button
          type="submit"
          className="btn btn-block btn-success mt-2"
          form="chatForm"
        >
          Send Message
        </button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Chat;
