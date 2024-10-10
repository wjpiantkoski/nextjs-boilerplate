import { signIn } from "../actions";

export default function SigninPage() {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="p-2 w-[100%] max-w-80">
        <h1 className="text-3xl font-semibold">Sign up</h1>

        <form action={signIn} className="flex flex-col mt-4 gap-3">
          <div className="flex flex-col">
            <label htmlFor="name">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="p-2 rounded-md shadow-sm border"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="p-2 rounded-md shadow-sm border"
            />
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-[100%] rounded-md shadow-sm bg-black text-white dark:bg-slate-400 dark:text-black p-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
