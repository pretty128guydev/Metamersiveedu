import React from "react";

function ProgressState(props) {
  const { correct, children, percent } = props;

  return (
    <div
      className="progress-state"
      style={{
        background: correct ? "#3af3bc2d " : "#ffffff1A",
      }}
    >
      <div className="progress-state-background-box">
        <div
          className="progress-state-background"
          style={{
            transform: `scaleX(${percent}%)`,
            background: correct ? "#3af3bc3d " : "#D9DDDC1D",
          }}
        />
      </div>

      <div style={{ position: "relative" }}>
        <div className="progress-state-label">{children}</div>
      </div>

      <div className="progress-state-percent-label">{percent}%</div>
    </div>
  );
}

export { ProgressState };
