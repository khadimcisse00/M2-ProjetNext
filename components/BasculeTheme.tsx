"use client";

import { useEffect, useState } from "react";

export function BasculeTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stocke = window.localStorage.getItem("theme_tictactoe") as
      | "light"
      | "dark"
      | null;
    if (stocke) {
      setTheme(stocke);
      document.documentElement.setAttribute("data-theme", stocke);
    }
  }, []);

  function changerTheme() {
    const nouveau = theme === "light" ? "dark" : "light";
    setTheme(nouveau);
    document.documentElement.setAttribute("data-theme", nouveau);
    window.localStorage.setItem("theme_tictactoe", nouveau);
  }

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={changerTheme}
      />
      <svg
        className="swap-on fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64 17.36A9 9 0 0018 6a7 7 0 11-12.36 11.36z" />
      </svg>
      <svg
        className="swap-off fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5 12a7 7 0 1014 0 7 7 0 00-14 0zm7-9a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4 11a1 1 0 011 1H3a1 1 0 012 0zm16 0a1 1 0 011 1h-2a1 1 0 012 0zM6.22 5.22a1 1 0 011.42 0L9 6.59a1 1 0 01-1.42 1.42L6.22 6.64a1 1 0 010-1.42zm9.19 9.19a1 1 0 011.42 0L19 16.59a1 1 0 01-1.42 1.42l-2.17-2.17a1 1 0 010-1.42zM6.22 18.78a1 1 0 011.42 0L9.81 21a1 1 0 11-1.42 1.42L6.22 20.2a1 1 0 010-1.42zM16.59 7a1 1 0 011.42-1.42L20.2 7.78A1 1 0 0118.78 9.2z" />
      </svg>
    </label>
  );
}
