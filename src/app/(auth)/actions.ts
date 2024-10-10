"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import signupUsecase from "@/usecases/auth/signup.usecase";
import { signupSchema } from "@/lib/validation-schemas/auth/signup.schema";
import { signinSchema } from "@/lib/validation-schemas/auth/signin.schema";
import signinUsecase from "@/usecases/auth/signin.usecase";

export async function signUp(formData: FormData) {
  const validated = signupSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validated.success) {
    throw new Error("Invalid form data");
  }

  const sessionCookie = await signupUsecase(validated.data);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/");
}

export async function signIn(formData: FormData) {
  const validated = signinSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validated.success) {
    throw new Error("Invalid form data");
  }

  const sessionCookie = await signinUsecase(validated.data);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/");
}
