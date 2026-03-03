// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tier Maker",
  description: "Drag and drop characters into tiers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <main className="appMain">{children}</main>

        <footer className="appFooter">
          <div className="container muted">Built with Next.js + Supabase</div>
        </footer>
      </body>
    </html>
  );
}
