"use client";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: any) {
  return <div className="min-h-screen">
    <Component {...pageProps} />
  </div>
}