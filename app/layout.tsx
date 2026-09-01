import type { Metadata, Viewport } from "next";
import { Archivo, Barlow } from "next/font/google";
import { company } from "./data";
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.fullName,
  alternateName: ["Zeds Builders", "Zed's Tools Depot"],
  legalName: company.fullName,
  url: siteUrl(),
  logo: `${siteUrl()}/logo/logo.jpg`,
  email: company.email,
  telephone: company.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lot 31 Block 29 Congressional, Model Subdivision Barangay 178",
    addressLocality: "Caloocan City",
    addressRegion: "National Capital Region",
    postalCode: "1400",
    addressCountry: "PH",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title:
    "Zed's Industrial Builders Corporation (Zeds Builders) | Hardware Tools & Equipment Trading",
  description:
    "Zed's Industrial Builders Corporation, also known as Zeds Builders, is a hardware tools and equipment trading company in Caloocan City, Philippines. Authorized importer and supplier of construction and industrial supplies since 2020.",
  keywords: [
    "Zeds Builders",
    "Zed's Industrial Builders Corporation",
    "Zed's Tools Depot",
    "hardware",
    "tools",
    "equipment",
    "construction",
    "industrial",
    "Caloocan City",
    "Philippines",
    "welding",
    "electrical supplies",
  ],
  verification: {
    google: "Lld2b-LyQwDhW60B1yZ1cK8UShmL_Bml_RM9p0Do7N0",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zed's Industrial Builders Corporation (Zeds Builders)",
    description:
      "Zeds Builders: hardware tools and equipment trading. Authorized importer & supplier of construction and industrial supplies.",
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
      <body className="min-h-full flex flex-col bg-bg text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
