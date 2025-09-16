"use client"

import { useState } from "react"
import { FileExplorer } from "@/components/file-explorer"
import { ContentEditor } from "@/components/content-editor"

export default function TestDocumentPage() {
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {leftPanelOpen && (
        <div className="w-64 border-r">
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

      <div className="flex-1">
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