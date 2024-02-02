"use client";
import Test from "@/component/test";
import { Provider } from "react-redux";
import "./page.module.css";
import { store } from "@/redux/store";
import Dashboard from "./dashboard/Dashboard";

// 101669475573

export default function Home() {
  return (
    <main>
        {/* <Provider store={store}>
          <Dashboard />
        </Provider> */}
    </main>
  );
}
