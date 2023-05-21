"use client";

import { ToastContainer as ToastContainerOrigin } from "react-toastify";

export default function ToastContainer() {
  return (
    <ToastContainerOrigin
      autoClose={3000}
      closeButton={false}
      hideProgressBar={true}
      position={"bottom-center"}
    />
  );
}
