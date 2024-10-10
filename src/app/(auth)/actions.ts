"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signupSchema } from "@/lib/validation-schemas/auth/signup.schema";
import signupUsecase from "@/usecases/auth/signup.usecase";

export async function signUp(formData: FormData) {
  const validated = await signupSchema.safeParseAsync(formData);

  if (!validated.success) {
    return {
      error: true,
      message: "Invalid form data",
    };
  }

  const sessionCookie = await signupUsecase(validated.data);

  cookies().set("session", sessionCookie.serialize());

  redirect("/");
}
