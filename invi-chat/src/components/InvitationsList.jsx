import React from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { db } from "../util/firebaseConfig";
import Loader from "./Loader";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const InvitationsList = ({ user, token }) => {
  const [invitations, loadingInvitations, error] = useCollection(
    db.collection("invitations").where("to", "==", user.handle)
  );

  const acceptInvi = (id) => {
    // Call API
    console.log(id);
    console.log(token);
    axios({
      method: "POST",
      url: `/meeting/accept/${id}`,
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
      <ul className="list-group">
        {!loadingInvitations && !error ? (
          invitations.docs.map((doc) => (
            <li className="list-group-item" key={doc.id}>
              <div className="d-flex justify-content-between">
                <h4>{doc.data().from}</h4>
                <Form onSubmit={acceptInvi(doc.id)}>
                  <Button variant="success" type="submit">
                    {" "}
                    Accept{" "}
                  </Button>
                </Form>
              </div>
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </>
  );
};

export default InvitationsList;
