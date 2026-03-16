"use client";
import { useAppSelector } from "@/src/lib/hooks";
import PaymentScreen from "./PaymentScreen";
import MemberPaymentsScreen from "./MemberPaymentsScreen";

export default function PaymentPage() {
  const { user } = useAppSelector((state) => state.hoaUser);
  return user.memberships[0].role === "COMMUNITY_ADMIN" ? (
    <PaymentScreen />
  ) : (
    <MemberPaymentsScreen />
  );
}
