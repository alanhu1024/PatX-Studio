"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDropzone } from "react-dropzone"
import { UploadCloud, File as FileIcon, X } from "lucide-react"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadSuccess: (uploadedFiles: any[]) => void
}

export function UploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: UploadModalProps) {
  const [fileType, setFileType] = useState("patent")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
      "text/plain": [".txt"],
    },
  })

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      // Here you might want to show a toast message.
      console.log("No files selected")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
    // Also appending fileType, though the backend might not use it yet.
    formData.append("fileType", fileType)

    try {
      const response = await fetch("/api/features/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        onUploadSuccess(result.documents)
        setFiles([])
        onClose()
      } else {
        // Handle server errors
        console.error("Upload failed")
      }
    } catch (error) {
      // Handle network errors
      console.error("An error occurred during upload", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Upload Files</DialogTitle>
          <DialogDescription>
            Upload patent files or comparison documents to your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="file-type" className="text-right font-semibold">
              File Type
            </label>
            <Select value={fileType} onValueChange={setFileType}>
              <SelectTrigger id="file-type" className="col-span-3">
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patent">Patent Files</SelectItem>
                <SelectItem value="comparison">Comparison Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label className="text-right font-semibold pt-2">
              Select Files
            </label>
            <div className="col-span-3">
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full h-32 px-4 text-center border-2 border-dashed rounded-lg cursor-pointer
                ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 dark:border-gray-600 hover:border-primary/50"}`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                <p className="font-semibold">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, DOCX, TXT files (MAX. 10MB each)
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeFile(file)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading || files.length === 0}>
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
