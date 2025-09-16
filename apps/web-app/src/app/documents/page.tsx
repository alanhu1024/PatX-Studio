"use client"

import { useState } from "react"
import { FileExplorer } from "@/components/file-explorer"
import { ContentEditor } from "@/components/content-editor"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"

export default function DocumentsPage() {
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - File Explorer */}
      {leftPanelOpen && (
        <div className="w-80 border-r border-border bg-sidebar">
          <FileExplorer
            onFileSelect={setCurrentFile}
            currentFile={currentFile}
            openTabs={openTabs}
            setOpenTabs={setOpenTabs}
            isOpen={leftPanelOpen}
            onTogglePanel={() => setLeftPanelOpen(!leftPanelOpen)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!leftPanelOpen && (
          <div className="border-b p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLeftPanelOpen(true)}
              className="h-8"
            >
              <PanelLeft className="h-4 w-4 mr-2" />
              Show Explorer
            </Button>
          </div>
        )}
        
        <ContentEditor
          currentFile={currentFile}
          openTabs={openTabs}
          setOpenTabs={setOpenTabs}
          setCurrentFile={setCurrentFile}
          leftPanelOpen={leftPanelOpen}
          rightPanelOpen={rightPanelOpen}
          toggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
          toggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
        />
      </div>
    </div>
  )
}