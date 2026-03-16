"use client";

import { useUserAuthToken } from "@/src/helpers/hooks/useUserAuthToken";
import PollsScreen from "./PollsScreen";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useAppSelector } from "@/src/lib/hooks";
import MemberPollScreen from "./MemberPollScreen";

export default function VotesPollingPage() {
  const isAuthenticated = useUserAuthToken();
  const { user } = useAppSelector((state) => state.hoaUser);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <DashboardLayout>
      {user?.memberships[0]?.role === "COMMUNITY_ADMIN" ? (
        <PollsScreen />
      ) : (
        <MemberPollScreen />
      )}
    </DashboardLayout>
  );
}
