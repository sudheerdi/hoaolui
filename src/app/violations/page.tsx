"use client";

import ViolationsScreen from "./ViolationsScreen";
import { useUserAuthToken } from "../../helpers/hooks/useUserAuthToken";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useAppSelector } from "@/src/lib/hooks";
import MemberViolationScreen from "./MemberViolationScreen";

export default function ViolationsPage() {
  const isAuthenticated = useUserAuthToken();
  const { user } = useAppSelector((state) => state.hoaUser);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      {user?.memberships[0]?.role === "COMMUNITY_ADMIN" ? (
        <ViolationsScreen />
      ) : (
        <MemberViolationScreen />
      )}
    </DashboardLayout>
  );
}
