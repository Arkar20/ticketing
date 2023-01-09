import React from "react";
import Link from "next/link";
export function Header({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign In", href: "/signin" },
    !currentUser && { label: "Sign Up", href: "/signup" },
    currentUser && { label: "Sign Out", href: "/signout" },
  ]
    .filter((link) => link)
    .map((link, index) => (
      <li key={index} style={{ padding: "10px" }}>
        <Link href={link.href}>{link.label}</Link>
      </li>
    ));
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Logo</h1>
      <ul style={{ display: "flex", listStyle: "none" }}>{links}</ul>
    </div>
  );
}
