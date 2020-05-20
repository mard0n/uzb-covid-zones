import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { RESET_ERROR } from "../../util/constants";

// type ErrorBoundaryProps = {
//   dispatchContext: any,
//   history: any,
//   children: any,
//   errorCode: number
// }

const ErrorBoundary = (props: any) => {
  const { dispatchContext, children, errorCode } = props;
  const history = useHistory();
  const dispatch: any = React.useContext(dispatchContext);
  return errorCode && [500].includes(errorCode) ? (
    <div>
      ERROR: {errorCode}{" "}
      <button
        onClick={(): void => {
          dispatch({ type: RESET_ERROR  });
          history.push(history.location.pathname);
        }}
      >
        Go Back
      </button>
    </div>
  ) : (
    <>
      {errorCode && <div className="error">ERROR: {errorCode}</div>}
      {children}
    </>
  );
};

export default withRouter(ErrorBoundary);
