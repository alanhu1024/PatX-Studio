"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import TalkToSalesForm from "./TalkToSalesForm"

interface TalkToSalesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TalkToSalesModal({ open, onOpenChange }: TalkToSalesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <h2>联系销售</h2>
        </DialogHeader>
        <TalkToSalesForm isModal={true} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
