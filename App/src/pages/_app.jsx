import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';

import "../styles/index.css";
import "../styles/DebtItem.css";
import "../styles/DebtChart.css";
import "../styles/Debt.css";
import "../styles/Group.css";
import "../styles/Home.css";

import React, { useState } from "react";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

//<Component {...pageProps} />

/**
 *   const { session, ...restPageProps } = pageProps;
  console.log(session)
  return (
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <p>hello</p>
      <button onClick={() => signOut()}>Sign out</button>
    </SessionProvider>
  </QueryClientProvider>)
}
 * 
 */
