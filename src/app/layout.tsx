import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Codingship Labs",
  description: "Neurohub of AI services and experiments.",
  openGraph: {
    title: "Codingship Labs",
    description: "Discover and run AI experiments inside one interface.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
