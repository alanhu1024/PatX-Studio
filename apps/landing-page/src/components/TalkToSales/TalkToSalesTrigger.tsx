"use client"

import { Button } from "@/components/ui/button"
import { useTalkToSales } from "@/hooks/useTalkToSales"
import TalkToSalesModal from "./TalkToSalesModal"

interface TalkToSalesTriggerProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children?: string
  className?: string
}

export default function TalkToSalesTrigger({ 
  variant = "default", 
  size = "default", 
  children = "Talk to Sales",
  className 
}: TalkToSalesTriggerProps) {
  const { isOpen, open, close } = useTalkToSales()

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        onClick={open}
        className={`${variant === "default" ? "bg-orange-600 hover:bg-orange-700 text-white" : ""} ${className}`}
      >
        {children}
      </Button>
      
      <TalkToSalesModal open={isOpen} onOpenChange={close} />
    </>
  )
}
