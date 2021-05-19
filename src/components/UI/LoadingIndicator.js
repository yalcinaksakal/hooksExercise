import React from "react";

import "./LoadingIndicator.css";

const LoadingIndicator = () => (
  <div className="lds">
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingIndicator;
