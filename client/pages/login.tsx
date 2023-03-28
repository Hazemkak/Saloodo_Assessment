import Login from '@/components/Auth/Login'
import Head from 'next/head'
import React from 'react'

function LoginPage() {
  return (
    <>
    <Head>
        <title>Login</title>
    </Head>
    <Login/>
    </>
  )
}

export default LoginPage