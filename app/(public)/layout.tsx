// app/(public)/layout.tsx
import React from "react";
import Image from "next/image";
import styles from './public.module.scss'
export const metadata = {
  title: "Lead Submission | YourApp",
  description: "Submit your details for visa opportunities",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={`${styles["banner--sec"]}`}>
        </header>
       <main>{children}</main>
      </body>
    </html>
  );
}
