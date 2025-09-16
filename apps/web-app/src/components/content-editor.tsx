"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Plus, Save, FileText, Settings, PanelLeft, MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TiptapEditor } from "@/components/tiptap-editor"
import { NotionEditor } from "@/components/notion-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { documentStore } from "@/lib/stores/document-store"
import { useEffect } from "react"

interface ContentEditorProps {
  currentFile: string | null
  openTabs: string[]
  setOpenTabs: (tabs: string[]) => void
  setCurrentFile: (fileId: string | null) => void
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  toggleLeftPanel: () => void
  toggleRightPanel: () => void
}

interface ClaimChartData {
  id: string
  projectName: string
  patentNumber: string
  productName: string
  status: "draft" | "review" | "finalized"
  claims: {
    id: string
    claimText: string
    productFeature: string
    evidence: string
    notes: string
  }[]
}

const mockClaimCharts: Record<string, ClaimChartData> = {
  "claim-chart-1": {
    id: "claim-chart-1",
    projectName: "Patent Analysis Project",
    patentNumber: "US Patent 123456",
    productName: "Product A",
    status: "draft",
    claims: [
      {
        id: "claim-1",
        claimText: "A method for processing data comprising: receiving input data from a user interface...",
        productFeature:
          "The product implements a data processing module that receives user input through its web interface...",
        evidence: "See Product Manual Section 3.2, Technical Diagram Fig. 1",
        notes: "Strong match - direct implementation",
      },
      {
        id: "claim-2",
        claimText: "The method of claim 1, wherein the processing includes validation steps...",
        productFeature: "Product A includes comprehensive validation logic in its data processing pipeline...",
        evidence: "Source code analysis, User Manual p.45",
        notes: "Need additional evidence for validation steps",
      },
    ],
  },
}

export function ContentEditor({
  currentFile,
  openTabs,
  setOpenTabs,
  setCurrentFile,
  leftPanelOpen,
  rightPanelOpen,
  toggleLeftPanel,
  toggleRightPanel,
}: ContentEditorProps) {
  const [claimCharts, setClaimCharts] = useState(mockClaimCharts)
  const [activeEditMode, setActiveEditMode] = useState<"textarea" | "tiptap">("tiptap")
  const [documentContent, setDocumentContent] = useState<string>('')
  const [documentTitle, setDocumentTitle] = useState<string>('')
  const editorRef = useRef<any | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (currentFile && currentFile.startsWith('doc-')) {
      const doc = documentStore.getDocument(currentFile)
      if (doc) {
        setDocumentContent(doc.content)
        setDocumentTitle(doc.title)
      }
    }
  }, [currentFile])

  const handleClaimUpdate = (chartId: string, claimId: string, field: string, value: string) => {
    setClaimCharts(prev => ({
      ...prev,
      [chartId]: {
        ...prev[chartId],
        claims: prev[chartId].claims.map(claim =>
          claim.id === claimId ? { ...claim, [field]: value } : claim
        )
      }
    }))
  }

  const handleDocumentUpdate = (content: string) => {
    setDocumentContent(content)
    if (currentFile && currentFile.startsWith('doc-')) {
      documentStore.updateDocument(currentFile, { content })
    }
  }

  const handleDocumentTitleUpdate = (title: string) => {
    setDocumentTitle(title)
    if (currentFile && currentFile.startsWith('doc-')) {
      documentStore.updateDocument(currentFile, { title })
    }
  }

  const focusBodyAndInsert = (textToInsert: string) => {
    const editor = editorRef.current
    if (!editor) return

    // 无论正文第一个节点是什么类型（段落/Heading/列表），都在文档最顶部插入一个新的段落
    if (textToInsert && textToInsert.length > 0) {
      editor.commands.insertContentAt(0, {
        type: 'paragraph',
        content: [{ type: 'text', text: textToInsert }]
      })
    } else {
      editor.commands.insertContentAt(0, { type: 'paragraph' })
    }
    // 光标定位到新段落的开头
    editor.commands.setTextSelection(1)
    editor.commands.focus()
  }

  const getBreadcrumbPath = (fileId: string | null) => {
    if (!fileId) return null

    // Mock breadcrumb data based on file type
    const breadcrumbData: Record<string, { workspace: string; path: string[] }> = {
      "claim-chart-1": {
        workspace: "PatX Studio",
        path: ["Patent Analysis Project", "US Patent 123456", "Product Comparison Analysis"],
      },
      "claim-chart-2": {
        workspace: "PatX Studio",
        path: ["Patent Analysis Project", "US Patent 789012", "Competitor Analysis Report"],
      },
      "claim-chart-3": {
        workspace: "PatX Studio",
        path: ["Patent Analysis Project", "Competitor Analysis", "Comprehensive Comparison Chart"],
      },
    }

    return breadcrumbData[fileId] || null
  }

  const getCurrentFileName = () => {
    if (!currentFile) return null

    // For documents, get the title from the document store
    if (currentFile.startsWith('doc-')) {
      const doc = documentStore.getDocument(currentFile)
      return doc?.title || 'Untitled'
    }

    // For claim charts, get the project name
    const chart = claimCharts[currentFile]
    if (chart) {
      return chart.projectName
    }

    return null
  }

  const renderBreadcrumb = () => {
    const fileName = getCurrentFileName()

    return (
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          {!leftPanelOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLeftPanel}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          )}

          {fileName && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{fileName}</span>
            </div>
          )}
        </div>

        {!rightPanelOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRightPanel}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      case "finalized":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderClaimChart = (chartData: ClaimChartData) => {
    return (
      <div className="h-full flex flex-col">
        <Card className="m-4 mb-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{chartData.projectName}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(chartData.status)}>{chartData.status.toUpperCase()}</Badge>
                <Tabs value={activeEditMode} onValueChange={(value) => setActiveEditMode(value as "textarea" | "tiptap")}>
                  <TabsList className="h-8">
                    <TabsTrigger value="textarea" className="text-xs">Simple</TabsTrigger>
                    <TabsTrigger value="tiptap" className="text-xs">Rich Text</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Patent:</span> {chartData.patentNumber}
              </div>
              <div>
                <span className="font-medium">Product:</span> {chartData.productName}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 mx-4 mb-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Claims Analysis</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Claim
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 h-full">
              <ScrollArea className="h-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">Patent Claim</TableHead>
                      <TableHead className="w-[30%]">Product Feature</TableHead>
                      <TableHead className="w-[25%]">Evidence</TableHead>
                      <TableHead className="w-[15%]">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartData.claims.map((claim) => (
                      <TableRow key={claim.id} className="align-top">
                        <TableCell>
                          {activeEditMode === "tiptap" ? (
                            <TiptapEditor
                              content={claim.claimText}
                              onChange={(value) => handleClaimUpdate(chartData.id, claim.id, "claimText", value)}
                            />
                          ) : (
                            <Textarea
                              value={claim.claimText}
                              onChange={(e) => handleClaimUpdate(chartData.id, claim.id, "claimText", e.target.value)}
                              className="min-h-[100px] text-sm"
                              placeholder="Enter patent claim text..."
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {activeEditMode === "tiptap" ? (
                            <TiptapEditor
                              content={claim.productFeature}
                              onChange={(value) => handleClaimUpdate(chartData.id, claim.id, "productFeature", value)}
                            />
                          ) : (
                            <Textarea
                              value={claim.productFeature}
                              onChange={(e) => handleClaimUpdate(chartData.id, claim.id, "productFeature", e.target.value)}
                              className="min-h-[100px] text-sm"
                              placeholder="Describe corresponding product feature..."
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {activeEditMode === "tiptap" ? (
                            <TiptapEditor
                              content={claim.evidence}
                              onChange={(value) => handleClaimUpdate(chartData.id, claim.id, "evidence", value)}
                            />
                          ) : (
                            <Textarea
                              value={claim.evidence}
                              onChange={(e) => handleClaimUpdate(chartData.id, claim.id, "evidence", e.target.value)}
                              className="min-h-[100px] text-sm"
                              placeholder="Reference evidence materials..."
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {activeEditMode === "tiptap" ? (
                            <TiptapEditor
                              content={claim.notes}
                              onChange={(value) => handleClaimUpdate(chartData.id, claim.id, "notes", value)}
                            />
                          ) : (
                            <Textarea
                              value={claim.notes}
                              onChange={(e) => handleClaimUpdate(chartData.id, claim.id, "notes", e.target.value)}
                              className="min-h-[100px] text-sm"
                              placeholder="Analysis notes..."
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderDocument = () => {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-12 pt-8">
              <Input
                value={documentTitle}
                onChange={(e) => handleDocumentTitleUpdate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const input = e.currentTarget
                    const caret = input.selectionStart ?? documentTitle.length
                    const before = documentTitle.slice(0, caret)
                    const after = documentTitle.slice(caret)
                    handleDocumentTitleUpdate(before)
                    // 将尾部文字插入到正文段落并聚焦正文
                    focusBodyAndInsert(after)
                  }
                }}
                className="!text-4xl font-bold bg-transparent border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none p-0 placeholder:text-muted-foreground/50 !h-auto !leading-tight"
                placeholder="Untitled"
                ref={titleInputRef}
              />
            </div>
            <NotionEditor
              content={documentContent}
              onChange={handleDocumentUpdate}
              editable={true}
              placeholder="Press '/' for commands or start typing..."
              onEditorReady={(ed) => {
                if (editorRef) editorRef.current = ed
              }}
              onBackspaceAtBodyStart={(text) => {
                const previousLen = documentTitle.length
                const newTitle = documentTitle + text
                handleDocumentTitleUpdate(newTitle)
                // 聚焦标题并把光标放在原有标题末尾（移动回去的文字之前）
                requestAnimationFrame(() => {
                  const el = titleInputRef.current
                  if (el) {
                    el.focus()
                    el.setSelectionRange(previousLen, previousLen)
                  }
                })
              }}
            />
          </ScrollArea>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card">
      {renderBreadcrumb()}

      <div className="flex-1 overflow-hidden">
        {currentFile && currentFile.startsWith('doc-') ? (
          renderDocument()
        ) : currentFile && claimCharts[currentFile] ? (
          renderClaimChart(claimCharts[currentFile])
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No file selected</p>
              <p className="text-sm">Select a file from the explorer to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
