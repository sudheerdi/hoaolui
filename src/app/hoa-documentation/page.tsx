"use client";

import { useUserAuthToken } from "@/src/helpers/hooks/useUserAuthToken";
import DocumentationScreen from "./DocumentationScreen";

export default function HOADocumentationPage() {
  const isAuthenticated = useUserAuthToken();

  if (!isAuthenticated) {
    return null;
  }
  return <DocumentationScreen />;
}
