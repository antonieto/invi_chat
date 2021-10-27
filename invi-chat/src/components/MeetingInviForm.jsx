import React, { useState } from "react";
import axios from "axios";

const MeetingInviForm = ({ user, meetingId, token }) => {
  const [form, setForm] = useState("");
  const [error, setError] = useState("");

  const sendInvi = (e) => {
    e.preventDefautlt();

    if (!form.trim()) {
      setError("Type something!");
      return;
    }

    const content = form;
    setForm("");

    // Validation passed, calling the api
    const url = `/meeting/invite/${meetingId}`;
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
    }).then((res) => {});
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={sendInvi}>
          <div className="row">
            <div className="d-flex">
              <label htmlFor="" className="mx-2 my-0 bg-info p-2 rounded">
                {" "}
                @{" "}
              </label>
              <input
                type="text"
                className="form-control mr-2"
                onChange={(e) => {
                  setForm(e.target.value);
                }}
              />
              <input type="submit" value="Invite" className="btn btn-success" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingInviForm;
