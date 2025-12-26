import { useAppSelector } from "@/src/lib/hooks";
import { redirect, RedirectType } from "next/navigation";

export const useUserAuthToken = () => {
  const { token } = useAppSelector((state) => state.hoaUser);

  if (token && token != "") {
    return true;
  }
  redirect("/login", RedirectType.replace);
};
