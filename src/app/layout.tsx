import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will Smerdon - Revenue Accounting Leader",
  description:
    "Revenue accounting leader building finance operations at Cursor. Previously at Stripe and Fivetran. Based in Seattle.",
  keywords: [
    "Will Smerdon",
    "Revenue Accounting",
    "Cursor",
    "Stripe",
    "Fivetran",
    "Finance",
    "SaaS",
  ],
  openGraph: {
    title: "Will Smerdon - Revenue Accounting Leader",
    description:
      "Revenue accounting leader building finance operations at Cursor. Previously at Stripe and Fivetran.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
