"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, History, AlertCircle, Edit3, Undo2, Redo2, Save, Clock, Download, Menu, X } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

// Add this helper to check if code is running on client
const isClient = typeof window !== 'undefined'

// Rich text editor component with proper theming
function RichTextEditor({ 
  content, 
  isEditable = false, 
  onContentChange
}: { 
  content: string
  isEditable?: boolean
  onContentChange?: (content: string) => void
}) {
  const [editorContent, setEditorContent] = useState(content)

  useEffect(() => {
    setEditorContent(content)
  }, [content])

  const handleChange = (value: string) => {
    setEditorContent(value)
    if (onContentChange) {
      onContentChange(value)
    }
  }

  // Clean content for display (remove markdown symbols)
  const cleanContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/#{1,6}\s*(.*?)$/gm, '<h3>$1</h3>') // Headers
      .replace(/^\s*[-*+]\s+(.*?)$/gm, '<li>$1</li>') // List items
      .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>') // Wrap lists
      .replace(/\|/g, '') // Remove table separators
      .replace(/--/g, '—') // Replace double dashes with em dash
      .replace(/\n\n/g, '</p><p>') // Paragraphs
      .replace(/^(.*)$/gm, '<p>$1</p>') // Wrap remaining lines
      .replace(/<p><\/p>/g, '') // Remove empty paragraphs
      .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1') // Fix headers in paragraphs
      .replace(/<p>(<ul>[\s\S]*?<\/ul>)<\/p>/g, '$1') // Fix lists in paragraphs
  }

  const modules = {
    toolbar: isEditable ? [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ] : false,
  }

  const formats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link'
  ]

  if (isEditable) {
    return (
      <div className="min-h-64 md:min-h-96">
        <style jsx global>{`
          .ql-editor {
            background-color: #ffffff !important;
            color: #1f2937 !important;
            font-family: 'Times New Roman', serif !important;
            line-height: 1.6 !important;
            font-size: 16px !important;
          }
          .ql-toolbar {
            background-color: #f9fafb !important;
            border-color: rgba(6, 182, 212, 0.3) !important;
            border-bottom: 1px solid rgba(6, 182, 212, 0.3) !important;
          }
          .ql-container {
            border-color: rgba(6, 182, 212, 0.3) !important;
            background-color: #ffffff !important;
          }
          .ql-toolbar .ql-stroke {
            stroke: #374151 !important;
          }
          .ql-toolbar .ql-fill {
            fill: #374151 !important;
          }
          .ql-toolbar button:hover {
            background-color: rgba(6, 182, 212, 0.1) !important;
          }
          .ql-toolbar button.ql-active {
            background-color: rgba(6, 182, 212, 0.2) !important;
          }
        `}</style>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="bg-white rounded-lg overflow-hidden"
        />
      </div>
    )
  }

  return (
    <div 
      className="prose prose-sm md:prose-lg max-w-none font-serif text-gray-900 leading-relaxed"
      style={{
        color: '#1f2937',
        fontSize: '16px',
        lineHeight: '1.6'
      }}
      dangerouslySetInnerHTML={{ __html: cleanContent(content) }}
    />
  )
}

// Version history sidebar component with proper theming
function VersionHistory({
  versions,
  currentVersionIndex,
  onVersionSelect,
  onSaveVersion,
  isVisible,
  onClose
}: {
  versions: DocumentVersion[]
  currentVersionIndex: number
  onVersionSelect: (index: number) => void
  onSaveVersion: () => void
  isVisible: boolean
  onClose?: () => void
}) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto">
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden" 
        onClick={onClose}
      />
      
      <Card className="fixed right-0 top-0 h-full w-80 max-w-[90vw] lg:relative lg:w-full lg:h-auto bg-black/80 backdrop-blur-sm border-cyan-500/30 shadow-xl">
        <CardHeader className="border-b border-cyan-500/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-cyan-100 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Version History ({versions.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={onSaveVersion}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              {onClose && (
                <Button
                  onClick={onClose}
                  size="sm"
                  variant="ghost"
                  className="lg:hidden text-cyan-300 hover:bg-cyan-500/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 max-h-96 lg:max-h-96 overflow-y-auto">
          {versions.length > 0 ? (
            <div className="space-y-2">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    index === currentVersionIndex
                      ? 'bg-cyan-500/20 border-cyan-400/50 ring-1 ring-cyan-400/30'
                      : 'bg-black/40 border-cyan-500/20 hover:bg-cyan-500/10'
                  }`}
                  onClick={() => onVersionSelect(index)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-cyan-100">
                      {version.name}
                      {index === currentVersionIndex && (
                        <span className="ml-2 text-xs bg-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded">
                          Current
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-cyan-400/70">
                      {new Date(version.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {version.description && (
                    <p className="text-xs text-cyan-300/70 mb-2">{version.description}</p>
                  )}
                  <p className="text-xs text-cyan-400/60 line-clamp-2">
                    {version.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 text-cyan-400/30 mx-auto mb-2" />
              <p className="text-cyan-400/60 text-sm">No versions saved yet</p>
              <p className="text-cyan-400/40 text-xs mt-1">Generate content to create your first version</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ✅ Dropdown from shadcn/ui
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// ✅ Import your JSON file with templates
import letterTemplates from "../../data/letterTemplates.json"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Template {
  id: string
  title: string
  length: string
  prompt: string
}

interface GeneratedLetter {
  type: string
  length: string
  content: string
  timestamp: string
}

interface DocumentVersion {
  id: string
  name: string
  content: string
  timestamp: string
  description?: string
}

export default function LetterGeneratorPage() {
  const [title, setTitle] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [history, setHistory] = useState<GeneratedLetter[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  
  // New states for editing functionality
  const [isEditing, setIsEditing] = useState(false)

  // Version control states
  const [versions, setVersions] = useState<DocumentVersion[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // PDF download state
  const [isDownloading, setIsDownloading] = useState(false)

  // Mobile responsive states
  const [showMobileHistory, setShowMobileHistory] = useState(false)

  // ✅ Fixed localStorage loading with proper error handling
  useEffect(() => {
    if (isClient) {
      try {
        const savedHistory = localStorage.getItem("letterHistory")
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory)
          setHistory(parsedHistory)
        }
        
        const savedVersions = localStorage.getItem("documentVersions")
        if (savedVersions) {
          const parsedVersions = JSON.parse(savedVersions)
          setVersions(parsedVersions)
        }

        const savedGeneratedText = localStorage.getItem("currentGeneratedText")
        if (savedGeneratedText) {
          setGeneratedText(savedGeneratedText)
        }

        const savedCurrentVersionIndex = localStorage.getItem("currentVersionIndex")
        if (savedCurrentVersionIndex) {
          setCurrentVersionIndex(parseInt(savedCurrentVersionIndex))
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error)
      }
    }
  }, [isClient])

  // ✅ Save history to localStorage when it changes
  useEffect(() => {
    if (isClient) {
      try {
        if (history.length > 0) {
          localStorage.setItem("letterHistory", JSON.stringify(history))
        }
      } catch (error) {
        console.error("Error saving history to localStorage:", error)
      }
    }
  }, [history, isClient])

  // Save versions to localStorage
  useEffect(() => {
    if (isClient) {
      try {
        if (versions.length > 0) {
          localStorage.setItem("documentVersions", JSON.stringify(versions))
        }
      } catch (error) {
        console.error("Error saving versions to localStorage:", error)
      }
    }
  }, [versions, isClient])

  // Save current generated text
  useEffect(() => {
    if (isClient) {
      try {
        if (generatedText) {
          localStorage.setItem("currentGeneratedText", generatedText)
        }
      } catch (error) {
        console.error("Error saving generated text to localStorage:", error)
      }
    }
  }, [generatedText, isClient])

  // Save current version index
  useEffect(() => {
    if (isClient) {
      try {
        if (currentVersionIndex >= 0) {
          localStorage.setItem("currentVersionIndex", currentVersionIndex.toString())
        }
      } catch (error) {
        console.error("Error saving version index to localStorage:", error)
      }
    }
  }, [currentVersionIndex, isClient])

  // Track unsaved changes
  useEffect(() => {
    if (versions.length > 0 && currentVersionIndex >= 0) {
      const currentVersion = versions[currentVersionIndex]
      setHasUnsavedChanges(currentVersion.content !== generatedText)
    }
  }, [generatedText, versions, currentVersionIndex])

  // Extract variables from prompt
  const extractVariables = (templatePrompt: string): string[] => {
    const matches = templatePrompt.match(/\[([^\]]+)\]/g)
    if (!matches) return []
    return matches.map(match => match.slice(1, -1))
  }

  // Create variables object with default values
  const createVariablesObject = (templatePrompt: string): Record<string, string> => {
    const variables = extractVariables(templatePrompt)
    const variablesObj: Record<string, string> = {}

    variables.forEach(variable => {
      switch (variable.toLowerCase()) {
        case "company name":
          variablesObj[variable] = "Acme Corporation"
          break
        case "position":
          variablesObj[variable] = "Software Developer"
          break
        case "candidate name":
          variablesObj[variable] = "John Doe"
          break
        case "your name":
          variablesObj[variable] = "Jane Smith"
          break
        default:
          variablesObj[variable] = `[${variable}]` // placeholder
      }
    })

    return variablesObj
  }

  // Improved version creation with better naming
  const createNewVersion = (content: string, name?: string, description?: string) => {
    if (!isClient) return

    const timestamp = new Date()
    const timeString = timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    // Generate a better default name if none provided
    const defaultName = name || `Version ${versions.length + 1}`
    const versionName = versions.length === 0 ? "Initial Version" : defaultName
    
    const newVersion: DocumentVersion = {
      id: `${timestamp.getTime()}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID
      name: versionName,
      content,
      timestamp: timestamp.toISOString(),
      description: description || `Created at ${timeString}`
    }

    setVersions(prev => {
      // Prevent duplicate versions with same content
      const isDuplicate = prev.some(v => v.content === content)
      if (isDuplicate && prev.length > 0) {
        return prev
      }
      return [newVersion, ...prev]
    })
    setCurrentVersionIndex(0)
    setHasUnsavedChanges(false)
    return newVersion
  }

  // Clean generated content
  const cleanGeneratedContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/#{1,6}\s*(.*?)$/gm, '<h3>$1</h3>') // Headers
      .replace(/^\s*[-*+]\s+(.*?)$/gm, '• $1') // List items
      .replace(/\|/g, '') // Remove table separators
      .replace(/--/g, '—') // Replace double dashes with em dash
      .replace(/\n\n/g, '</p><p>') // Paragraphs
      .replace(/^(.*)$/gm, '<p>$1</p>') // Wrap lines in paragraphs
      .replace(/<p><\/p>/g, '') // Remove empty paragraphs
      .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1') // Fix headers
  }

  const generateLetter = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      let requestBody: any

      if (selectedTemplateId) {
        const template = letterTemplates.find((t) => t.id === selectedTemplateId)
        if (template) {
          const variables = createVariablesObject(template.prompt)
          requestBody = {
            type: selectedTemplateId,
            variables,
          }
        } else {
          throw new Error("Template not found")
        }
      } else {
        requestBody = {
          type: "custom",
          customPrompt: prompt,
        }
      }

      console.log("📤 Sending request body:", requestBody)

      const response = await fetch("/api/generate-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API Error Response:", errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("✅ API Response:", data)

      if (!data.content) {
        throw new Error("No content received from server")
      }

      setGeneratedText(data.content)

      // Create version with better naming
      const templateName = selectedTemplateId 
        ? letterTemplates.find(t => t.id === selectedTemplateId)?.title 
        : "Custom Prompt"
      
      createNewVersion(
        data.content,
        templateName || "Generated Letter",
        "AI-generated content"
      )

      // Save to history
      const newHistoryItem: GeneratedLetter = {
        type: data.type || "custom",
        length: data.length || "unknown",
        content: data.content,
        timestamp: new Date().toISOString(),
      }

      setHistory((prev) => [newHistoryItem, ...prev].slice(0, 5))
    } catch (err: any) {
      console.error("❌ Generation error:", err)
      setError(err.message || "An error occurred while generating the letter")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTemplateSelect = (template: Template) => {
    setPrompt(template.prompt)
    setSelectedTemplateId(template.id)
    setError(null)
  }

  const handlePromptChange = (value: string) => {
    setPrompt(value)
    setSelectedTemplateId(null)
    setError(null)
  }

  const handleContentChange = (newContent: string) => {
    setGeneratedText(newContent)
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleUndo = () => {
    if (currentVersionIndex < versions.length - 1) {
      const newIndex = currentVersionIndex + 1
      setCurrentVersionIndex(newIndex)
      setGeneratedText(versions[newIndex].content)
    }
  }

  const handleRedo = () => {
    if (currentVersionIndex > 0) {
      const newIndex = currentVersionIndex - 1
      setCurrentVersionIndex(newIndex)
      setGeneratedText(versions[newIndex].content)
    }
  }

  // Update the save version handler
  const handleSaveVersion = () => {
    if (!isClient) return

    const timestamp = new Date()
    const timeString = timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    const versionName = hasUnsavedChanges 
      ? `Edited Version (${timeString})`
      : `Saved Version (${timeString})`
    
    const description = hasUnsavedChanges 
      ? "Manual edits applied" 
      : "Current state saved"
    
    createNewVersion(generatedText, versionName, description)
  }

  const handleVersionSelect = (index: number) => {
    setCurrentVersionIndex(index)
    setGeneratedText(versions[index].content)
  }

  // Update history click handler to avoid duplicate versions
  const handleHistoryItemClick = (item: GeneratedLetter) => {
    setGeneratedText(item.content)
    
    // Only create version if content is different from current
    if (generatedText !== item.content) {
      const timestamp = new Date(item.timestamp)
      const dateString = timestamp.toLocaleDateString()
      createNewVersion(
        item.content, 
        `From History (${dateString})`, 
        "Restored from recent generations"
      )
    }
  }

  // PDF Download function
  const downloadAsPDF = async () => {
    if (!generatedText) return

    setIsDownloading(true)
    try {
      const element = document.createElement("div")
      element.innerHTML = generatedText
      element.style.padding = "20px"
      element.style.fontFamily = "Times New Roman, serif" // ✅ Times New Roman
      element.style.lineHeight = "1.6"
      element.style.color = "#333"
      element.style.width = "800px"
      document.body.appendChild(element)

      const canvas = await html2canvas(element, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("p", "mm", "a4")
      pdf.setFont("times", "normal") // ✅ Times New Roman

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

      pdf.save(`letter-${new Date().toISOString().split("T")[0]}.pdf`)

      document.body.removeChild(element)
    } catch (err: any) {
      console.error("PDF generation error:", err)
      setError(err.message || "Failed to download PDF")
    } finally {
      setIsDownloading(false)
    }
  }

  // Delete generated letter function
  const deleteGeneratedLetter = () => {
    setGeneratedText("")
    setIsEditing(false)
    setHasUnsavedChanges(false)
    setVersions([])
    setCurrentVersionIndex(-1)
    
    // Clear localStorage
    try {
      if (isClient) {
        localStorage.removeItem("currentGeneratedText")
        localStorage.removeItem("documentVersions")
        localStorage.removeItem("currentVersionIndex")
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }

  const canUndo = currentVersionIndex < versions.length - 1
  const canRedo = currentVersionIndex > 0

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Navbar />
     
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* Input Section */}
        <Card className="bg-black/60 backdrop-blur-sm border-cyan-500/30 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              Describe Your Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Choose a template from dropdown or write your own prompt..."
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                className="min-h-24 resize-none bg-black/40 border-cyan-500/30 focus:border-cyan-400 text-white placeholder:text-cyan-300/50 text-sm"
              />

              {/* Show variables info if template selected */}
              {selectedTemplateId && (
                <div className="text-xs text-cyan-400/70">
                  <p>Using template: {letterTemplates.find(t => t.id === selectedTemplateId)?.title}</p>
                  {extractVariables(prompt).length > 0 && (
                    <p>Variables detected: {extractVariables(prompt).join(', ')}</p>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-xs text-cyan-400/60">{prompt.length} characters</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-black/40 border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400"
                      >
                        <Menu className="h-4 w-4" />
                        Templates
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {letterTemplates.map((template) => (
                        <DropdownMenuItem
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          {template.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Section */}
        <Card className="bg-black/60 backdrop-blur-sm border-cyan-500/30 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                Generate Letter
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button
              onClick={generateLetter}
              disabled={isGenerating}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              {isGenerating ? "Generating..." : "Generate Letter"}
            </Button>
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
          </CardContent>
        </Card>

        {/* Generated Content Section */}
        {generatedText && (
          <Card className="bg-black/60 backdrop-blur-sm border-cyan-500/30 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-cyan-400" />
                  Your Letter
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={downloadAsPDF}
                    disabled={isDownloading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </Button>
                  <Button
                    onClick={deleteGeneratedLetter}
                    variant="ghost"
                    className="bg-black/40 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RichTextEditor 
                  content={generatedText}
                  isEditable={isEditing}
                  onContentChange={handleContentChange}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Version History Section */}
        {showMobileHistory && (
          <VersionHistory
            versions={versions}
            currentVersionIndex={currentVersionIndex}
            onVersionSelect={handleVersionSelect}
            onSaveVersion={handleSaveVersion}
            isVisible={showMobileHistory}
            onClose={() => setShowMobileHistory(false)}
          />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Content Section */}
        <div className="space-y-4">
          {/* Generation Controls */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <RichTextEditor 
                  content={prompt}
                  isEditable={true}
                  onContentChange={handlePromptChange}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                onClick={generateLetter}
                disabled={isGenerating}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                {isGenerating ? "Generating..." : "Generate Letter"}
              </Button>
            </div>
          </div>

          {/* Generated Content */}
          {generatedText && (
            <div className="mt-8">
              <RichTextEditor 
                content={generatedText}
                isEditable={isEditing}
                onContentChange={handleContentChange}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveVersion}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save Version
                  </Button>
                  <Button
                    onClick={handleUndo}
                    disabled={!canUndo}
                    variant="ghost"
                    className="text-gray-500 disabled:opacity-50"
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleRedo}
                    disabled={!canRedo}
                    variant="ghost"
                    className="text-gray-500 disabled:opacity-50"
                  >
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={downloadAsPDF}
                    disabled={isDownloading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </Button>
                  <Button
                    onClick={deleteGeneratedLetter}
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}