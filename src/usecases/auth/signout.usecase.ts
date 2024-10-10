import { lucia } from "@/lib/lucia/auth";
import { validateRequest } from "@/lib/lucia/validate-requests";
import { Cookie } from "lucia";

export default async function signoutUsecase(): Promise<Cookie> {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("No session to sign out");
  }

  await lucia.invalidateSession(session.id);

  return lucia.createBlankSessionCookie();
}
