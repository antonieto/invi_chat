import React, { useState } from "react";
import Card from "../components/Card";
import info from "../info.json";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import firebase from "@firebase/app";
import Meeting from "./Meeting";

const Dashboard = ({ user, token }) => {
  const [meetings, loadingMeetings, errorMeetings] = useCollection(
    db
      .collection("/events")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        user.currentMeetings
      )
  );

  const [meetingId, setMeetingId] = useState("");

  return (
    <div className=" p-4">
      <div className="container">
        <div className="row">
          {loadingMeetings
            ? null
            : meetings.docs.map((doc) => {
                return (
                  <Link to={`/meeting/${doc.id}`} key={doc.id}>
                    <Card info={doc.data()} />
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
