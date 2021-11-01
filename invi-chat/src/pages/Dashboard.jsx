import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import firebase from "@firebase/app";
// Components
import Card from "../components/Card";
import InvitationsList from "../components/InvitationsList";
// React Bootstrap components
import { Col, Spinner, Button } from "react-bootstrap";

const Dashboard = ({ user, token }) => {
  const [meetings, loadingMeetings, errorMeetings] = useCollection(
    db.collection("/events").where("guests", "array-contains", user.handle)
  );

  const [meetingId, setMeetingId] = useState("");

  return (
    <div className="container mt-4">
      <div className="row">
        <Col sm={8}>
          <div className="row">
            {loadingMeetings ? (
              <Spinner animation="border" />
            ) : (
              meetings.docs.map((doc) => {
                return (
                  <div className="card evento shadow bg-dark text-white w-100 h-100 mb-2 mx-2">
                    <Link to={`/meeting/${doc.id}`} key={doc.id}>
                      <Card info={doc.data()} />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </Col>
        <Col sm={4}>
          <Link to="/newMeeting">
            <Button variant="info" className="btn-block mb-4">
              New meeting
            </Button>
          </Link>
          <InvitationsList user={user} token={token} />
        </Col>
      </div>
    </div>
  );
};

export default Dashboard;
