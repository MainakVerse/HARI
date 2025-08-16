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
      <div className="min-h-48 sm:min-h-64 md:min-h-80 lg:min-h-96 w-full">
        <style jsx global>{`
          .ql-editor {
            background-color: #ffffff !important;
            color: #1f2937 !important;
            font-family: 'Times New Roman', serif !important;
            line-height: 1.6 !important;
            font-size: 14px !important;
            padding: 12px !important;
          }
          
          @media (min-width: 640px) {
            .ql-editor {
              font-size: 16px !important;
              padding: 16px !important;
            }
          }
          
          .ql-toolbar {
            background-color: #f9fafb !important;
            border-color: rgba(6, 182, 212, 0.3) !important;
            border-bottom: 1px solid rgba(6, 182, 212, 0.3) !important;
            padding: 8px !important;
          }
          
          @media (min-width: 640px) {
            .ql-toolbar {
              padding: 12px !important;
            }
          }
          
          .ql-container {
            border-color: rgba(6, 182, 212, 0.3) !important;
            background-color: #ffffff !important;
            font-size: 14px !important;
          }
          
          @media (min-width: 640px) {
            .ql-container {
              font-size: 16px !important;
            }
          }
          
          .ql-toolbar .ql-stroke {
            stroke: #374151 !important;
          }
          
          .ql-toolbar .ql-fill {
            fill: #374151 !important;
          }
          
          .ql-toolbar button {
            width: 28px !important;
            height: 28px !important;
            padding: 3px !important;
          }
          
          @media (min-width: 640px) {
            .ql-toolbar button {
              width: 32px !important;
              height: 32px !important;
              padding: 5px !important;
            }
          }
          
          .ql-toolbar button:hover {
            background-color: rgba(6, 182, 212, 0.1) !important;
          }
          
          .ql-toolbar button.ql-active {
            background-color: rgba(6, 182, 212, 0.2) !important;
          }
          
          .ql-toolbar .ql-picker {
            font-size: 12px !important;
          }
          
          @media (min-width: 640px) {
            .ql-toolbar .ql-picker {
              font-size: 14px !important;
            }
          }
          
          .ql-toolbar .ql-picker-label {
            padding: 2px 4px !important;
          }
          
          @media (min-width: 640px) {
            .ql-toolbar .ql-picker-label {
              padding: 3px 6px !important;
            }
          }
          
          /* Mobile-specific adjustments */
          @media (max-width: 639px) {
            .ql-toolbar {
              flex-wrap: wrap !important;
            }
            
            .ql-formats {
              margin-right: 8px !important;
              margin-bottom: 4px !important;
            }
            
            .ql-toolbar .ql-picker-options {
              max-height: 200px !important;
              overflow-y: auto !important;
            }
          }
        `}</style>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="bg-white rounded-lg overflow-hidden w-full"
        />
      </div>
    )
  }

  return (
    <div 
      className="prose prose-sm sm:prose-base md:prose-lg max-w-none font-serif text-gray-900 leading-relaxed px-2 sm:px-4 md:px-0"
      style={{
        color: '#1f2937',
        fontSize: '14px',
        lineHeight: '1.6'
      }}
      dangerouslySetInnerHTML={{ __html: cleanContent(content) }}
    />
  )
}

export default RichTextEditor