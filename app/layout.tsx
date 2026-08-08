import type { Metadata, Viewport } from "next";
import { Archivo, Barlow } from "next/font/google";
import { siteUrl } from "./site";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Zed's Industrial Builders Corporation | Hardware Tools & Equipment Trading",
  description:
    "Zed's Industrial Builders Corporation is a hardware tools and equipment trading company in Quezon City, Philippines. Authorized importer and supplier of construction and industrial supplies since 2020.",
  keywords: [
    "hardware",
    "tools",
    "equipment",
    "construction",
    "industrial",
    "Quezon City",
    "Philippines",
    "welding",
    "electrical supplies",
  ],
  openGraph: {
    title: "Zed's Industrial Builders Corporation",
    description:
      "Hardware tools and equipment trading. Authorized importer & supplier of construction and industrial supplies.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffd000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-white">{children}</body>
    </html>
  );
}
