"use client";

import UnitsScreen from "./UnitsScreen";
import { useUserAuthToken } from "../../helpers/hooks/useUserAuthToken";

export default function UnitsPage() {
  const isAuthenticated = useUserAuthToken();

  if (!isAuthenticated) {
    return null;
  }
  return <UnitsScreen />;
}
