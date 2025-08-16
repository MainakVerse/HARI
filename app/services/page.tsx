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

      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Comprehensive AI-powered solutions to streamline your business 
              operations and enhance productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="rounded-xl border-2 hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                <CardHeader className="pb-3 flex-shrink-0">
                  <CardTitle className="text-base md:text-lg font-semibold leading-tight">
                    {service}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <CardDescription className="text-sm text-muted-foreground mb-4 flex-1">
                    {index === 0
                      ? "Generate professional letters with AI assistance for various business needs."
                      : "Advanced AI solution coming soon to enhance your workflow efficiency."}
                  </CardDescription>
                  {index === 0 ? (
                    <Button asChild className="w-full rounded-lg mt-auto">
                      <Link href="/letter-generator">Explore</Link>
                    </Button>
                  ) : (
                    <Button 
                      disabled 
                      className="w-full rounded-lg mt-auto" 
                      variant="secondary"
                    >
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