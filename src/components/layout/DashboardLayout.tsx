"use client";
import React from "react";
import Notification from "../base/Notification";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";
import Sidebar from "../Sidebar";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { type, message } = useAppSelector((state) => state.hoaNotification);
  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen flex flex-col  bg-[#1E293B] overflow-hidden">
      <Sidebar />
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
