"use client";
import { useAppSelector } from "@/src/lib/hooks";
import MyProfileScreen from "./MyProfileScreen";
import MemberProfileScreen from "./MemberProfileScreen";

export default function MyProfilePage() {
  const { user } = useAppSelector((state) => state.hoaUser);
  return user?.memberships[0]?.role === "COMMUNITY_ADMIN" ? (
    <MyProfileScreen />
  ) : (
    <MemberProfileScreen />
  );
}
