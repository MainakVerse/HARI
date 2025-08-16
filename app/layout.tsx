import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HARI | AI Human Resource",
  description:
    "Enterprise-grade AI Human Resource platform with LLM conversations, customizable agents, secure knowledge base, and Pay As You Go for businesses and government agencies.",
  keywords:
    "enterprise AI, secure AI, government AI solutions, LLM, knowledge base, AI agents, MCP server",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hariavtar.netlify.app",
    title: "HARI | Secure AI Solutions",
    description:
      "Enterprise-grade AI Human Resource platform with advanced security, customization, and control for businesses and government agencies.",
    siteName: "HARI",
    images: [
      {
        url: "https://hariavtar.netlify.app/peacock-feather.png",
        width: 1200,
        height: 630,
        alt: "HARI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HARI | Secure AI Solutions",
    description:
      "Enterprise-grade AI platform with advanced security, customization, and control.",
    images: ["https://your-domain.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico", // put favicon.ico inside public/
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optional, for iOS home screen
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
