import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import {
  Button,
  Modal,
  Alert,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const MeetingInviForm = ({ user, meetingId, token, handleToggle }) => {
  const [form, setForm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendInvi = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!form.trim()) {
      setLoading(false);
      setError("Type something!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const content = form;
    setForm("");

    // Validation passed, calling the api
    const url = `https://us-central1-invi-chat.cloudfunctions.net/api/meeting/invite/${meetingId}`;
    const authHeader = "Bearer" + " " + token;
    axios({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authHeader,
      },
      data: {
        to: content,
      },
    })
      .then(() => {
        setError("success");
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          setError(`${content} is already invited!`);
          setTimeout(() => {
            setError("");
          }, 2000);
        } else if (err.response.status === 404) {
          setError(err.response.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-2">
        Invite someone
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Who else is coming?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" id="inviForm" onSubmit={sendInvi}>
            <InputGroup>
              <InputGroup.Text id="basicAt">@</InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-describedby="basicAt"
                value={form}
                onChange={(e) => {
                  setForm(e.target.value);
                }}
              />
            </InputGroup>

            {loading ? (
              <Spinner animation="border" className="mt-4 mx-auto" />
            ) : null}

            {error && error === "success" ? (
              <Alert variant="success" className="mt-3 mb-0">
                {" "}
                Invitation sent successfully!{" "}
              </Alert>
            ) : null}

            {error && error !== "success" ? (
              <Alert variant="danger" className="mt-3 mb-0">
                {" "}
                {error}{" "}
              </Alert>
            ) : null}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Done
          </Button>
          <Button variant="success" type="submit" form="inviForm">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MeetingInviForm;
