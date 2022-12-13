import React from "react";

export function Header() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Logo</h1>
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li style={{ padding: "10px" }}>Sign In</li>
        <li>Sign Out</li>
        <li>Sign Up</li>
      </ul>
    </div>
  );
}
