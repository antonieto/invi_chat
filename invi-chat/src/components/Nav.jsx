import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info shadow">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <h4 className="text-white">Invi Chat</h4>
        </a>
        <div className="d-flex">
          <div class="dropdown">
            <a
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Notifications 🔔
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
