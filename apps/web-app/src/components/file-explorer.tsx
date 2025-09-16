"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { documentStore, type Document } from "@/lib/stores/document-store"
import {
  ChevronDown,
  ChevronRight,
  File,
  FileText,
  Folder,
  Plus,
  Upload,
  Search,
  MoreHorizontal,
  FilePlus,
  FileImage,
  FilePen as FilePdf,
  Briefcase,
  Layers,
  BookOpen,
  Hash,
  Database,
  Table,
  Stamp,
  Reply,
  CheckSquare,
  Grid3X3,
  Clock,
  Star,
  PanelLeftClose,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadModal } from "@/components/upload-modal"

interface PatentNode {
  id: string
  name: string
  type:
    | "workspace"
    | "matter"
    | "family"
    | "disclosure"
    | "priorartset"
    | "claimset"
    | "specification"
    | "abstract"
    | "figures"
    | "formalcheck"
    | "oa"
    | "oaresponse"
    | "evidencelibrary"
    | "claimchart"
    | "document"
    | "folder"
    | "file"
  children?: PatentNode[]
  extension?: string
  jurisdiction?: "US" | "CN" | "EP" | "JP" | "KR"
  stage?: "draft" | "submitted" | "ready" | "review" | "finalized"
  status?: "active" | "pending" | "completed" | "error"
  assignee?: string
  tags?: string[]
  updatedAt?: string
  counters?: {
    errors?: number
    warnings?: number
    comments?: number
    tasks?: number
  }
  version?: string
  dueDate?: string
}

interface FileExplorerProps {
  onFileSelect: (fileId: string) => void
  currentFile: string | null
  openTabs: string[]
  setOpenTabs: (tabs: string[]) => void
  isOpen: boolean
  onTogglePanel: () => void // Added toggle function prop
}

const mockPatentTree: PatentNode[] = [
  {
    id: "workspace-1",
    name: "Patent Portfolio 2024",
    type: "workspace",
    children: [
      {
        id: "matter-1",
        name: "AI Technology Patents",
        type: "matter",
        jurisdiction: "US",
        stage: "review",
        assignee: "John Smith",
        children: [
          {
            id: "family-1",
            name: "Machine Learning Family",
            type: "family",
            jurisdiction: "US",
            children: [
              {
                id: "claimset-1",
                name: "US Patent Application 17/123456",
                type: "claimset",
                jurisdiction: "US",
                stage: "submitted",
                status: "active",
                counters: { errors: 2, warnings: 1, comments: 3 },
                version: "v2.1",
                dueDate: "2024-12-15",
              },
              {
                id: "specification-1",
                name: "Technical Specification",
                type: "specification",
                jurisdiction: "US",
                stage: "finalized",
                status: "completed",
              },
              {
                id: "claimchart-1",
                name: "Infringement Analysis vs CompetitorX",
                type: "claimchart",
                jurisdiction: "US",
                stage: "draft",
                status: "pending",
                assignee: "Jane Doe",
                counters: { tasks: 5 },
              },
            ],
          },
          {
            id: "family-2",
            name: "Neural Network Family",
            type: "family",
            jurisdiction: "EP",
            children: [
              {
                id: "oa-1",
                name: "Office Action Response",
                type: "oaresponse",
                jurisdiction: "EP",
                stage: "draft",
                status: "error",
                counters: { errors: 1 },
                dueDate: "2024-11-30",
              },
            ],
          },
        ],
      },
      {
        id: "matter-2",
        name: "Blockchain Patents",
        type: "matter",
        jurisdiction: "CN",
        stage: "draft",
        children: [
          {
            id: "evidencelibrary-1",
            name: "Evidence Library",
            type: "evidencelibrary",
            children: [
              {
                id: "evidence-1",
                name: "Technical Whitepaper.pdf",
                type: "file",
                extension: "pdf",
              },
              {
                id: "evidence-2",
                name: "System Architecture.png",
                type: "file",
                extension: "png",
              },
            ],
          },
        ],
      },
    ],
  },
]

export function FileExplorer({
  onFileSelect,
  currentFile,
  openTabs,
  setOpenTabs,
  isOpen,
  onTogglePanel,
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["workspace-1", "matter-1", "family-1", "documents-folder"]))
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"tree" | "group" | "timeline" | "saved">("tree")
  const [filterStage, setFilterStage] = useState<string>("all")
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>("all")
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

  const handleCreateDocument = () => {
    const newDoc = documentStore.createDocument('New Document')
    onFileSelect(newDoc.id)
    
    // Add to open tabs if not already there
    if (!openTabs.includes(newDoc.id)) {
      setOpenTabs([...openTabs, newDoc.id])
    }
  }

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleFileClick = (fileId: string) => {
    onFileSelect(fileId)
    if (!openTabs.includes(fileId)) {
      setOpenTabs([...openTabs, fileId])
    }
  }

  const handleUploadSuccess = (uploadedFiles: any[]) => {
    console.log("Upload successful:", uploadedFiles)
    // Here you would typically refresh the file list or update the state
    // For now, we'll just log the output.
  }

  const getNodeIcon = (type: string, extension?: string) => {
    switch (type) {
      case "workspace":
        return <Briefcase className="h-4 w-4 text-blue-600" />
      case "matter":
        return <Layers className="h-4 w-4 text-purple-600" />
      case "family":
        return <Layers className="h-4 w-4 text-green-600" />
      case "disclosure":
        return <BookOpen className="h-4 w-4 text-orange-600" />
      case "priorartset":
        return <Search className="h-4 w-4 text-gray-600" />
      case "claimset":
        return <Hash className="h-4 w-4 text-indigo-600" />
      case "specification":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "abstract":
        return <FileText className="h-4 w-4 text-gray-500" />
      case "figures":
        return <FileImage className="h-4 w-4 text-green-500" />
      case "formalcheck":
        return <CheckSquare className="h-4 w-4 text-teal-600" />
      case "oa":
        return <Stamp className="h-4 w-4 text-red-600" />
      case "oaresponse":
        return <Reply className="h-4 w-4 text-blue-600" />
      case "evidencelibrary":
        return <Database className="h-4 w-4 text-amber-600" />
      case "claimchart":
        return <Table className="h-4 w-4 text-primary" />
      case "document":
        return <FileText className="h-4 w-4 text-primary" />
      case "folder":
        return <Folder className="h-4 w-4 text-primary" />
      case "file":
        switch (extension) {
          case "pdf":
            return <FilePdf className="h-4 w-4 text-red-500" />
          case "png":
          case "jpg":
          case "jpeg":
            return <FileImage className="h-4 w-4 text-blue-500" />
          default:
            return <File className="h-4 w-4 text-muted-foreground" />
        }
      default:
        return <File className="h-4 w-4 text-muted-foreground" />
    }
  }

  const renderJurisdictionBadge = (jurisdiction?: string) => {
    if (!jurisdiction) return null
    const colors = {
      US: "bg-blue-100 text-blue-800",
      CN: "bg-red-100 text-red-800",
      EP: "bg-green-100 text-green-800",
      JP: "bg-purple-100 text-purple-800",
      KR: "bg-orange-100 text-orange-800",
    }
    return (
      <Badge variant="secondary" className={`text-xs px-1 py-0 ${colors[jurisdiction]}`}>
        {jurisdiction}
      </Badge>
    )
  }

  const renderCounterBadges = (counters?: PatentNode["counters"]) => {
    // Temporarily return null to avoid contrast issues
    return null

    // Original code preserved for future use
    /*
    if (!counters) return null
    return (
      <div className="flex items-center gap-1">
        {counters.errors && counters.errors > 0 && (
          <span className="inline-flex items-center text-xs px-1 py-0 h-4 rounded text-white font-medium" style={{ backgroundColor: '#dc2626' }}>
            <AlertCircle className="h-2 w-2 mr-1" />
            {counters.errors}
          </span>
        )}
        {counters.warnings && counters.warnings > 0 && (
          <span className="inline-flex items-center text-xs px-1 py-0 h-4 rounded text-white font-medium" style={{ backgroundColor: '#ea580c' }}>
            <AlertTriangle className="h-2 w-2 mr-1" />
            {counters.warnings}
          </span>
        )}
        {counters.tasks && counters.tasks > 0 && (
          <span className="inline-flex items-center text-xs px-1 py-0 h-4 rounded text-white font-medium" style={{ backgroundColor: '#2563eb' }}>
            <Circle className="h-2 w-2 mr-1" />
            {counters.tasks}
          </span>
        )}
      </div>
    )
    */
  }

  const getPatentTree = (documents: Document[]): PatentNode[] => {
    const documentNodes: PatentNode[] = documents.map(doc => ({
      id: doc.id,
      name: doc.title,
      type: 'document' as const,
      updatedAt: doc.updatedAt.toISOString(),
      extension: 'md'
    }))

    const mockTree = mockPatentTree.slice()
    
    // Add documents folder at the beginning
    mockTree.unshift({
      id: "documents-folder",
      name: "My Documents",
      type: "folder",
      children: documentNodes
    })
    
    return mockTree
  }

  const renderFileNode = (node: PatentNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id)
    const isSelected = currentFile === node.id
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id}>
        <div
          className={`group flex items-center gap-1 py-1 px-2 rounded-sm transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
            isSelected
              ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary"
              : "hover:bg-sidebar-accent"
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => (hasChildren ? toggleFolder(node.id) : handleFileClick(node.id))}
          role="treeitem"
          aria-selected={isSelected}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <div className="w-4" />
          )}

          {getNodeIcon(node.type, node.extension)}

          <span className={`flex-1 text-sm truncate group-hover:text-sidebar-accent-foreground ${isSelected ? "font-medium" : ""}`}>
            {node.name}
          </span>

          <div className={`flex items-center gap-1 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
            {renderJurisdictionBadge(node.jurisdiction)}
            {renderCounterBadges(node.counters)}
            {node.version && (
              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                {node.version}
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-6 p-0 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Open With...</DropdownMenuItem>
              <DropdownMenuItem>Compare</DropdownMenuItem>
              <DropdownMenuItem>Validate</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ask Agent</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {hasChildren && isExpanded && <div>{node.children!.map((child) => renderFileNode(child, depth + 1))}</div>}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-sidebar-foreground">Explorer</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onTogglePanel}>
              <PanelLeftClose className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={handleCreateDocument}
              title="Create New Document"
            >
              <FilePlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Button
            variant={viewMode === "tree" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("tree")}
            className="h-7 px-2"
          >
            <Folder className="h-3 w-3" />
          </Button>
          <Button
            variant={viewMode === "group" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("group")}
            className="h-7 px-2"
          >
            <Grid3X3 className="h-3 w-3" />
          </Button>
          <Button
            variant={viewMode === "timeline" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("timeline")}
            className="h-7 px-2"
          >
            <Clock className="h-3 w-3" />
          </Button>
          <Button
            variant={viewMode === "saved" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("saved")}
            className="h-7 px-2"
          >
            <Star className="h-3 w-3" />
          </Button>
        </div>

        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="finalized">Finalized</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterJurisdiction} onValueChange={setFilterJurisdiction}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="EP">EP</SelectItem>
              <SelectItem value="CN">CN</SelectItem>
              <SelectItem value="JP">JP</SelectItem>
              <SelectItem value="KR">KR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1">
        <div className="p-1">{getPatentTree(documents).map((node) => renderFileNode(node))}</div>
      </ScrollArea>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  )
}
