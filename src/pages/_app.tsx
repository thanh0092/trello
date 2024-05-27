"use client";

import { StoreProvider } from "@/context/StoreContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: any) {
  return (
    <div className="min-h-screen">
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}
