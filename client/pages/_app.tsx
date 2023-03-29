import Navbar from "@/components/partials/Navbar";
import UserContextProvider from "@/context/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
