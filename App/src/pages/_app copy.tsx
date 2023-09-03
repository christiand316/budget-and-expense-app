import './styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import { Session } from 'next-auth'


import React, { useState } from 'react';
import { Login } from "./Login"
import { Home } from "./Home"
import { Debt } from "./Debt"
import { Goals } from "./Goals"

const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  
  const { session, ...restPageProps } = pageProps;
  console.log(session)
  return (
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <p>hello</p>
      <p>{session}</p>
    </SessionProvider>
  </QueryClientProvider>)
}
//<Component {...pageProps} />
