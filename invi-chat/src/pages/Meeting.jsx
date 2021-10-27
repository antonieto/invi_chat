import React, { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../util/firebaseConfig";
import Loader from "../components/Loader";
import Chat from "../components/Chat";
import GuestsList from "../components/GuestsList";
import MeetingInviForm from "../components/MeetingInviForm";

const Meeting = ({ token, user }) => {
  const { meetingId } = useParams();

  const [document, infoLoading, error] = useDocumentData(
    db.doc(`/events/${meetingId}`)
  );

  let messages, loadingMessages, errorMessages;

  const [data, setData] = useState({
    title: "",
    createdAt: "",
    description: "",
    owner: "",
    chatId: "",
    guests: [],
  });

  useEffect(() => {
    if (!infoLoading && !error) {
      setData(document);
    }
  }, [document]);

  const [show, toggleShow] = useState("none");

  const handleToggle = () => {
    if (show === "none") toggleShow("block");
    if (show === "block") toggleShow("none");
  };

  return (
    <div className="output">
      {!infoLoading ? (
        <div className="meeting container mt-4">
          <h1 className="text-center"> {data.title} </h1>
          <Link to="/" className="btn my-2 btn-outline-danger">
            &laquo; Home
          </Link>

          {user.handle === data.owner ? (
            <button className="btn mx-1 btn-info" onClick={handleToggle}>
              Send an invitation
            </button>
          ) : null}

          <div
            className="collapse mb-2"
            style={{ display: show, width: "max-content" }}
          >
            <MeetingInviForm meetingId={meetingId} token={token} />
          </div>

          <div className="row">
            <div className="col-lg mb-4">
              <div className="card">
                <div className="card-body">
                  <p>{data.description}</p>
                  <p>
                    <strong> Date </strong> {data.createdAt}
                  </p>
                </div>
              </div>
              {/* Guests list */}
              <GuestsList guests={data.guests} />
            </div>
            <div className="col-lg">
              {!infoLoading && data.chatId ? (
                <Chat chatId={data.chatId} token={token} user={user} />
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Meeting;
