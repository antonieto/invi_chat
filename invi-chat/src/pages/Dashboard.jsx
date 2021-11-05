import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
// Components
import Card from "../components/Card";
import InvitationsList from "../components/InvitationsList";
// React Bootstrap components
import { Col, Spinner, Button } from "react-bootstrap";
import { auth } from "../util/firebaseConfig";
const Dashboard = ({ user, token }) => {
  const [meetings, loadingMeetings, errorMeetings] = useCollection(
    db.collection("/events").where("guests", "array-contains", user.handle)
  );

  console.log(auth.currentUser);

  const [meetingId, setMeetingId] = useState("");

  if (errorMeetings) {
    console.log(errorMeetings);
    return (
      <div className="">
        <p className="alert">Something went wrong!</p>
      </div>
    );
  } else
    return (
      <div className="container mt-4">
        <div className="row m-0">
          <Col sm={8}>
            <div className="row m-0">
              {loadingMeetings ? (
                <div className="center-item">
                  <Spinner animation="border" />
                </div>
              ) : (
                meetings.docs.map((doc) => {
                  return (
                    <div className="card evento shadow w-100 h-100 mb-2">
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
