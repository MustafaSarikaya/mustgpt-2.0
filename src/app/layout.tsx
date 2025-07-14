import "@/src/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/src/trpc/react";
import { MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import AppShell from './_components/AppShell'
import theme from "./theme";
import { Calistoga } from 'next/font/google'
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';


export const metadata: Metadata = {
  title: "MustGPT",
  description: " Portfolio of Mustafa Sarikaya",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-calistoga-sans",
  weight: "400"
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${calistoga.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <ColorSchemeScript />
      </head>
      <body>
        <TRPCReactProvider>
          <MantineProvider theme={theme} >
            <AppShell>
              {children}
            </AppShell>
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}