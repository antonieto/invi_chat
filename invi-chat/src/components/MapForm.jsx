import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Map from "./Map";

const MapForm = ({ setNewMeeting, newMeeting }) => {
  const [form, setForm] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Valiadate
    if (!form.trim()) {
      setError("is-invalid");
      return;
    }
    setError("");
    setQuery(form);
    setNewMeeting({
      ...newMeeting,
      location: form,
    });
  };

  return (
    <>
      <h3> Location </h3>
      <Form className="my-2" id="mapForm" onSubmit={handleSubmit}>
        <div className="d-flex">
          <Form.Control
            type="text"
            name="location"
            className={error}
            placeholder="Where?"
            onChange={(e) => {
              setForm(e.target.value);
            }}
          />
          <Button variant="info" type="submit" form="mapForm">
            {" "}
            Search{" "}
          </Button>
        </div>
      </Form>
      <Map query={query} />
    </>
  );
};

export default MapForm;
