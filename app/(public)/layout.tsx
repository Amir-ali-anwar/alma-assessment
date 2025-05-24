import React from "react";
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
       <main>{children}</main>
      </body>
    </html>
  );
}
