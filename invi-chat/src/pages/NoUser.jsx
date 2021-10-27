import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
const NoUser = () => {
  return (
    <>
      <header className="no-user_header">
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
          <div className="container-fluid">
            <a href="#" className="navbar-brand">
              <h4 className="text-white">Invi Chat</h4>
            </a>
            <div className="d-flex">
              <ul>
                <Link
                  to="/login"
                  className="btn bg-secondary text-white px-2 mr-2"
                >
                  Log In
                </Link>

                <Link to="/signup" className="btn btn-success text-white px-2">
                  Sign Up
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="mt-4">
        <div className="container-fluid w-50" style={{ minWidth: "500px" }}>
          <div className="card bg-dark mb-2">
            <div className="card-header">
              <h3 className="card-title text-center m-0">
                {" "}
                What is Invi Chat?
              </h3>
            </div>
            <div className="card-body text-white">
              <p className="">
                Invi Chat is an open source social media app developed using{" "}
                <strong> React.js</strong> for the frontend and{" "}
                <strong> Firebase </strong> for the backend. This project is the
                result of the collaborative work by four second year computer
                science students <a href="#">José Naime</a>,{" "}
                <a href="https://github.com/JoelSolano59" target="_blank">
                  Joel Solano
                </a>
                ,{" "}
                <a href="https://github.com/BrandonMagana" target="_blank">
                  {" "}
                  Brandon Magaña{" "}
                </a>
                , and{" "}
                <a href="https://github.com/antonieto" target="_blank">
                  {" "}
                  Antonio Monroy
                </a>
                .
              </p>
              <p>
                The original idea for the app came from myself, the collaborator
                writing this, <strong>Antonio</strong>. A few days before my
                birthday i decided i could be a great idea to develop an app
                where i could be able to send invitations to my close friends,
                so they could attend my birthday party. I originally started
                developing the idea and finished a very simple live chat where i
                could talk to the friends i sent my invitation to. Everything
                worked fine, but i decided it would be a great idea to build a
                more complex project based on the same idea.
              </p>
              <p></p>
            </div>
          </div>
          <div className="card bg-dark mb-2">
            <div className="card-header">
              <h3 className="card-title text-center m-0"> What is it for?</h3>
            </div>
            <div className="card-body">
              <p className="">
                Invi Chat is designed as a way to make interactive invitations
                to any kind of meeting. Using Invi Chat you can create meetings,
                invite your friends, chat with them and keep your guests up to
                date for the meeting. Don't have an account yet? Go ahead and
                create one in less than one minute.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NoUser;
