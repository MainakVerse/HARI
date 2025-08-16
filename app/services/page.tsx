import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    "Letter Generator",
    "Email Generator",
    "Policy Generator",
    "Operations Planner",
    "Admin Research Associate",
    "Resource Management System",
    "Attendance Management System",
    "Smart Payroll",
    "Leave Management System",
    "Recruitment & Application Tracking",
    "Onboarding Management",
    "Training and Development Moduler",
    "Benefits Management System",
    "Tax & Compliances Management",
    "Event Management System",
    "Offboarding Management",
    "Performance Improvement Programme Management",
    "Employee Health & Well-Being",
    "Analytics & Reporting",
    "Role-Based Access Control Manager",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI-powered solutions to streamline your business operations and enhance productivity.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="rounded-xl border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold leading-tight">{service}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                    {index === 0
                      ? "Generate professional letters with AI assistance for various business needs."
                      : "Advanced AI solution coming soon to enhance your workflow efficiency."}
                  </CardDescription>
                  {index === 0 ? (
                    <Button asChild className="w-full rounded-lg">
                      <Link href="/letter-generator">Explore</Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full rounded-lg" variant="secondary">
                     Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
