import Register from "@/components/Auth/Register";
import Head from "next/head";
import React from "react";

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </>
  );
}

export default RegisterPage;
