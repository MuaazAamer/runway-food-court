import { useEffect, useState } from "react";
import "../components/item/index.css";
import Admin from "../components/admin/Admin";
import Login from "../components/login/Login";
import User from "../components/user/User";

type Role = "admin" | "user";

function panelPath(role: Role) {
  return role === "admin" ? "/admin" : "/user";
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [path, setPath] = useState(() => {
    if (window.location.pathname !== "/login") {
      window.history.replaceState(null, "", "/login");
    }
    return "/login";
  });

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const allowed =
      path === "/login" ||
      (path === "/admin" && role === "admin") ||
      (path === "/user" && role === "user");
    if (allowed) return;
    const next = role ? panelPath(role) : "/login";
    window.history.replaceState(null, "", next);
    setPath(next);
  }, [path, role]);

  function handleSuccess(nextRole: Role) {
    const nextPath = panelPath(nextRole);
    window.history.pushState(null, "", nextPath);
    setRole(nextRole);
    setPath(nextPath);
  }

  if (path === "/admin" && role === "admin") return <Admin />;
  if (path === "/user" && role === "user") return <User />;
  return <Login onSuccess={handleSuccess} />;
}
