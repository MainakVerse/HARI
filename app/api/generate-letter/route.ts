import { NextResponse } from "next/server"
import prompts from "@/data/letterTemplates.json"

interface LetterTemplate {
  id: string
  title: string
  length: string
  prompt: string
}

interface GenerateRequest {
  type: string
  variables?: Record<string, string>
  customPrompt?: string
}

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json()
    console.log("📩 Incoming request body:", body)

    let finalPrompt = ""

    if (body.type === "custom" && body.customPrompt) {
      finalPrompt = body.customPrompt
    } else if (body.type && body.variables) {
      const template: LetterTemplate | undefined = prompts.find(
        (p) => p.id === body.type
      )
      if (!template) {
        return NextResponse.json(
          { error: "Invalid letter type" },
          { status: 400 }
        )
      }

      finalPrompt = template.prompt
      for (const [key, value] of Object.entries(body.variables)) {
        const regex = new RegExp(`\\[${key}\\]`, "gi")
        finalPrompt = finalPrompt.replace(regex, value || "")
      }
    } else {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    if (!finalPrompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is empty after processing" },
        { status: 400 }
      )
    }

    console.log("📝 Final prompt sent to Gemini:", finalPrompt)

    const systemInstruction = `
You are an HR assistant. Generate a professional business letter in clean HTML.
Use <p>, <h1>-<h3>, <ul>, <ol>, <li>, <strong>, <em> tags.
Do NOT use markdown (**bold**, --, or |).
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: systemInstruction },
                { text: finalPrompt }
              ]
            }
          ]
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("❌ Gemini API error:", error)
      return NextResponse.json({ error }, { status: response.status })
    }

    const data = await response.json()
    console.log("✅ Gemini response:", data)

    const generatedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ AI did not return any text."

    return NextResponse.json({
      type: body.type === "custom" ? "Custom Prompt" : body.type,
      length: "1 page",
      content: generatedText,
    })
  } catch (error: any) {
    console.error("❌ Server error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}