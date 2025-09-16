"use client"

import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

interface HeaderProps {
  leftPanelOpen: boolean
  onToggleLeftPanel: () => void
}

export function Header({ leftPanelOpen, onToggleLeftPanel }: HeaderProps) {
  return (
    <div className="h-10 bg-background border-b border-sidebar-border flex items-center justify-between px-3">
      {/* Left Section - Panel Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLeftPanel}
          className="h-7 w-7 p-0 hover:bg-sidebar-accent"
          title={leftPanelOpen ? "Hide Explorer" : "Show Explorer"}
        >
          {leftPanelOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
        </Button>

        {/* PatX Studio Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-[10px]">P</span>
          </div>
          <span className="font-semibold text-foreground text-sm">PatX Studio</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
      </div>
    </div>
  )
}
