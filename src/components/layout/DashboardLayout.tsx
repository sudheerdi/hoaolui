"use client";
import React from "react";
import Navbar from "../feature/Navbar";
import Footer from "../feature/Footer";
import Notification from "../base/Notification";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { type, message } = useAppSelector((state) => state.hosaNotification);
  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Notification
        type={type}
        message={message}
        onClose={() => dispatch(setNotification({ type: null, message: "" }))}
      />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
