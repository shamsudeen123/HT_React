"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Login from "@/app/auth/login/Login";
import Header from "./header/Header";
import SideMenu from "./sideMenu/SideMenu";

// for authentication
// ... (imports and other code)

// ... (imports and other code)

function AuthProvider({ children }: any) {

  const [accessToken, setAccessToken] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const {push} = useRouter();

  const token = typeof localStorage !== 'undefined' && localStorage.getItem("accessToken");

  useEffect(() => {

    if (token) {
      setAccessToken(token);
    }

    setLoading(false); // Set loading to false once the token check is done
  }, [token]);

  useEffect(() => {
    if (accessToken) {
      push("/dashboard");
    }
  }, [accessToken]);

  if (loading) {
    return null; // Render nothing while checking for the access token
  }

  if (!accessToken) {
    return <Login />; // Render the Login component if there's no access token
  }

  return (
    <>
      <Header />
      <SideMenu />
      {children}
    </>
  );
}

export default AuthProvider;