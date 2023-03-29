import React from "react";
import Snackbar from "@mui/material/Snackbar";

interface ErrorAlertProps {
  error: string;
  setError: Function;
}
function ErrorAlert(props: ErrorAlertProps) {
  const { error, setError } = props;
  return (
    <Snackbar
      open={error !== ""}
      autoHideDuration={6000}
      onClose={() => setError("")}
      message={error}
    />
  );
}

export default ErrorAlert;
