import React from "react";
import { Link } from "react-router-dom";
import "./NewFormPage.css";

const NewFormPage = () => {
  return (
    <div className="new-form-container">
      <div className="new-form-text">
        <h3>How do you want to gather subscribers?</h3>
      </div>
      <div className="new-form-cards">
        <Link to="/forms/formats" style={{textDecoration:'none'}}>
          <div className="new-form-card">
            <div className="new-form-card-header">
              <h2 style={{ color: "#fff" }}>Forms</h2>
            </div>
            <div className="new-form-content">
              <p className="new-form-text0">
                You can embed a form anywhere on your website,sales page,landing
                page that you host yourself.
              </p>
            </div>
          </div>
        </Link>
        <div className="new-form-card">
          <div className="new-form-card-header">
            <h2 style={{ color: "#fff" }}>Landing Page</h2>
          </div>
          <div className="new-form-card-content">
            <p className="new-form-text0">
              Capture email addresses with a landing page hosted by xyz or on
              your own domain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFormPage;
