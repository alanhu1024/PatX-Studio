"use client"

import { useState } from "react"
import { TiptapEditor } from "@/components/tiptap-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditorDemoPage() {
  const [content, setContent] = useState(`
    <h1>Welcome to Tiptap v3 Editor</h1>
    <p>This is a <strong>rich text editor</strong> built with <em>Tiptap v3</em> and Next.js.</p>
    <h2>Features</h2>
    <ul>
      <li>Bold, italic, and strikethrough text</li>
      <li>Headings (H1, H2, H3)</li>
      <li>Lists (bullet and numbered)</li>
      <li>Code blocks and inline code</li>
      <li>Blockquotes</li>
      <li>Horizontal rules</li>
    </ul>
    <blockquote>
      <p>This is a blockquote example. You can use it to highlight important information.</p>
    </blockquote>
    <h3>Try editing this content!</h3>
    <p>Click anywhere in this editor and start typing. Use the toolbar above to format your text.</p>
  `)

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Tiptap v3 Editor Demo</CardTitle>
          <CardDescription>
            A rich text editor integrated into your web app using Tiptap v3
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Editor</h3>
            <TiptapEditor
              content={content}
              onChange={setContent}
              editable={true}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview (Read-only)</h3>
            <TiptapEditor
              content={content}
              editable={false}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">HTML Output</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{content}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}