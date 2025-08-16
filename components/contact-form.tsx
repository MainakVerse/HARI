"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your inquiry has been received. Our enterprise team will contact you shortly to discuss your specific
            requirements.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>Submit Another Inquiry</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Our Enterprise Team</CardTitle>
        <CardDescription>
          Fill out the form below to discuss your organization's needs and receive a custom quote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="john.doe@company.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company/Organization</Label>
            <Input id="company" placeholder="Acme Inc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Your Role</Label>
            <Input id="role" placeholder="CTO, IT Director, etc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Organization Size</Label>
            <Select>
              <SelectTrigger id="size">
                <SelectValue placeholder="Select organization size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1001+">1001+ employees</SelectItem>
                <SelectItem value="government">Government Agency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">How can we help?</Label>
            <Textarea id="message" placeholder="Tell us about your specific requirements and use cases..." rows={4} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Information"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
