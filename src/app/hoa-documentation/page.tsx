"use client";

import { useUserAuthToken } from "@/src/helpers/hooks/useUserAuthToken";
import DocumentationScreen from "./DocumentationScreen";
import DashboardLayout from "@/src/components/layout/DashboardLayout";

export default function HOADocumentationPage() {
  const isAuthenticated = useUserAuthToken();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <DashboardLayout>
      <DocumentationScreen />
    </DashboardLayout>
  );
}
