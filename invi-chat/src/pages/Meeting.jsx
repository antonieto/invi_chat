import React, { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../util/firebaseConfig";
import Loader from "../components/Loader";
import Chat from "../components/Chat";
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

  return (
    <div className="output">
      {!infoLoading ? (
        <div className="meeting container mt-4">
          <h1 className="text-center"> {data.title} </h1>
          <Link to="/" className="btn my-4 btn-outline-danger">
            &laquo; Home
          </Link> 
          
          <button className="btn mx-1 btn-primary" data-toggle="modal" data-target="#formModal">
            Add guest...
          </button> 

          <div className="modal fade" id="formModal">
            
          </div>


          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <p>{data.description}</p>
                  <p>
                    <strong> Date </strong> {data.createdAt}
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
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
