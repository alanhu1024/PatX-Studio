"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Target, Download, Zap } from "lucide-react"

interface TalkToSalesFormProps {
  isModal?: boolean
  onClose?: () => void
}

export default function TalkToSalesForm({ isModal = false, onClose }: TalkToSalesFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    companySize: "",
    currentProcess: "",
    message: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    
    // 这里可以添加实际的表单提交逻辑
    // 比如调用API或发送邮件等
    
    if (isModal && onClose) {
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className={`w-full ${isModal ? "max-w-2xl mx-auto" : "max-w-6xl mx-auto px-4 py-8"}`}>
      <div className={`grid ${isModal ? "grid-cols-1" : "lg:grid-cols-2"} gap-8 items-center`}>
        {/* Benefits Section - 左侧产品介绍 */}
        {!isModal && (
          <div className="flex flex-col justify-center items-start h-full">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
                AI Patent Claim Charts in Minutes
              </h1>
              <p className="text-lg text-gray-600 text-pretty">
                Cut drafting time from 3 hours to 20 minutes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Process patents in under 30 minutes.
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    95% accuracy with verifiable citations.
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Download className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Export court-ready charts instantly.
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Focus on strategy, not paperwork.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Section - 右侧表单 */}
        <div className={isModal ? "w-full" : ""}>
          <Card className="border-slate-200 shadow-sm bg-[#4A9EFF]/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isModal ? "Talk to Sales" : "Schedule Demo"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                See how AI can transform your patent workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-slate-300 focus:ring-[#4A9EFF] focus:border-[#4A9EFF] bg-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-slate-300 focus:ring-[#4A9EFF] focus:border-[#4A9EFF] bg-white h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Business Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-slate-300 focus:ring-[#4A9EFF] focus:border-[#4A9EFF] bg-white h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                      Company *
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="border-slate-300 focus:ring-[#4A9EFF] focus:border-[#4A9EFF] bg-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                      Job Title *
                    </Label>
                    <Input
                      id="jobTitle"
                      type="text"
                      required
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      className="border-slate-300 focus:ring-[#4A9EFF] focus:border-[#4A9EFF] bg-white h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    What are your patent analysis needs?
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your current challenges..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="border-slate-300 focus:ring-[#4A9EFF] focus:border-[#4A9EFF] min-h-[90px] bg-white resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="border-slate-400"
                  />
                  <Label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                    I agree to receive communications and can unsubscribe anytime.
                  </Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium h-12 text-base"
                    disabled={!formData.agreeToTerms}
                  >
                    Schedule Demo
                  </Button>
                  {isModal && onClose && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-white h-12"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
