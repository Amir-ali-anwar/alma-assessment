// app/(public)/layout.tsx
import React from "react";


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
        <header>
          <div className="banner-sec">
              <h5>alma</h5>
              <p>Get An Assessment of your immigraion Case</p>
          </div>
        </header>
       <main>{children}</main>
      </body>
    </html>
  );
}
