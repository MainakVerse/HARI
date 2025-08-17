'use client'

// components/letter-generator.tsx
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sparkles, History, AlertCircle, Edit3, Undo2, Redo2, 
  Clock, Download, X, MoreVertical
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

// Version History Component
const VersionHistory = ({ 
  versions, 
  currentVersionIndex, 
  onVersionSelect, 
  onSaveVersion
}: {
  versions: DocumentVersion[]
  currentVersionIndex: number
  onVersionSelect: (index: number) => void
  onSaveVersion: () => void
}) => {
  if (versions.length === 0) return null

  return (
    <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
      <CardHeader className="border-b border-cyan-500/20">
        <div className="flex justify-between items-center">
          <CardTitle className="dark:text-cyan-100 flex items-center gap-2">
            <Clock className="h-5 w-5 dark:text-cyan-400" />
            Version History
          </CardTitle>
          <Button
            onClick={onSaveVersion}
            variant="outline"
            size="sm"
            className="bg-green-500 border-green-500/50 text-white hover:bg-green-500"
          >
            Save Current
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {versions.map((version, index) => (
            <div
              key={version.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                index === currentVersionIndex
                  ? 'bg-cyan-500/20 border border-cyan-400/50'
                  : 'bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/15'
              }`}
              onClick={() => onVersionSelect(index)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium dark:text-cyan-200">
                    {version.name}
                  </div>
                  {version.description && (
                    <div className="text-xs dark:text-cyan-400/70 mt-1">
                      {version.description}
                    </div>
                  )}
                </div>
                <div className="text-xs dark:text-cyan-400/60">
                  {new Date(version.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function LetterGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [history, setHistory] = useState<GeneratedLetter[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [versions, setVersions] = useState<DocumentVersion[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showMobileHistory, setShowMobileHistory] = useState(false)

  const { saveToStorage, loadFromStorage, removeFromStorage } = useLocalStorage()

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = loadFromStorage("letterHistory")
    const savedVersions = loadFromStorage("documentVersions")
    const savedGeneratedText = loadFromStorage("currentGeneratedText")
    const savedCurrentVersionIndex = loadFromStorage("currentVersionIndex")

    if (savedHistory) setHistory(savedHistory)
    if (savedVersions) setVersions(savedVersions)
    if (savedGeneratedText) setGeneratedText(savedGeneratedText)
    if (savedCurrentVersionIndex !== null) setCurrentVersionIndex(savedCurrentVersionIndex)
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    if (history.length > 0) saveToStorage("letterHistory", history)
  }, [history])

  useEffect(() => {
    if (versions.length > 0) saveToStorage("documentVersions", versions)
  }, [versions])

  useEffect(() => {
    if (generatedText) saveToStorage("currentGeneratedText", generatedText)
  }, [generatedText])

  useEffect(() => {
    if (currentVersionIndex >= 0) saveToStorage("currentVersionIndex", currentVersionIndex)
  }, [currentVersionIndex])

  // Track unsaved changes
  useEffect(() => {
    if (versions.length > 0 && currentVersionIndex >= 0) {
      const currentVersion = versions[currentVersionIndex]
      setHasUnsavedChanges(currentVersion.content !== generatedText)
    }
  }, [generatedText, versions, currentVersionIndex])

  const extractVariables = (templatePrompt: string): string[] => {
    const matches = templatePrompt.match(/\[([^\]]+)\]/g)
    return matches ? matches.map(match => match.slice(1, -1)) : []
  }

  const createVariablesObject = (templatePrompt: string): Record<string, string> => {
    const variables = extractVariables(templatePrompt)
    const variablesObj: Record<string, string> = {}

    variables.forEach(variable => {
      const defaults: Record<string, string> = {
        "company name": "Acme Corporation",
        "position": "Software Developer",
        "candidate name": "John Doe",
        "your name": "Jane Smith"
      }
      variablesObj[variable] = defaults[variable.toLowerCase()] || `[${variable}]`
    })

    return variablesObj
  }

  const createNewVersion = (content: string, name?: string, description?: string) => {
    const timestamp = new Date()
    const timeString = timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    const versionName = name || (versions.length === 0 ? "Initial Version" : `Version ${versions.length + 1}`)
    
    const newVersion: DocumentVersion = {
      id: `${timestamp.getTime()}-${Math.random().toString(36).substr(2, 9)}`,
      name: versionName,
      content,
      timestamp: timestamp.toISOString(),
      description: description || `Created at ${timeString}`
    }

    // Prevent duplicate versions
    const isDuplicate = versions.some(v => v.content === content)
    if (isDuplicate && versions.length > 0) return

    setVersions(prev => [newVersion, ...prev])
    setCurrentVersionIndex(0)
    setHasUnsavedChanges(false)
    return newVersion
  }

  const generateLetter = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const requestBody = selectedTemplateId
        ? {
            type: selectedTemplateId,
            variables: createVariablesObject(
              letterTemplates.find(t => t.id === selectedTemplateId)?.prompt || ""
            ),
          }
        : {
            type: "custom",
            customPrompt: prompt,
          }

      const response = await fetch("/api/generate-letter", {
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

      setGeneratedText(data.content)

      // Create version
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

      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5))
    } catch (err: any) {
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

  const handleSaveVersion = () => {
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

  const handleHistoryItemClick = (item: GeneratedLetter) => {
    setGeneratedText(item.content)
    
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

  const downloadAsPDF = async () => {
    if (!generatedText) return

    setIsDownloading(true)
    try {
      const element = document.createElement("div")
      element.innerHTML = generatedText
      Object.assign(element.style, {
        padding: "20px",
        fontFamily: "Times New Roman, serif",
        lineHeight: "1.6",
        color: "#333",
        width: "800px"
      })
      document.body.appendChild(element)

      const canvas = await html2canvas(element, { scale: 2 })
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

      pdf.save(`letter-${new Date().toISOString().split("T")[0]}.pdf`)
      document.body.removeChild(element)
    } catch (err: any) {
      setError(err.message || "Failed to download PDF")
    } finally {
      setIsDownloading(false)
    }
  }

  const deleteGeneratedLetter = () => {
    setGeneratedText("")
    setIsEditing(false)
    setHasUnsavedChanges(false)
    setVersions([])
    setCurrentVersionIndex(-1)
    
    removeFromStorage("currentGeneratedText")
    removeFromStorage("documentVersions")
    removeFromStorage("currentVersionIndex")
  }

  const canUndo = currentVersionIndex < versions.length - 1
  const canRedo = currentVersionIndex > 0

  // Reusable components
  const TemplateDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20 w-full sm:w-auto"
        >
          Choose Template
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

  // Mobile Action Buttons (More Menu)
  const MobileActionMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/80 border-cyan-500/30 text-cyan-100 w-48">
        <DropdownMenuItem
          onClick={downloadAsPDF}
          disabled={isDownloading}
          className="cursor-pointer hover:bg-cyan-500/20"
        >
          <Download className="h-4 w-4 mr-2" />
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleUndo}
          disabled={!canUndo}
          className="cursor-pointer hover:bg-cyan-500/20 disabled:opacity-50"
        >
          <Undo2 className="h-4 w-4 mr-2" />
          Undo
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleRedo}
          disabled={!canRedo}
          className="cursor-pointer hover:bg-cyan-500/20 disabled:opacity-50"
        >
          <Redo2 className="h-4 w-4 mr-2" />
          Redo
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={deleteGeneratedLetter}
          className="cursor-pointer hover:bg-red-500/20 text-red-300"
        >
          <X className="h-4 w-4 mr-2" />
          Delete Letter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  // Desktop Action Buttons
  const DesktopActionButtons = () => (
    <div className="flex items-center gap-2">
      <Button
        onClick={downloadAsPDF}
        disabled={isDownloading}
        variant="outline"
        size="sm"
        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
      >
        {isDownloading ? (
          <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-300 border-t-transparent mr-1" />
        ) : (
          <Download className="h-4 w-4 mr-1" />
        )}
        PDF
      </Button>
      
      <Button
        onClick={deleteGeneratedLetter}
        variant="outline"
        size="sm"
        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
      >
        <X className="h-4 w-4 mr-1" />
        Delete
      </Button>
      
      <Button
        onClick={handleUndo}
        disabled={!canUndo}
        variant="outline"
        size="sm"
        className="dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20"
        title="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={handleRedo}
        disabled={!canRedo}
        variant="outline"
        size="sm"
        className="dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20"
        title="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => setIsEditing(!isEditing)}
        variant="outline"
        size="sm"
        className={`${isEditing ? 'bg-cyan-500/20 border-cyan-400/50' : 'dark:bg-black border-cyan-500/30'} dark:text-cyan-300 hover:bg-cyan-500/20`}
      >
        <Edit3 className="h-4 w-4 mr-1" />
        {isEditing ? 'Done' : 'Edit'}
      </Button>
    </div>
  )

  const HistorySection = () => (
    <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
      <CardHeader>
        <CardTitle className="dark:text-white flex items-center gap-2">
          <History className="h-5 w-5 text-cyan-400" />
          Recent Generations (last {history.length} only)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 cursor-pointer hover:bg-cyan-500/15 transition-colors"
                onClick={() => handleHistoryItemClick(item)}
              >
                <div className="text-xs dark:text-cyan-400/70 mb-1 flex justify-between">
                  <span>{item.type}</span>
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="text-sm dark:text-cyan-200 line-clamp-3">
                  {item.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-cyan-400/50 text-sm">No history yet.</p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        {/* Input Section */}
        <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="dark:text-white flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 dark:text-cyan-400" />
              Describe Your Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Choose a template from dropdown or write your own prompt..."
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
    className="min-h-24 resize-none dark:bg-black border-cyan-500/30 focus:border-cyan-400 dark:text-white placeholder:text-gray-400"
  />

              {selectedTemplateId && (
                <div className="text-xs text-cyan-400/70">
                  <p>Using template: {letterTemplates.find(t => t.id === selectedTemplateId)?.title}</p>
                  {extractVariables(prompt).length > 0 && (
                    <p>Variables detected: {extractVariables(prompt).join(', ')}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <p className="text-xs text-cyan-400/60">{prompt.length} characters</p>
                
                {/* Mobile Button Layout */}
                <div className="space-y-2">
                  <TemplateDropdown />
                  <Button
                    onClick={generateLetter}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-cyan-500/30 disabled:opacity-50 text-sm w-full"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Letter
                      </>
                    )}
                  </Button>
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

        {/* Version History - Mobile (between input and generated letter) */}
        <VersionHistory
          versions={versions}
          currentVersionIndex={currentVersionIndex}
          onVersionSelect={handleVersionSelect}
          onSaveVersion={handleSaveVersion}
        />

        {/* Generated Letter - Mobile */}
        {generatedText && (
          <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-xl">
            <CardHeader className="border-b border-cyan-500/20 pb-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <CardTitle className="dark:text-cyan-100 font-serif text-lg truncate">
                    Generated Letter
                  </CardTitle>
                  {hasUnsavedChanges && (
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/30 whitespace-nowrap">
                      Unsaved
                    </span>
                  )}
                </div>
                
                {/* Mobile Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    size="sm"
                    className={`${isEditing ? 'bg-cyan-500/20 border-cyan-400/50' : 'dark:bg-black border-cyan-500/30'} dark:text-cyan-300 hover:bg-cyan-500/20`}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <MobileActionMenu />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 relative dark:bg-black">
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-cyan-500/20 shadow-lg">
                <RichTextEditor 
                  content={generatedText} 
                  isEditable={isEditing}
                  onContentChange={handleContentChange}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile History Toggle */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowMobileHistory(!showMobileHistory)}
            variant="outline"
            className="dark:bg-black border-cyan-500/30 dark:text-cyan-300 hover:bg-cyan-500/20"
          >
            <History className="h-4 w-4 mr-2" />
            {showMobileHistory ? 'Hide History' : 'Show History'}
          </Button>
        </div>

        {showMobileHistory && <HistorySection />}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          {/* Input Section */}
          <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center gap-2">
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
                  className="min-h-32 resize-none dark:bg-black dark:text-white border-cyan-500/30 focus:border-cyan-400  placeholder:text-cyan-300/50"
                />

                {selectedTemplateId && (
                  <div className="text-xs text-cyan-400/70">
                    <p>Using template: {letterTemplates.find(t => t.id === selectedTemplateId)?.title}</p>
                    {extractVariables(prompt).length > 0 && (
                      <p>Variables detected: {extractVariables(prompt).join(', ')}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center gap-3">
                  <p className="text-xs text-blue-400">{prompt.length} characters</p>
                  <div className="flex items-center gap-2">
                    <TemplateDropdown />
                    <Button
                      onClick={generateLetter}
                      disabled={!prompt.trim() || isGenerating}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-cyan-500/30 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Letter
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Version History - Desktop (between input and generated letter) */}
          <VersionHistory
            versions={versions}
            currentVersionIndex={currentVersionIndex}
            onVersionSelect={handleVersionSelect}
            onSaveVersion={handleSaveVersion}
          />

          {/* Generated Letter - Desktop */}
          <Card className="dark:bg-black backdrop-blur-sm border-cyan-500/30 shadow-xl">
            <CardHeader className="border-b border-cyan-500/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle className="dark:text-cyan-100 font-serif">Generated Letter</CardTitle>
                  {hasUnsavedChanges && (
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/30">
                      Unsaved changes
                    </span>
                  )}
                </div>
                {generatedText && <DesktopActionButtons />}
              </div>
            </CardHeader>
            <CardContent className="p-8 relative dark:bg-black bg-white dark:text-cyan-300 text-black">
              {generatedText ? (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 border border-cyan-500/20">
                  <RichTextEditor 
                    content={generatedText} 
                    isEditable={isEditing}
                    onContentChange={handleContentChange}
                  />
                </div>
              ) : (
                <p className="dark:text-cyan-400 text-sm italic">No letter generated yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <HistorySection />
        </div>
      </div>
    </div>
  )
}