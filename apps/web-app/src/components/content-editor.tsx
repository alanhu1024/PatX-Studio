"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Plus, Save, FileText, Settings, PanelLeft, MessageSquare, Lock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TiptapEditor } from "@/components/tiptap-editor"
import { NotionEditor } from "@/components/notion-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { documentStore } from "@/lib/stores/document-store"

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

// 依据权重截断字符串：ASCII 字符权重 0.5，非 ASCII 字符权重 1
const truncateByWeightedLength = (input: string, maxUnits: number): string => {
  let currentUnits = 0
  let output = ""
  let didTruncate = false

  for (const ch of input) {
    const codePoint = ch.codePointAt(0) ?? 0
    const weight = codePoint <= 0x7f ? 0.5 : 1
    if (currentUnits + weight > maxUnits) {
      didTruncate = true
      break
    }
    output += ch
    currentUnits += weight
  }

  return didTruncate ? output + "…" : output
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
  const [isBreadcrumbEditing, setIsBreadcrumbEditing] = useState(false)
  const [breadcrumbEditValue, setBreadcrumbEditValue] = useState('')
  const [displayTitle, setDisplayTitle] = useState('')
  const editorRef = useRef<any | null>(null)
  const titleInputRef = useRef<HTMLTextAreaElement | null>(null)
  const breadcrumbEditRef = useRef<HTMLTextAreaElement | null>(null)
  const titleFocusDocRef = useRef<string | null>(null)

  useEffect(() => {
    if (currentFile && currentFile.startsWith('doc-')) {
      const doc = documentStore.getDocument(currentFile)
      if (doc) {
        setDocumentContent(doc.content)
        setDocumentTitle(doc.title)
        setBreadcrumbEditValue(doc.title)
        setDisplayTitle(doc.title)
        
        // 延迟调整标题框高度，确保DOM已更新
        setTimeout(() => {
          if (titleInputRef.current) {
            const target = titleInputRef.current
            target.style.height = 'auto'
            target.style.height = target.scrollHeight + 'px'
          }
        }, 0)
      } else {
        // 如果文档不存在，设置默认值
        setDocumentContent('')
        setDocumentTitle('')
        setBreadcrumbEditValue('')
        setDisplayTitle('')
      }
    } else if (currentFile && claimCharts[currentFile]) {
      const projectName = claimCharts[currentFile].projectName
      setBreadcrumbEditValue(projectName)
      setDisplayTitle(projectName)
    }
  }, [currentFile, claimCharts])

  useEffect(() => {
    if (!currentFile || !currentFile.startsWith('doc-')) {
      titleFocusDocRef.current = null
      return
    }

    if (documentTitle !== '') {
      titleFocusDocRef.current = null
      return
    }

    if (!editorRef.current) {
      return
    }

    if (titleFocusDocRef.current === currentFile) {
      return
    }

    titleFocusDocRef.current = currentFile

    const editor = editorRef.current
    const raf = requestAnimationFrame(() => {
      if (!editorRef.current) return
      editorRef.current.chain().focus().setTextSelection({ from: 1, to: 1 }).run()
    })

    return () => cancelAnimationFrame(raf)
  }, [currentFile, documentTitle])

  // 点击外部关闭编辑框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isBreadcrumbEditing && breadcrumbEditRef.current && !breadcrumbEditRef.current.contains(event.target as Node)) {
        handleBreadcrumbEditSave()
      }
    }

    if (isBreadcrumbEditing) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isBreadcrumbEditing])

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
      const existingDoc = documentStore.getDocument(currentFile)
      if (!existingDoc || existingDoc.content !== content) {
        documentStore.updateDocument(currentFile, { content })
      }
    }
  }

  const handleDocumentTitleUpdate = (title: string) => {
    setDocumentTitle(title)
    setDisplayTitle(title) // 同时更新显示标题，确保面包屑同步
    if (currentFile && currentFile.startsWith('doc-')) {
      const existingDoc = documentStore.getDocument(currentFile)
      if (!existingDoc || existingDoc.title !== title) {
        documentStore.updateDocument(currentFile, { title })
      }
    }
  }

  const handleBreadcrumbEditStart = () => {
    // 获取当前标题内容
    let currentTitle = ''
    if (currentFile && currentFile.startsWith('doc-')) {
      currentTitle = documentTitle || ''
    } else if (currentFile && claimCharts[currentFile]) {
      currentTitle = claimCharts[currentFile].projectName
    }
    
    // 设置编辑框的初始值
    setBreadcrumbEditValue(currentTitle)
    setDisplayTitle(currentTitle)
    
    setIsBreadcrumbEditing(true)
    // 延迟聚焦，确保DOM已更新
    setTimeout(() => {
      if (breadcrumbEditRef.current) {
        breadcrumbEditRef.current.focus()
        breadcrumbEditRef.current.select()
        
        // 初始化时也应用自适应高度
        const target = breadcrumbEditRef.current
        target.style.height = 'auto'
        const scrollHeight = target.scrollHeight
        const lineHeight = 24 // 根据 text-sm 的行高计算
        const maxHeight = lineHeight * 5 // 5行的最大高度
        
        if (scrollHeight <= maxHeight) {
          // 5行以内，自适应高度
          target.style.height = scrollHeight + 'px'
        } else {
          // 超过5行，固定最大高度并显示滚动条
          target.style.height = maxHeight + 'px'
        }
      }
    }, 0)
  }

  const handleBreadcrumbEditSave = () => {
    // 对于 claim charts，需要在这里保存项目名称
    if (currentFile && claimCharts[currentFile]) {
      setClaimCharts(prev => ({
        ...prev,
        [currentFile]: {
          ...prev[currentFile],
          projectName: breadcrumbEditValue
        }
      }))
    }
    // 文档的标题已经在 handleBreadcrumbEditChange 中实时保存了
    setIsBreadcrumbEditing(false)
  }

  const handleBreadcrumbEditChange = (value: string) => {
    setBreadcrumbEditValue(value)
    setDisplayTitle(value)
    // 同时更新文档标题，保持与标题框同步
    setDocumentTitle(value)
    
    // 实时保存到文档存储，不需要等待回车
    if (currentFile && currentFile.startsWith('doc-')) {
      documentStore.updateDocument(currentFile, { title: value })
    }
    
    // 如果编辑器已加载，直接更新 H1 标题
    if (editorRef.current && currentFile && currentFile.startsWith('doc-')) {
      const editor = editorRef.current
      const doc = editor.state.doc
      
      // 查找第一个 H1 节点的位置
      let h1Pos = null
      doc.descendants((node: any, pos: any) => {
        if (node.type.name === 'heading' && node.attrs.level === 1) {
          h1Pos = pos
          return false // 停止遍历
        }
      })
      
      if (h1Pos !== null) {
        // 更新现有的 H1 标题
        const tr = editor.state.tr
        tr.replaceWith(h1Pos, h1Pos + doc.child(h1Pos).nodeSize, 
          editor.schema.nodes.heading.create({ level: 1 }, 
            editor.schema.text(value)))
        editor.view.dispatch(tr)
      } else {
        // 如果没有 H1，在文档开头插入一个
        const tr = editor.state.tr
        tr.insertContentAt(0, `<h1>${value}</h1>`)
        editor.view.dispatch(tr)
      }
    }
  }

  const handleBreadcrumbEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBreadcrumbEditSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsBreadcrumbEditing(false)
      // 恢复原始值
      if (currentFile && currentFile.startsWith('doc-')) {
        const doc = documentStore.getDocument(currentFile)
        const originalTitle = doc?.title || ''
        setBreadcrumbEditValue(originalTitle)
        setDisplayTitle(originalTitle)
        setDocumentTitle(originalTitle) // 同时恢复标题框
      } else if (currentFile && claimCharts[currentFile]) {
        const originalTitle = claimCharts[currentFile].projectName
        setBreadcrumbEditValue(originalTitle)
        setDisplayTitle(originalTitle)
        // 对于 claim chart，不需要更新 documentTitle
      }
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

    // 如果正在编辑，返回显示标题
    if (isBreadcrumbEditing) {
      return displayTitle || 'New Page'
    }

    // For documents, get the title from the current state (documentTitle)
    if (currentFile.startsWith('doc-')) {
      return documentTitle || 'New Page'
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
    const displayName = fileName ? truncateByWeightedLength(fileName, 20) : null

    return (
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-2">
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
              <div 
                className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-muted cursor-pointer"
                onClick={handleBreadcrumbEditStart}
              >
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground" title={fileName}>
                  {displayName}
                </span>
                <Lock className="h-3 w-3 text-muted-foreground" />
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
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

        {/* 悬浮编辑框 */}
        {isBreadcrumbEditing && (
          <div className="absolute top-full left-4 z-50 mt-1 w-96 max-w-md">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex items-start gap-2">
              <FileText className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <Textarea
                ref={breadcrumbEditRef}
                value={breadcrumbEditValue}
                onChange={(e) => handleBreadcrumbEditChange(e.target.value)}
                onKeyDown={handleBreadcrumbEditKeyDown}
                className="border-0 focus:ring-0 focus:outline-none text-sm text-gray-500 bg-transparent p-0 flex-1 resize-none min-h-[1.5rem] max-h-[7.5rem] overflow-y-auto"
                placeholder="New Page"
                autoFocus
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '1.5rem',
                  maxHeight: '7.5rem', // 约5行的高度
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  // 重置高度以获取真实的内容高度
                  target.style.height = 'auto'
                  const scrollHeight = target.scrollHeight
                  const lineHeight = 24 // 根据 text-sm 的行高计算
                  const maxHeight = lineHeight * 5 // 5行的最大高度
                  
                  if (scrollHeight <= maxHeight) {
                    // 5行以内，自适应高度
                    target.style.height = scrollHeight + 'px'
                  } else {
                    // 超过5行，固定最大高度并显示滚动条
                    target.style.height = maxHeight + 'px'
                  }
                }}
              />
            </div>
          </div>
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
    // 确保总是有 H1 标题，即使文档为空
    let fullContent
    if (documentTitle) {
      fullContent = `<h1>${documentTitle}</h1>${documentContent}`
    } else {
      // 如果没有标题，创建一个空的 H1 标题
      fullContent = `<h1></h1>${documentContent}`
    }

    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-12 pt-8">
              <NotionEditor
                content={fullContent}
                onChange={(content) => {
                  // 解析内容，分离标题和正文
                  const titleMatch = content.match(/^<h1[^>]*>(.*?)<\/h1>/)
                  if (titleMatch) {
                    const newTitle = titleMatch[1]
                    const newContent = content.replace(/^<h1[^>]*>.*?<\/h1>\s*/, '')
                    handleDocumentTitleUpdate(newTitle)
                    handleDocumentUpdate(newContent)
                  } else {
                    // 如果没有标题，确保有一个空的 H1 标题
                    const newContent = `<h1></h1>${content}`
                    handleDocumentTitleUpdate('')
                    handleDocumentUpdate(content)
                    
                    // 如果编辑器已加载，确保 H1 标题存在
                    if (editorRef.current) {
                      const editor = editorRef.current
                      const doc = editor.state.doc
                      
                      // 检查是否已经有 H1 标题
                      let hasH1 = false
                      doc.descendants((node: any) => {
                        if (node.type.name === 'heading' && node.attrs.level === 1) {
                          hasH1 = true
                          return false
                        }
                      })
                      
                      // 如果没有 H1，在文档开头插入一个
                      if (!hasH1) {
                        const tr = editor.state.tr
                        tr.insertContentAt(0, '<h1></h1>')
                        editor.view.dispatch(tr)
                      }
                    }
                  }
                }}
                editable={true}
                placeholder="Press '/' for commands or start typing..."
                onEditorReady={(ed) => {
                  if (editorRef) editorRef.current = ed
                }}
                onBackspaceAtBodyStart={(text) => {
                  // 当在正文开头按退格时，将文字移到标题
                  const newTitle = documentTitle + text
                  handleDocumentTitleUpdate(newTitle)
                }}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
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
