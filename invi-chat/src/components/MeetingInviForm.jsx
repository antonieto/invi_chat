import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

const MeetingInviForm = ({ user, meetingId, token, handleToggle }) => {
  const [form, setForm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendInvi = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!form.trim()) {
      setLoading(false);
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
        } else if (err.response.status === 404) {
          setError(err.response.data.error);
        }
      });
  };

  if (loading) return <Loader />;
  if (error == "success") {
    return (
      <div className="alert alert-success">Invitation sent successfully!</div>
    );
  }

  return (
    <div className="d-flex align-items-center">
      <div className="card mr-2">
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
                  value={form}
                  className="form-control mr-2"
                  onChange={(e) => {
                    setForm(e.target.value);
                  }}
                />
                <input
                  type="submit"
                  value="Invite"
                  className="btn btn-success"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Error message={error} />
    </div>
  );
};

export default MeetingInviForm;
