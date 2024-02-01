import React from 'react';
import inline from "../../../../assets/format/inline.png";
import modal from "../../../../assets/format/modal.png";
import slide from "../../../../assets/format/slide-in.png";
import sticky from "../../../../assets/format/sticky-bar.png";
import './Formats.css'; 

const Formats = () => {
  return (
    <div className="format-container">
      <div className="format-text">
        <h1 style={{fontSize:'32px',fontWeight:'400'}}>Choose the display format of this form</h1>
        <hr className="horizontal-line" />
      </div>
      <div className="format-images">
        <div className="image-card">
          <a href="/inline">
            <img src={inline} alt="inline" />
          </a>
          <p>Inline</p>
        </div>
        <div className="image-card">
          <a href="#">
            <img src={modal} alt="modal" />
          </a>
          <p>Modal</p>
        </div>
        <div className="image-card">
          <a href="#">
            <img src={slide} alt="slide-in" />
          </a>
          <p>Slide in</p>
        </div>
        <div className="image-card">
          <a href="#">
            <img src={sticky} alt="sticky-bar" />
          </a>
          <p>Sticky bar</p>
        </div>
      </div>
    </div>
  );
};

export default Formats;
