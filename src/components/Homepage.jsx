import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <div className="home">
        <div>
          <div className="home-intro">
            <h2>Welcome!</h2>
            <p>
              At weHike We organise free, weekly, timed, community hiking events all over Canada.
              Get connected to hikers near you today. Bring a buddy with you!
            </p>
          </div>
          <div className="home-actions">
            <Link className="home-join" to="/hike">
              <div className="underline">Search</div>
              <p>Find local hiking events</p>
            </Link>
            <Link className="home-plan" to="/create">
              <div className="underline">Plan</div>
              <p>Create a new hiking event</p>
            </Link>
          </div>
        </div>
        <div className="logo-container">
        </div>
      </div>
    </div>
  );
}
