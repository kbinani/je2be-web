import React from "react";
import { WorkerError } from "../../share/messages";

export const ErrorMessage: React.FC<{ error: WorkerError }> = ({ error }) => {
  return (
    <div className="vFlex" style={{ marginTop: 10 }}>
      <div className="errorMessage">Failed</div>
      <div className="hFlex">
        <div>type: </div>
        <div className="errorMessage">{error.type}</div>
      </div>
      {error.native.name && (
        <div className="hFlex">
          <div>name: </div>
          <div className="errorMessage">{error.native.name}</div>
        </div>
      )}
      {error.native.message && (
        <div className="hFlex">
          <div>message: </div>
          <div className="errorMessage">{error.native.message}</div>
        </div>
      )}
      {error.native.stack && (
        <div className="hFlex">
          <div>stack: </div>
          <div className="errorMessage">{error.native.stack}</div>
        </div>
      )}
    </div>
  );
};
