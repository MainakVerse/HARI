// components/RichTextEditor.tsx
"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(
  () => import('react-quill-new').then((mod) => mod.default),
  {
    ssr: false,
  }
)

// Import the CSS
import 'react-quill-new/dist/quill.snow.css'

export function RichTextEditor({ 
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

export default RichTextEditor