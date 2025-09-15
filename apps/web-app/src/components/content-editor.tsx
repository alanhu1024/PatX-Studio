"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Plus, Save, FileText, Settings, PanelLeft, MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

  const renderBreadcrumb = () => {
    if (!currentFile) return null

    const breadcrumbData = getBreadcrumbPath(currentFile)
    if (!breadcrumbData) return null

    const { workspace, path } = breadcrumbData

    return (
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          {!leftPanelOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLeftPanel}
              className="h-6 w-6 p-0 mr-2 text-muted-foreground hover:text-foreground"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          )}

          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground">
            {workspace}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>

          {path.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-muted-foreground/60 mx-1 text-xs">/</span>
              {index === path.length - 1 ? (
                <span className="text-xs text-foreground/80">{item}</span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {item}
                </Button>
              )}
            </div>
          ))}
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
                          <Textarea
                            value={claim.claimText}
                            className="min-h-[100px] text-sm"
                            placeholder="Enter patent claim text..."
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={claim.productFeature}
                            className="min-h-[100px] text-sm"
                            placeholder="Describe corresponding product feature..."
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={claim.evidence}
                            className="min-h-[100px] text-sm"
                            placeholder="Reference evidence materials..."
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={claim.notes}
                            className="min-h-[100px] text-sm"
                            placeholder="Analysis notes..."
                          />
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

  return (
    <div className="h-full flex flex-col bg-card">
      {renderBreadcrumb()}

      <div className="flex-1 overflow-hidden">
        {currentFile && mockClaimCharts[currentFile] ? (
          renderClaimChart(mockClaimCharts[currentFile])
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
