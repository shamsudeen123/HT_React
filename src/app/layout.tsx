"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Head from "next/head";
import "@/styles/globalStyles/globalStyles.css";
import Header from "@/component/header/Header";
import SideMenu from "@/component/sideMenu/SideMenu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { routerUtils } from "@/utils/routerUtils";
import Login from "./auth/login/Login";
import AuthProvider from "@/component/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "AI Attendance System",
//   description: "AI Attendance System",
// };

export default function RootLayout({ children }: { children: any }) {
  const pathname = usePathname();
  const router = useRouter();
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("key");
  }
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

  //  useEffect (()=>{
  //  if(!accessToken)
  //  routerUtils("/",router)
  //  },[accessToken])

  return (
    <html lang="en">
      <Head>
      <title>Harizon Travels</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="icon" href="app_logo.png"></link>
      </Head>

      <body>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
