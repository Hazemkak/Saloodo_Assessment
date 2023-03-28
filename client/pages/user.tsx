import Guard from "@/components/Guard/Guard";
import User from "@/components/User/User";
import Head from "next/head";
import React from "react";

function UserPage() {
  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>
      <Guard>
        <User />
      </Guard>
    </>
  );
}

export default UserPage;
