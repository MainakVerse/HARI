// app/api/generate-section/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { type, section, templateTitle } = await request.json()

    // Mock AI response - replace with your actual AI service
    const generateMockContent = (letterType: string, sectionName: string) => {
      const mockContents: Record<string, Record<string, string>> = {
        "cover-letter": {
          "Header & Contact Information": `
            <div style="text-align: center; margin-bottom: 20px;">
              <h2>John Doe</h2>
              <p>123 Main Street, City, State 12345<br>
              Phone: (555) 123-4567 | Email: john.doe@email.com<br>
              LinkedIn: linkedin.com/in/johndoe</p>
            </div>
          `,
          "Salutation": `<p>Dear Hiring Manager,</p>`,
          "Opening Paragraph": `
            <p>I am writing to express my strong interest in the [Position Title] role at [Company Name]. 
            With my background in [relevant field] and passion for [industry/company mission], 
            I am excited about the opportunity to contribute to your team's continued success.</p>
          `,
          "Professional Experience": `
            <p>In my previous role as [Previous Position] at [Previous Company], I successfully [specific achievement]. 
            This experience has equipped me with [relevant skills] and a deep understanding of [relevant area]. 
            I have consistently [another achievement] and demonstrated my ability to [relevant capability].</p>
          `,
          "Skills & Qualifications": `
            <p>My key qualifications include:</p>
            <ul>
              <li>[Relevant skill 1] with [number] years of experience</li>
              <li>Proficiency in [relevant tools/technologies]</li>
              <li>[Relevant certification or achievement]</li>
              <li>Strong [soft skill] and [another soft skill] abilities</li>
            </ul>
          `,
          "Company Knowledge": `
            <p>I am particularly drawn to [Company Name] because of [specific reason related to company]. 
            Your recent [company achievement/news] aligns perfectly with my professional values and career goals. 
            I am excited about the possibility of contributing to [specific company initiative or goal].</p>
          `,
          "Closing Paragraph": `
            <p>I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to [Company Name]'s continued success. 
            Thank you for considering my application. I look forward to hearing from you soon.</p>
          `,
          "Professional Sign-off": `
            <p>Sincerely,<br><br>
            John Doe</p>
          `
        },
        "resignation-letter": {
          "Header & Date": `
            <div style="margin-bottom: 20px;">
              <p>[Your Name]<br>
              [Your Address]<br>
              [City, State, ZIP Code]<br>
              [Email Address]<br>
              [Phone Number]</p>
              <p style="margin-top: 20px;">[Date]</p>
            </div>
          `,
          "Formal Salutation": `<p>Dear [Manager's Name],</p>`,
          "Resignation Statement": `
            <p>I am writing to formally notify you of my resignation from my position as [Your Job Title] 
            at [Company Name]. This decision was not made lightly, and I have given it considerable thought.</p>
          `,
          "Last Working Day": `
            <p>My last day of employment will be [Date], providing [number] weeks' notice as per 
            company policy. I am committed to ensuring a smooth transition during this period.</p>
          `,
          "Reason for Leaving": `
            <p>I have accepted a position that will allow me to [brief reason - career growth, 
            new challenges, etc.]. This opportunity aligns with my long-term career objectives.</p>
          `,
          "Transition Assistance": `
            <p>I am committed to completing my current projects and will work diligently to 
            transfer my responsibilities. I am happy to assist in training my replacement 
            and documenting any ongoing processes.</p>
          `,
          "Gratitude & Appreciation": `
            <p>I want to express my sincere gratitude for the opportunities for professional 
            and personal growth during my time here. I have enjoyed working with the team 
            and appreciate the support provided to me.</p>
          `,
          "Professional Closing": `
            <p>Thank you for your understanding. I wish you and the company continued success.</p>
            <p>Respectfully,<br><br>
            [Your Signature]<br>
            [Your Printed Name]</p>
          `
        }
        // Add more letter types as needed
      }

      return mockContents[letterType]?.[sectionName] || 
        `<p>This is AI-generated content for the <strong>${sectionName}</strong> section of your ${templateTitle}.</p>
         <p>This section would contain relevant, professional content tailored to your specific needs.</p>`
    }

    const content = generateMockContent(type, section)

    return NextResponse.json({
      content,
      section,
      type
    })

  } catch (error) {
    console.error('Error generating section:', error)
    return NextResponse.json(
      { error: 'Failed to generate section content' },
      { status: 500 }
    )
  }
}