import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PrivacyPolicyTemplate from "@/components/privacy-policy-template"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Enterprise AI Platform",
  description: "Our commitment to protecting your privacy and securing your data.",
}

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 select-none">Privacy Policy</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Your privacy is our priority. Learn how we protect and handle your data.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-200">
              <span className="text-sm">Last updated:</span>
              <span className="font-semibold">{currentDate}</span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="mb-8">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mb-6 hover:bg-blue-50 border-blue-200 bg-transparent"
              >
                <Link href="/" className="flex items-center gap-2 text-blue-600">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
              <PrivacyPolicyTemplate
                companyName="HARI"
                websiteUrl="https://hari.ai"
                contactEmail="privacy@hari.ai"
                contactAddress={`HARI AI, Inc.\n123 AI Boulevard\nTech City, CA 94000\nUnited States`}
                lastUpdated={currentDate}
                includeGDPR={true}
                includeCCPA={true}
                includeCookies={true}
                includeAnalytics={true}
                includeThirdPartyServices={["OpenAI", "Google Analytics", "AWS", "Microsoft Azure"]}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
