'use client'

// components/advanced-letter-generation.tsx
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sparkles, AlertCircle, Trash2, RefreshCw, Download, X, FileText
} from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import RichTextEditor from "@/components/rich-text-editor"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import letterTemplates from "../data/letterTemplates.json"

interface Template {
  id: string
  title: string
  length: string
  prompt: string
}

interface SectionContent {
  id: string
  title: string
  content: string
  timestamp: string
  isGenerating?: boolean
}

// Letter sections mapping
const letterSections: Record<string, string[]> = {
  "cover-letter": [
    "Header & Contact Information",
    "Salutation",
    "Opening Paragraph",
    "Professional Experience",
    "Skills & Qualifications", 
    "Company Knowledge",
    "Closing Paragraph",
    "Professional Sign-off"
  ],
  "resignation-letter": [
    "Header & Date",
    "Formal Salutation",
    "Resignation Statement",
    "Last Working Day",
    "Reason for Leaving",
    "Transition Assistance",
    "Gratitude & Appreciation",
    "Professional Closing"
  ],
  "recommendation-letter": [
    "Header & Credentials",
    "Introduction & Relationship",
    "Professional Qualities",
    "Specific Examples",
    "Skills Assessment",
    "Character Reference",
    "Strong Recommendation",
    "Contact Information"
  ],
  "complaint-letter": [
    "Header & Date",
    "Recipient Information",
    "Subject Line",
    "Issue Description",
    "Impact Statement",
    "Supporting Evidence",
    "Desired Resolution",
    "Professional Closing"
  ],
  "thank-you-letter": [
    "Header & Date",
    "Personal Salutation",
    "Expression of Gratitude",
    "Specific Details",
    "Impact Statement",
    "Future Relationship",
    "Warm Closing",
    "Signature"
  ],
  "business-proposal": [
    "Executive Summary",
    "Problem Statement",
    "Proposed Solution",
    "Benefits & Value",
    "Implementation Plan",
    "Budget & Timeline",
    "Call to Action",
    "Contact Details"
  ],
  "follow-up-letter": [
    "Header & Reference",
    "Purpose Statement",
    "Previous Interaction",
    "Additional Information",
    "Value Proposition",
    "Next Steps",
    "Professional Closing",
    "Contact Information"
  ]
}

// Custom hook for localStorage operations
const useLocalStorage = () => {
  const saveToStorage = (key: string, value: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  const loadFromStorage = (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
    return null
  }

  const removeFromStorage = (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }

  return { saveToStorage, loadFromStorage, removeFromStorage }
}

// Section Selection Component
const SectionSelection = ({ 
  selectedTemplate, 
  onSectionSelect,
  generatingSections
}: {
  selectedTemplate: string | null
  onSectionSelect: (section: string) => void
  generatingSections: Set<string>
}) => {
  if (!selectedTemplate || !letterSections[selectedTemplate]) return null

  const sections = letterSections[selectedTemplate]

  return (
    <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="dark:text-cyan-100 text-sm flex items-center gap-2">
          <FileText className="h-4 w-4 text-cyan-400" />
          Select Section to Generate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {sections.map((section) => (
            <Button
              key={section}
              onClick={() => onSectionSelect(section)}
              disabled={generatingSections.has(section)}
              variant="outline"
              size="sm"
              className="dark:bg-black/50 border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20 text-xs h-auto py-3 px-3 text-left justify-start disabled:opacity-50"
            >
              {generatingSections.has(section) ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-cyan-300 border-t-transparent" />
                  <span className="truncate">Generating...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{section}</span>
                </>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Section Content Box Component
const SectionContentBox = ({
  section,
  onRegenerate,
  onDelete,
  onContentChange
}: {
  section: SectionContent
  onRegenerate: (sectionId: string) => void
  onDelete: (sectionId: string) => void
  onContentChange: (sectionId: string, content: string) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
      <CardHeader className="border-b border-cyan-500/20 pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="dark:text-cyan-100 text-base font-medium">
              {section.title}
            </CardTitle>
            <p className="text-xs text-cyan-400/60 mt-1">
              Generated at {new Date(section.timestamp).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              onClick={() => onRegenerate(section.id)}
              disabled={section.isGenerating}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20"
              title="Regenerate content"
            >
              {section.isGenerating ? (
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-cyan-300 border-t-transparent" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
            </Button>
            <Button
              onClick={() => onDelete(section.id)}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
              title="Delete section"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-white/95 rounded-lg p-4 border border-cyan-500/20 min-h-[120px]">
          <RichTextEditor 
            content={section.content} 
            isEditable={true}
            onContentChange={(content) => onContentChange(section.id, content)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdvancedLetterGeneration() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [sectionContents, setSectionContents] = useState<SectionContent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [generatingSections, setGeneratingSections] = useState<Set<string>>(new Set())

  const { saveToStorage, loadFromStorage, removeFromStorage } = useLocalStorage()

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSectionContents = loadFromStorage("advancedSectionContents")
    const savedSelectedTemplate = loadFromStorage("advancedSelectedTemplate")

    if (savedSectionContents) setSectionContents(savedSectionContents)
    if (savedSelectedTemplate) setSelectedTemplateId(savedSelectedTemplate)
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    saveToStorage("advancedSectionContents", sectionContents)
  }, [sectionContents])

  useEffect(() => {
    saveToStorage("advancedSelectedTemplate", selectedTemplateId)
  }, [selectedTemplateId])

  const generateSectionContent = async (sectionTitle: string, sectionId?: string) => {
    if (!selectedTemplateId) return

    // Add to generating sections
    setGeneratingSections(prev => new Set([...prev, sectionTitle]))

    // Update existing section to show loading state
    if (sectionId) {
      setSectionContents(prev => 
        prev.map(section => 
          section.id === sectionId 
            ? { ...section, isGenerating: true }
            : section
        )
      )
    }

    try {
      const template = letterTemplates.find(t => t.id === selectedTemplateId)
      const requestBody = {
        type: selectedTemplateId,
        section: sectionTitle,
        templateTitle: template?.title || "Letter"
      }

      const response = await fetch("/api/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.content) {
        throw new Error("No content received from server")
      }

      const timestamp = new Date().toISOString()

      if (sectionId) {
        // Update existing section
        setSectionContents(prev => 
          prev.map(section => 
            section.id === sectionId 
              ? { 
                  ...section, 
                  content: data.content, 
                  timestamp,
                  isGenerating: false 
                }
              : section
          )
        )
      } else {
        // Create new section
        const newSection: SectionContent = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: sectionTitle,
          content: data.content,
          timestamp
        }

        setSectionContents(prev => [...prev, newSection])
      }

    } catch (err: any) {
      setError(err.message || "An error occurred while generating the section")
      
      // Remove loading state on error
      if (sectionId) {
        setSectionContents(prev => 
          prev.map(section => 
            section.id === sectionId 
              ? { ...section, isGenerating: false }
              : section
          )
        )
      }
    } finally {
      // Remove from generating sections
      setGeneratingSections(prev => {
        const newSet = new Set(prev)
        newSet.delete(sectionTitle)
        return newSet
      })
    }
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplateId(template.id)
    setError(null)
    // Clear existing sections when template changes
    setSectionContents([])
  }

  const handleSectionSelect = (sectionTitle: string) => {
    generateSectionContent(sectionTitle)
  }

  const handleSectionRegenerate = (sectionId: string) => {
    const section = sectionContents.find(s => s.id === sectionId)
    if (section) {
      generateSectionContent(section.title, sectionId)
    }
  }

  const handleSectionDelete = (sectionId: string) => {
    setSectionContents(prev => prev.filter(section => section.id !== sectionId))
  }

  const handleSectionContentChange = (sectionId: string, content: string) => {
    setSectionContents(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content, timestamp: new Date().toISOString() }
          : section
      )
    )
  }

  const downloadAsPDF = async () => {
    if (sectionContents.length === 0) return

    setIsDownloading(true)
    try {
      const element = document.createElement("div")
      
      // Combine all sections
      let combinedContent = `<h1 style="text-align: center; margin-bottom: 30px; color: #333;">${letterTemplates.find(t => t.id === selectedTemplateId)?.title || 'Letter'}</h1>`
      
      sectionContents.forEach(section => {
        combinedContent += `<div style="margin-bottom: 25px;">`
        combinedContent += `<h3 style="margin-bottom: 10px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${section.title}</h3>`
        combinedContent += section.content
        combinedContent += `</div>`
      })
      
      element.innerHTML = combinedContent
      Object.assign(element.style, {
        padding: "40px",
        fontFamily: "Times New Roman, serif",
        lineHeight: "1.6",
        color: "#333",
        width: "800px",
        backgroundColor: "white"
      })
      document.body.appendChild(element)

      const canvas = await html2canvas(element, { scale: 2, backgroundColor: "white" })
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("p", "mm", "a4")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      let heightLeft = pdfHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
      heightLeft -= pdf.internal.pageSize.getHeight()

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
        heightLeft -= pdf.internal.pageSize.getHeight()
      }

      const templateName = letterTemplates.find(t => t.id === selectedTemplateId)?.title || 'letter'
      pdf.save(`${templateName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split("T")[0]}.pdf`)
      document.body.removeChild(element)
    } catch (err: any) {
      setError(err.message || "Failed to download PDF")
    } finally {
      setIsDownloading(false)
    }
  }

  const deleteAllSections = () => {
    setSectionContents([])
    setSelectedTemplateId(null)
    removeFromStorage("advancedSectionContents")
    removeFromStorage("advancedSelectedTemplate")
  }

  // Template Dropdown Component
  const TemplateDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20 w-full sm:w-auto"
        >
          {selectedTemplateId 
            ? letterTemplates.find(t => t.id === selectedTemplateId)?.title 
            : "Choose Letter Template"
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-black border-cyan-500/30 text-blue-500 max-h-64 overflow-y-auto w-80">
        {letterTemplates.map((template: Template) => (
          <DropdownMenuItem
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className="cursor-pointer hover:bg-cyan-500/20"
          >
            <div>
              <div className="font-medium">{template.title}</div>
              <div className="text-xs dark:text-cyan-400">{template.length}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-6">
        {/* Header Section */}
        <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="dark:text-white flex items-center gap-2 text-xl">
                <Sparkles className="h-6 w-6 dark:text-cyan-400" />
                Advanced Letter Generation
              </CardTitle>
              
              {sectionContents.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={downloadAsPDF}
                    disabled={isDownloading}
                    variant="outline"
                    size="sm"
                    className="bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30"
                  >
                    {isDownloading ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-green-300 border-t-transparent mr-2" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Download PDF
                  </Button>
                  
                  <Button
                    onClick={deleteAllSections}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Delete All
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-1">
                  <TemplateDropdown />
                  {selectedTemplateId && (
                    <p className="text-xs text-cyan-400/70 mt-2">
                      Selected: {letterTemplates.find(t => t.id === selectedTemplateId)?.title}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section Selection */}
        <SectionSelection
          selectedTemplate={selectedTemplateId}
          onSectionSelect={handleSectionSelect}
          generatingSections={generatingSections}
        />

        {/* Generated Sections */}
        {sectionContents.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold dark:text-cyan-100">
                Generated Sections ({sectionContents.length})
              </h3>
            </div>
            
            {sectionContents.map((section) => (
              <SectionContentBox
                key={section.id}
                section={section}
                onRegenerate={handleSectionRegenerate}
                onDelete={handleSectionDelete}
                onContentChange={handleSectionContentChange}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!selectedTemplateId && (
          <Card className="dark:bg-black/50 backdrop-blur-sm border-cyan-500/20 shadow-lg">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-cyan-400/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium dark:text-cyan-200 mb-2">
                Get Started
              </h3>
              <p className="text-cyan-400/70 text-sm">
                Choose a letter template above to begin generating sections
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}