import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "SpeakRush - Aprende inglés jugando",
    template: "%s | SpeakRush",
  },
  description: "Plataforma interactiva de aprendizaje de inglés para niños. ¡Juega y aprende!",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  // SEO improvements (seo skill)
  keywords: ["inglés", "niños", "juegos educativos", "aprender inglés", "vocabulario", "gramática"],
  authors: [{ name: "SpeakRush" }],
  openGraph: {
    title: "SpeakRush - Aprende inglés jugando",
    description: "Plataforma interactiva de aprendizaje de inglés para niños",
    url: "https://speakrush.com",
    siteName: "SpeakRush",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeakRush - Aprende inglés jugando",
    description: "Plataforma interactiva de aprendizaje de inglés para niños",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SpeakRush",
  },
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SpeakRush",
    "description": "Plataforma interactiva de aprendizaje de inglés para niños",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": "es"
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background-light dark:bg-background-dark text-gray-900 dark:text-white min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
