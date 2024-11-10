import React from "react";
import "./BarsScale.scss";

function BarsScale(props) {
  return (
    <div className={props.className ? props.className : ""}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: "rgba(0,0,0,0.2)" }}
      >
        <rect className="spinner_jCIR" x="1" y="6" width="2.8" height="12" />
        <rect
          className="spinner_jCIR spinner_upm8"
          x="5.8"
          y="6"
          width="2.8"
          height="12"
        />
        <rect
          className="spinner_jCIR spinner_2eL5"
          x="10.6"
          y="6"
          width="2.8"
          height="12"
        />
        <rect
          className="spinner_jCIR spinner_Rp9l"
          x="15.4"
          y="6"
          width="2.8"
          height="12"
        />
        <rect
          className="spinner_jCIR spinner_dy3W"
          x="20.2"
          y="6"
          width="2.8"
          height="12"
        />
      </svg>
    </div>
  );
}

export default BarsScale;
