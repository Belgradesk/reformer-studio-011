import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { ClientShell } from "@/components/ClientShell";
import { isLocale } from "@/lib/i18n";
import { BASE_URL } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // fallback samo za rute bez svog generateMetadata (npr. 404)
  title: "Reformer Studio 011",
  description:
    "Reformer pilates studio u Beogradu. Treninzi u malim grupama i individualno.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const langHeader = (await headers()).get("x-lang");
  const lang = isLocale(langHeader) ? langHeader : "sr";

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
