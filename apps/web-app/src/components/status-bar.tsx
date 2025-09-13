"use client"

import { Badge } from "@/components/ui/badge"
import { Wifi, User, FileText, Bot } from "lucide-react"

interface StatusBarProps {
  currentFile: string | null
  hasUnsavedChanges: boolean
  aiStatus: "ready" | "processing" | "error"
}

export function StatusBar({ currentFile, hasUnsavedChanges, aiStatus }: StatusBarProps) {
  const getAIStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="h-6 bg-primary text-primary-foreground flex items-center justify-between px-4 text-xs">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {currentFile && (
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>{currentFile}</span>
            {hasUnsavedChanges && (
              <div className="flex items-center gap-1 ml-2">
                <div className="w-1 h-1 bg-yellow-300 rounded-full" />
                <span>Unsaved</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Bot className="h-3 w-3" />
          <Badge className={`text-xs h-4 ${getAIStatusColor(aiStatus)}`}>AI {aiStatus}</Badge>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Wifi className="h-3 w-3" />
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>Patent Analyst</span>
        </div>
      </div>
    </div>
  )
}
