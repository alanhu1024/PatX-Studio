"use client"

import { useState } from "react"
import { FileExplorer } from "@/components/file-explorer"
import { ContentEditor } from "@/components/content-editor"
import { AIChat } from "@/components/ai-chat"
import { StatusBar } from "@/components/status-bar"
import { Button } from "@/components/ui/button"
import { PanelLeft, MessageSquare } from "lucide-react"

export default function ClaimChartApp() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const [openTabs, setOpenTabs] = useState<string[]>([])

  const toggleLeftPanel = () => setLeftPanelOpen(!leftPanelOpen)
  const toggleRightPanel = () => setRightPanelOpen(!rightPanelOpen)

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden relative">

        {!rightPanelOpen && !currentFile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRightPanel}
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-accent"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        )}

        {/* Left Sidebar - File Explorer */}
        <div
          className={`${leftPanelOpen ? "w-80" : "w-0"} transition-all duration-200 border-r border-sidebar-border bg-sidebar`}
        >
          {leftPanelOpen && (
            <FileExplorer
              onFileSelect={setCurrentFile}
              currentFile={currentFile}
              openTabs={openTabs}
              setOpenTabs={setOpenTabs}
              isOpen={leftPanelOpen}
              onTogglePanel={toggleLeftPanel}
            />
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <ContentEditor
            currentFile={currentFile}
            openTabs={openTabs}
            setOpenTabs={setOpenTabs}
            setCurrentFile={setCurrentFile}
            leftPanelOpen={leftPanelOpen}
            rightPanelOpen={rightPanelOpen}
            toggleLeftPanel={toggleLeftPanel}
            toggleRightPanel={toggleRightPanel}
          />
        </div>

        {/* Right Sidebar - AI Chat */}
        <div
          className={`${rightPanelOpen ? "w-96" : "w-0"} transition-all duration-200 border-l border-sidebar-border bg-sidebar`}
        >
          {rightPanelOpen && (
            <AIChat currentFile={currentFile} isOpen={rightPanelOpen} onTogglePanel={toggleRightPanel} />
          )}
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar currentFile={currentFile} hasUnsavedChanges={false} aiStatus="ready" />
    </div>
  )
}
