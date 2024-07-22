import React from "react";
import "../styles/globals.css";

console.log(React.version);

export const metadata = {
  title: "AI Event Assistant",
  description: "An AI-powered assistant for event planning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
