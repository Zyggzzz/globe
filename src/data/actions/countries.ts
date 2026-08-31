"use server";

import { validateAuth } from "@/lib/validateAuth";
import { getCookie } from "@/utils/cookies";
import { db, schema } from "..";
import { revalidatePath } from "next/cache";

export async function addCountry(prevState: unknown, formData: FormData) {
  const token = await getCookie("token");

  if (!token) {
    return { success: false, message: "You must be logged in to add a country" };
  }

  const user = await validateAuth(token.value);
  const countryIso3 = formData.get("countryComboBox");

  if (!user) {
    return { success: false, message: "Invalid token" };
  }

  if (typeof countryIso3 !== "string" || !countryIso3) {
    return { success: false, message: "Country is required" };
  }

  await db.insert(schema.userCountriesTable).values({
    userId: user.id,
    countryIso3,
  });

  revalidatePath("/");

  return { success: true, message: "Country added" };
}
