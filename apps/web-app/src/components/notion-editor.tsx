"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import * as TiptapReact from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import type { ComponentType } from "react"
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Bold,
  Italic,
  Strikethrough,
  Plus,
  GripVertical,
  ChevronRight,
  Hash
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCallback, useState, useRef, useEffect } from "react"
import { Toggle } from "@/components/ui/toggle"

interface NotionEditorProps {
  content?: string
  onChange?: (content: string) => void
  editable?: boolean
  placeholder?: string
  // When editor is ready, expose it to parent for imperative actions (focus, selection, etc.)
  onEditorReady?: (editor: any) => void
  // Called when user presses Backspace at the very start of the first body paragraph
  onBackspaceAtBodyStart?: (text: string) => void
}

interface SlashCommand {
  title: string
  description: string
  icon: React.ReactNode
  command: (editor: any) => void
}

const slashCommands: SlashCommand[] = [
  {
    title: "Text",
    description: "Start writing with plain text",
    icon: <Type className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().setParagraph().run()
  },
  {
    title: "Heading 1",
    description: "Big section heading",
    icon: <Heading1 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run()
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: <Heading2 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: <Heading3 className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: <List className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleBulletList().run()
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    icon: <ListOrdered className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleOrderedList().run()
  },
  {
    title: "Quote",
    description: "Capture a quote",
    icon: <Quote className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleBlockquote().run()
  },
  {
    title: "Code",
    description: "Capture a code snippet",
    icon: <Code className="w-4 h-4" />,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run()
  }
]

export function NotionEditor({
  content = "",
  onChange,
  editable = true,
  placeholder = "Press '/' for commands or start typing...",
  onEditorReady,
  onBackspaceAtBodyStart
}: NotionEditorProps) {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 })
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)
  const [query, setQuery] = useState("")
  const slashMenuRef = useRef<HTMLDivElement>(null)

  const filteredCommands = slashCommands.filter(cmd =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase())
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Heading ${node.attrs.level}`
          }
          return placeholder
        },
        showOnlyWhenEditable: true,
        includeChildren: true,
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
      handleKeyDown: (view, event) => {
        if (event.key === '/') {
          const { from } = view.state.selection
          const coords = view.coordsAtPos(from)
          const editorElement = view.dom.parentElement
          if (editorElement) {
            const rect = editorElement.getBoundingClientRect()
            setSlashMenuPosition({
              top: coords.top - rect.top + 25,
              left: coords.left - rect.left
            })
            setShowSlashMenu(true)
            setQuery("")
            setSelectedCommandIndex(0)
            return false
          }
        }

        // Backspace at the very start of the first body paragraph -> merge back into title
        if (event.key === 'Backspace') {
          const sel: any = view.state.selection as any
          const $from: any = sel.$from
          const atStartOfNode = $from.parentOffset === 0
          const parentTypeName = $from.parent?.type?.name
          const isParagraphLike = parentTypeName === 'paragraph' || parentTypeName === 'heading'
          const isFirstTopLevelNode = $from.index(0) === 0
          if (atStartOfNode && isParagraphLike && isFirstTopLevelNode) {
            const text = $from.parent?.textContent || ''
            onBackspaceAtBodyStart?.(text)
            // 删除整个段落节点，避免在正文残留空行
            const paraPos = $from.before() // 段落节点在文档中的起始位置
            const tr = view.state.tr.delete(paraPos, paraPos + $from.parent.nodeSize)
            view.dispatch(tr)
            return true
          }
        }

        if (showSlashMenu) {
          if (event.key === 'Escape') {
            setShowSlashMenu(false)
            return true
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setSelectedCommandIndex((prev) =>
              prev < filteredCommands.length - 1 ? prev + 1 : 0
            )
            return true
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setSelectedCommandIndex((prev) =>
              prev > 0 ? prev - 1 : filteredCommands.length - 1
            )
            return true
          }

          if (event.key === 'Enter') {
            event.preventDefault()
            const selectedCommand = filteredCommands[selectedCommandIndex]
            if (selectedCommand) {
              editor?.chain().deleteRange({ from: editor.state.selection.from - query.length - 1, to: editor.state.selection.from }).run()
              selectedCommand.command(editor)
              setShowSlashMenu(false)
            }
            return true
          }

          if (event.key === 'Backspace' && query === '') {
            setShowSlashMenu(false)
            return false
          }

          if (event.key.length === 1) {
            setQuery(prev => prev + event.key)
            setSelectedCommandIndex(0)
            return false
          }
        }

        return false
      }
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // Notify parent when editor becomes available
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor)
    }
  }, [editor, onEditorReady])

  useEffect(() => {
    if (showSlashMenu && query) {
      const timer = setTimeout(() => {
        if (query.length > 0 && filteredCommands.length === 0) {
          setShowSlashMenu(false)
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [query, filteredCommands.length, showSlashMenu])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false)
      }
    }

    if (showSlashMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSlashMenu])

  if (!editor) {
    return null
  }

  // Some builds of @tiptap/react may not export these menu components.
  // Guard their usage to avoid "Element type is invalid" runtime errors.
  const FloatingMenuComponent = ((TiptapReact as any).FloatingMenu as unknown) as ComponentType<any> | undefined
  const BubbleMenuComponent = ((TiptapReact as any).BubbleMenu as unknown) as ComponentType<any> | undefined

  return (
    <div className="relative w-full">
      {editable ? (
        <>
          {FloatingMenuComponent ? (
            <FloatingMenuComponent
              editor={editor}
              tippyOptions={{ duration: 100 }}
              className="flex items-center gap-1 bg-background border rounded-lg shadow-lg p-1"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive('heading', { level: 1 }) && "bg-muted"
                )}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive('heading', { level: 2 }) && "bg-muted"
                )}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive('bulletList') && "bg-muted"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive('orderedList') && "bg-muted"
                )}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </FloatingMenuComponent>
          ) : null}

          {BubbleMenuComponent ? (
            <BubbleMenuComponent
              editor={editor}
              tippyOptions={{ duration: 100 }}
              className="flex items-center gap-1 bg-background border rounded-lg shadow-lg p-1"
            >
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                className="h-8 w-8 p-0"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                className="h-8 w-8 p-0"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                className="h-8 w-8 p-0"
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("code")}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
                className="h-8 w-8 p-0"
              >
                <Code className="h-4 w-4" />
              </Toggle>
            </BubbleMenuComponent>
          ) : null}

          {showSlashMenu && (
            <div
              ref={slashMenuRef}
              className="absolute z-50 bg-background border rounded-lg shadow-xl p-2 min-w-[300px] max-h-[320px] overflow-y-auto"
              style={{
                top: slashMenuPosition.top,
                left: slashMenuPosition.left,
              }}
            >
              <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
                Basic blocks
              </div>
              {filteredCommands.map((command, index) => (
                <button
                  key={command.title}
                  onClick={() => {
                    editor?.chain().deleteRange({
                      from: editor.state.selection.from - query.length - 1,
                      to: editor.state.selection.from
                    }).run()
                    command.command(editor)
                    setShowSlashMenu(false)
                  }}
                  className={cn(
                    "flex items-start gap-3 w-full p-2 rounded hover:bg-muted transition-colors text-left",
                    index === selectedCommandIndex && "bg-muted"
                  )}
                  onMouseEnter={() => setSelectedCommandIndex(index)}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded border bg-background">
                    {command.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{command.title}</div>
                    <div className="text-xs text-muted-foreground">{command.description}</div>
                  </div>
                </button>
              ))}
              {filteredCommands.length === 0 && (
                <div className="text-sm text-muted-foreground px-2 py-4 text-center">
                  No matching commands
                </div>
              )}
            </div>
          )}
        </>
      ) : null}

      <EditorContent
        editor={editor}
        className={cn(
          "notion-editor",
          "prose prose-neutral dark:prose-invert",
          "max-w-none",
          "focus:outline-none",
          "[&_.ProseMirror]:min-h-[500px]",
          "[&_.ProseMirror]:px-12",
          "[&_.ProseMirror]:pt-6",
          "[&_.ProseMirror]:pb-8",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
          "[&_.ProseMirror_h1]:text-3xl",
          "[&_.ProseMirror_h1]:font-bold",
          "[&_.ProseMirror_h1]:mt-8",
          "[&_.ProseMirror_h1:first-child]:mt-2",
          "[&_.ProseMirror_h1]:mb-4",
          "[&_.ProseMirror_h2]:text-2xl",
          "[&_.ProseMirror_h2]:font-semibold",
          "[&_.ProseMirror_h2]:mt-6",
          "[&_.ProseMirror_h2]:mb-3",
          "[&_.ProseMirror_h3]:text-xl",
          "[&_.ProseMirror_h3]:font-semibold",
          "[&_.ProseMirror_h3]:mt-4",
          "[&_.ProseMirror_h3]:mb-2",
          "[&_.ProseMirror_p]:leading-7",
          "[&_.ProseMirror_p]:mb-4",
          "[&_.ProseMirror_ul]:list-disc",
          "[&_.ProseMirror_ul]:ml-6",
          "[&_.ProseMirror_ul]:mb-4",
          "[&_.ProseMirror_ol]:list-decimal",
          "[&_.ProseMirror_ol]:ml-6",
          "[&_.ProseMirror_ol]:mb-4",
          "[&_.ProseMirror_li]:mb-1",
          "[&_.ProseMirror_blockquote]:border-l-4",
          "[&_.ProseMirror_blockquote]:border-muted-foreground/20",
          "[&_.ProseMirror_blockquote]:pl-4",
          "[&_.ProseMirror_blockquote]:italic",
          "[&_.ProseMirror_blockquote]:my-4",
          "[&_.ProseMirror_code]:bg-muted",
          "[&_.ProseMirror_code]:px-1.5",
          "[&_.ProseMirror_code]:py-0.5",
          "[&_.ProseMirror_code]:rounded",
          "[&_.ProseMirror_code]:font-mono",
          "[&_.ProseMirror_code]:text-sm",
          "[&_.ProseMirror_pre]:bg-muted",
          "[&_.ProseMirror_pre]:rounded-lg",
          "[&_.ProseMirror_pre]:p-4",
          "[&_.ProseMirror_pre]:my-4",
          "[&_.ProseMirror_pre_code]:bg-transparent",
          "[&_.ProseMirror_pre_code]:p-0"
        )}
      />
    </div>
  )
}
