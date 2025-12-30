"use client";

import ViolationsScreen from "./ViolationsScreen";
import { useUserAuthToken } from "../../helpers/hooks/useUserAuthToken";

export default function ViolationsPage() {
  const isAuthenticated = useUserAuthToken();

  if (!isAuthenticated) {
    return null;
  }

  return <ViolationsScreen />;
}
