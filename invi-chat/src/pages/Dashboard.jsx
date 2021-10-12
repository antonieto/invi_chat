import React from "react";
import Card from "../components/Card";
import info from "../info.json";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import firebase from "@firebase/app";

const Dashboard = ({ user, token }) => {
  const [meetings, loadingMeetings, errorMeetings] = useCollectionData(
    db
      .collection("/events")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        user.currentMeetings
      )
  );

  return (
    <div className=" p-4">
      <div className="container">
        <div className="row">
          {loadingMeetings ? null : meetings.map((doc) => <Card info={doc} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
