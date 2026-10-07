import { useState, type FormEvent } from "react";

type LoginProps = {
  onSuccess: (role: "admin" | "user") => void;
};

export default function Login({ onSuccess }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");
    const message = event.currentTarget.querySelector("[data-message]");

    let response: Response;
    try {
      response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    } catch {
      if (message instanceof HTMLElement) {
        message.textContent = "Could not reach the server";
      }
      return;
    }

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      if (message instanceof HTMLElement) {
        message.textContent = error?.detail ?? "invalid username or password";
      }
      return;
    }

    const body = await response.json();
    onSuccess(body.role);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#eadfce] px-6 py-16">
      <div className="pointer-events-none absolute -left-28 -top-32 z-0 h-80 w-80 rounded-full border-[55px] border-[#b92a2a]/10" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 z-0 h-80 w-80 rounded-full bg-[#b92a2a]/10" />
      <div className="dot-pattern pointer-events-none absolute inset-0 z-0 opacity-35" />

      <section className="relative z-10 w-full max-w-[23rem]" aria-label="Login">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2.25rem] border border-[#d8b6a2] bg-[#f7eee2] p-8 shadow-[0_26px_65px_-30px_rgba(48,42,36,0.35)]"
        >
          <span className="mb-3 block h-px w-8 bg-[#ad2525]" />
          <h1 className="menu-item-name text-[2.4rem] leading-none tracking-[-0.035em] text-[#29241f]">
            Sign in
          </h1>
          <label className="mt-8 block text-sm text-[#6d6258]">
            Username
            <input
              name="username"
              autoComplete="username"
              className="mt-2 w-full rounded-2xl border border-[#d8b6a2] bg-[#fff8ed] px-4 py-3 text-[#29241f] outline-none"
            />
          </label>
          <label className="mt-4 block text-sm text-[#6d6258]">
            Password
            <span className="relative mt-2 block">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full rounded-2xl border border-[#d8b6a2] bg-[#fff8ed] px-4 py-3 pr-16 text-[#29241f] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xs text-[#ad2525]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          </label>
          <p data-message className="mt-4 min-h-5 text-sm text-[#ad2525]" />
          <button
            type="submit"
            className="relative z-10 mt-2 w-full cursor-pointer rounded-2xl bg-[#ad2525] px-4 py-3 text-[#fff8ed]"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
