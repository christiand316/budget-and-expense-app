import './styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"



import React, { useState } from 'react';


const queryClient = new QueryClient()


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
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