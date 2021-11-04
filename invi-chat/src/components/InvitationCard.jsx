import React, { useState } from "react";
import {
  Spinner,
  Toast,
  ToastBody,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import axios from "axios";

const InvitationCard = ({ meetingId, token, invitationId }) => {
  const [meeting, loadingDoc, error] = useDocumentDataOnce(
    db.doc(`/events/${meetingId}`)
  );

  const [loading, setLoading] = useState(false);

  const acceptInvi = () => {
    setLoading(true);
    // Call API
    console.log("Accepting invitation");
    // console.log(form);
    axios({
      method: "POST",
      url: `https://us-central1-invi-chat.cloudfunctions.net/api/meeting/accept/${invitationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  };
  const declineInvi = () => {
    setLoading(true);
    console.log("Declining invitation");
    axios({
      method: "DELETE",
      url: `https://us-central1-invi-chat.cloudfunctions.net/api/meeting/decline/${invitationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  };

  if (loadingDoc || loading)
    return (
      <div className="center-item">
        <Spinner animation="border" />
      </div>
    );
  if (error) return null;

  return (
    <>
      <div className="card bg-primary text-white mb-2">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="border-bottom">{meeting.title}</h6>
            <ButtonGroup className="">
              <Button variant="success" onClick={acceptInvi}>
                Go
              </Button>
              <Button variant="outline-danger" onClick={declineInvi}>
                Decline
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="card-body">
          <p> {meeting.owner} </p>
        </div>
      </div>
    </>
  );
};

export default InvitationCard;
