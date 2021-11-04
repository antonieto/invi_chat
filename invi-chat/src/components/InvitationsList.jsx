import React, { useState } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import Loader from "./Loader";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

import InvitationCard from "./InvitationCard";

const InvitationsList = ({ user, token }) => {
  const [invitations, loadingInvitations, error] = useCollection(
    db.collection("invitations").where("to", "==", user.handle)
  );

  const acceptInvi = (id) => {
    // Call API
    console.log("Accepting invitation");
    // console.log(form);
    axios({
      method: "POST",
      url: `https://us-central1-invi-chat.cloudfunctions.net/api/meeting/accept/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <h4 className="mb-2">Your invitations</h4>
      {!loadingInvitations && !error && !invitations.docs.length ? (
        <p className="text-muted"> You'll see invitations here </p>
      ) : null}
      <ul className="list-group">
        {!loadingInvitations && !error ? (
          invitations.docs.map((doc) => (
            <InvitationCard
              meetingId={doc.data().eventId}
              token={token}
              invitationId={doc.id}
            />
          ))
        ) : (
          <div className="center-item mt-5">
            <Spinner animation="border" />
          </div>
        )}
      </ul>
    </>
  );
};

export default InvitationsList;
