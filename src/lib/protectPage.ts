import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { validateAuth } from "@/lib/validateAuth";
import { getCookie } from "@/utils/cookies";

export const protectPage = cache(async () => {
  const token = await getCookie("token");

  if (!token) {
    redirect("/auth/login");
  }

  const user = await validateAuth(token.value);

  if (!user) {
    redirect("/auth/login");
  }

  return {
    user: user,
  };
});
