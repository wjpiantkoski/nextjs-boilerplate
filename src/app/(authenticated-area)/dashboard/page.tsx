import { validateRequest } from "@/lib/lucia/validate-requests";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main>
      <h1 className="text-5xl font-bold">Dashboard</h1>
    </main>
  );
}
