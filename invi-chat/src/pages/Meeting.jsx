import React, { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import { db } from "../util/firebaseConfig";

import Loader from "../components/Loader";
import Chat from "../components/Chat";
import GuestsList from "../components/GuestsList";
import MeetingInviForm from "../components/MeetingInviForm";
import Map from "../components/Map";

import { Spinner, Dropdown } from "react-bootstrap";
import DropdownMenu from "@restart/ui/esm/DropdownMenu";

const Meeting = ({ token, user }) => {
  const { meetingId } = useParams();

  const [document, infoLoading, error] = useDocumentData(
    db.doc(`/events/${meetingId}`)
  );

  const [loading, setLoading] = useState(false);

  let history = useHistory();

  let messages, loadingMessages, errorMessages;

  const [data, setData] = useState({
    title: "",
    createdAt: "",
    description: "",
    owner: "",
    chatId: "",
    location: "",
    guests: [],
  });

  const deleteMeeting = () => {
    setLoading(true);
    axios({
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      url: `https://us-central1-invi-chat.cloudfunctions.net/api/meeting/delete/${meetingId}`,
    })
      .then((res) => {
        setLoading(false);
        history.push("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!infoLoading && !error) {
      setData(document);
    }
  }, [document]);

  if (infoLoading || loading) {
    return (
      <div className="center-item">
        <Spinner animation="border"></Spinner>
      </div>
    );
  } else
    return (
      <div className="output">
        {!infoLoading ? (
          <div className="meeting container mt-4">
            <h1 className="text-center border-bottom pb-4 mb-4 border-secondary">
              {" "}
              {data.title}{" "}
            </h1>
            {user.handle === data.owner ? (
              <div className="d-flex admin-util">
                <MeetingInviForm
                  meetingId={meetingId}
                  token={token}
                  user={user}
                />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="settings-dropdown">
                    {" "}
                    Settings{" "}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <a onClick={deleteMeeting}>Delete meeting</a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : null}

            <div className="row">
              <div className="col-lg mb-4">
                <Map query={data.location} />
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
          <Spinner animation="border center-item" />
        )}
      </div>
    );
};

export default Meeting;
