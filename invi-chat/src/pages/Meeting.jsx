import React, { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../util/firebaseConfig";
import Loader from "../components/Loader";

const Meeting = () => {
  const { meetingId } = useParams();

  const [document, infoLoading, error] = useDocumentData(
    db.doc(`/events/${meetingId}`)
  );

  useEffect(() => {
    if (!infoLoading && !error) setData(document);
  }, [document]);
  const [data, setData] = useState({
    title: "",
    createdAt: "",
    description: "",
    owner: "",
    chatId: "",
    guests: [],
  });

  return (
    <div className="output">
      {!infoLoading ? (
        <div className="meeting container">
          <h1> {data.title} </h1>
          <Link to="/" className="btn btn-block mt-2 btn-outline-info">
            Home
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Meeting;
