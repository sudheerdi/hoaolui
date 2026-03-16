"use client";
import { useAppSelector } from "@/src/lib/hooks";
import ConfigurationScreen from "./ConfigurationScreen";
import MemberSettingsScreen from "./MemberSettingsScreen";

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.hoaUser);
  return user?.memberships[0]?.role === "COMMUNITY_ADMIN" ? (
    <ConfigurationScreen />
  ) : (
    <MemberSettingsScreen />
  );
}
