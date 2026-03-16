"use client";

import { useUserAuthToken } from "@/src/helpers/hooks/useUserAuthToken";
import DocumentationScreen from "./DocumentationScreen";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useAppSelector } from "@/src/lib/hooks";
import MemberDocumentationScreen from "./MemberDocumentationScreen";

export default function HOADocumentationPage() {
  const isAuthenticated = useUserAuthToken();
  const { user } = useAppSelector((state) => state.hoaUser);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <DashboardLayout>
      {user?.memberships[0]?.role === "COMMUNITY_ADMIN" ? (
        <DocumentationScreen />
      ) : (
        <MemberDocumentationScreen />
      )}
    </DashboardLayout>
  );
}
