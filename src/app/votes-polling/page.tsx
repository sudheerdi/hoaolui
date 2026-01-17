"use client";

import { useUserAuthToken } from "@/src/helpers/hooks/useUserAuthToken";
import PollsScreen from "./PollsScreen";

export default function VotesPollingPage() {
  const isAuthenticated = useUserAuthToken();

  if (!isAuthenticated) {
    return null;
  }
  return <PollsScreen />;
}
