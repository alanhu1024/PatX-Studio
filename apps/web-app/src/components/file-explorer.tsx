"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { documentStore, type Document } from "@/lib/stores/document-store"
import { FileText, PanelLeftClose, Plus, Search, Trash2, Upload, Home, Bot } from "lucide-react"
import { UploadModal } from "@/components/upload-modal"

interface FileExplorerProps {
  onFileSelect: (fileId: string | null) => void
  currentFile: string | null
  openTabs: string[]
  setOpenTabs: (tabs: string[]) => void
  isOpen: boolean
  onTogglePanel: () => void // Added toggle function prop
}

export function FileExplorer({
  onFileSelect,
  currentFile,
  openTabs,
  setOpenTabs,
  isOpen: _isOpen,
  onTogglePanel,
}: FileExplorerProps) {
  void _isOpen
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    // Load initial documents
    setDocuments(documentStore.getAllDocuments())
    
    // Subscribe to document changes
    const unsubscribe = documentStore.subscribe(() => {
      setDocuments(documentStore.getAllDocuments())
    })
    
    return unsubscribe
  }, [])

  const handleFileClick = (fileId: string) => {
    onFileSelect(fileId)
    setOpenTabs((prevTabs) => (prevTabs.includes(fileId) ? prevTabs : [...prevTabs, fileId]))
  }

  const handleCreateDocument = () => {
    const newDoc = documentStore.createDocument()
    handleFileClick(newDoc.id)
  }

  const handleDeleteDocument = (fileId: string) => {
    const remainingDocs = documents.filter((doc) => doc.id !== fileId)
    documentStore.deleteDocument(fileId)
    setOpenTabs((prevTabs) => prevTabs.filter((id) => id !== fileId))

    if (currentFile === fileId) {
      const nextDocId = remainingDocs[0]?.id ?? null
      onFileSelect(nextDocId)
    }
  }

  const handleUploadSuccess = (uploadedFiles: any[]) => {
    console.log("Upload successful:", uploadedFiles)
    // Here you would typically refresh the file list or update the state
    // For now, we'll just log the output.
  }

  const truncateDocumentName = (name: string) => {
    const MAX_NAME_LENGTH = 28
    if (name.length <= MAX_NAME_LENGTH) {
      return name
    }
    return name.slice(0, MAX_NAME_LENGTH - 3) + '...'
  }

  return (
    <div className="h-full flex flex-col">
      {/* 顶部区域：Explorer标题和操作按钮 */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-sidebar-foreground">Explorer</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onTogglePanel}
              aria-label="折叠侧栏"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsUploadModalOpen(true)}
              aria-label="上传文件"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleCreateDocument}
              aria-label="新建文档"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 固定功能区域 */}
      <div className="border-b border-sidebar-border">
        <div className="p-2 space-y-1">
          {/* 搜索 */}
          <button
            className="w-full flex items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              // 打开搜索功能逻辑
              console.log("Open search")
            }}
          >
            <Search className="h-4 w-4 text-neutral-500 flex-shrink-0 mr-3" />
            <span className="text-neutral-700 dark:text-neutral-400">搜索</span>
          </button>

          {/* 主页 */}
          <button
            className="w-full flex items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              // 导航到主页逻辑
              console.log("Navigate to home")
            }}
          >
            <Home className="h-4 w-4 text-neutral-500 flex-shrink-0 mr-3" />
            <span className="text-neutral-700 dark:text-neutral-400">主页</span>
          </button>

          {/* PatX AI */}
          <button
            className="w-full flex items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              // 打开AI功能逻辑
              console.log("Open PatX AI")
            }}
          >
            <Bot className="h-4 w-4 text-neutral-500 flex-shrink-0 mr-3" />
            <span className="text-neutral-700 dark:text-neutral-400">PatX AI</span>
          </button>
        </div>
      </div>

      {/* 文档列表区域 */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {documents.length > 0 ? (
            documents.map((doc) => {
              const isSelected = currentFile === doc.id
              const resolvedTitle = doc.title.trim() || 'New page'
              const displayName = truncateDocumentName(resolvedTitle)
              const isPlaceholderTitle = doc.title.trim() === ''

              return (
                <div
                  key={doc.id}
                  className={`group flex items-center rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isSelected
                      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50'
                      : 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                  onClick={() => handleFileClick(doc.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      handleFileClick(doc.id)
                    }
                  }}
                >
                  <FileText
                    className={`h-4 w-4 flex-shrink-0 mr-3 ${
                      isSelected
                        ? 'text-neutral-600 dark:text-neutral-400'
                        : 'text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-400'
                    }`}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span
                      className={`truncate ${
                        isSelected
                          ? 'font-medium'
                          : isPlaceholderTitle
                            ? 'text-neutral-500 italic dark:text-neutral-400'
                            : 'text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-50'
                      }`}
                    >
                      {displayName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 flex-shrink-0 p-0 text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleDeleteDocument(doc.id)
                    }}
                    aria-label="删除文档"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )
            })
          ) : (
            <div className="rounded-md border border-dashed border-muted-foreground/40 p-4 text-center text-sm text-muted-foreground">
              暂无文档，点击上方加号新建。
            </div>
          )}
        </div>
      </ScrollArea>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  )
}
