import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import MapForm from "../components/MapForm";
import { useHistory } from "react-router-dom";

import axios from "axios";

const NewMeeting = ({ token, user }) => {
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleChange = (e) => {
    setNewMeeting({
      ...newMeeting,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !newMeeting.title.trim() ||
      !newMeeting.description.trim() ||
      !newMeeting.location.trim()
    ) {
      setError("All fields are required!");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    // Call the API
    axios({
      method: "POST",
      url: "https://us-central1-invi-chat.cloudfunctions.net/api/meeting",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: newMeeting,
    })
      .then((response) => {
        setLoading(false);
        history.push(`/meeting/${response.data.eventId}`);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
        setTimeout(() => {
          setError("");
        });
      });
  };

  if (loading)
    return (
      <div className="center-item">
        <Spinner animation="border" style={{ margin: "0 auto" }} />
      </div>
    );
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-lg">
          <MapForm setNewMeeting={setNewMeeting} newMeeting={newMeeting} />
        </div>
        <div className="col-lg">
          <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label> Title of the meeting </Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Title here!"
                id="floatingInput"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Description </Form.Label>
              <Form.Control
                onChange={handleChange}
                as="textarea"
                name="description"
                rows={3}
                placeholder="Describe your meeting"
                id="floatingInput"
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="btn-block">
              <h4>Create</h4>
            </Button>
          </Form>
          {error ? (
            <Alert variant="danger" className="text-center">
              {" "}
              {error}{" "}
            </Alert>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewMeeting;
