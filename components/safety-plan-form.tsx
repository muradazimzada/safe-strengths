"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { steps } from "@/data/steps"
import SummaryPage from "@/components/summary-page"

type FormData = {
  [key: string]: string | string[]
}

export default function SafetyPlanForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleNext = () => {
    // Validate current step before proceeding
    const errors: string[] = []

    if (currentStepData.questions) {
      currentStepData.questions.forEach((q) => {
        if (q.type === "contact-list") {
          // Check if at least one contact is filled
          const hasContact = [1, 2, 3].some((i) => formData[`${q.id}-name-${i}`] || formData[`${q.id}-phone-${i}`])
          if (!hasContact) {
            errors.push("Please provide at least one emergency contact.")
          }
        } else {
          // Check if question is answered
          const answer = formData[q.id]
          if (!answer || (typeof answer === "string" && answer.trim() === "")) {
            errors.push(`Please answer: ${q.label}`)
          }
        }
      })
    }

    setValidationErrors(errors)

    if (errors.length === 0 && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleInputChange = (id: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const currentStepData = steps[currentStep]

  if (currentStep === steps.length) {
    return <SummaryPage formData={formData} />
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4 font-sans">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 md:p-8 shadow-lg">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">{currentStepData.title}</h1>

          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Image Section */}
            {currentStepData.image && (
              <div className="flex justify-center">
                <Image
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  width={currentStepData.imageWidth || 200}
                  height={currentStepData.imageHeight || 150}
                  className="object-contain"
                />
              </div>
            )}

            {/* Content Blocks */}
            {currentStepData.contentBlocks?.map((block, index) => (
              <div key={index} className="text-center">
                {block.heading && <h2 className="text-lg font-semibold text-gray-800 mb-4">{block.heading}</h2>}
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.text }} />
              </div>
            ))}

            {/* Quote Section with Woman */}
            {currentStepData.quote && (
              <div className="flex flex-col md:flex-row items-center gap-6 bg-amber-100 rounded-2xl p-6">
                {currentStepData.step === 2 && (
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/2.jpg"
                      alt="Woman speaking"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <blockquote className="text-lg italic text-amber-800 text-center md:text-left">
                    "{currentStepData.quote}"
                  </blockquote>
                </div>
              </div>
            )}

            {/* Questions */}
            {currentStepData.questions && (
              <div className="space-y-6">
                {currentStepData.questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <Label htmlFor={q.id} className="block text-base font-medium text-gray-700">
                      {q.label}
                    </Label>
                    {q.type === "textarea" && (
                      <Textarea
                        id={q.id}
                        placeholder="Describe here..."
                        className="min-h-[80px] border-gray-300 focus:ring-amber-500 focus:border-amber-500"
                        value={(formData[q.id] as string) || ""}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                      />
                    )}
                    {q.type === "radio" && (
                      <RadioGroup
                        value={(formData[q.id] as string) || ""}
                        onValueChange={(value) => handleInputChange(q.id, value)}
                        className="flex gap-6"
                      >
                        {q.options?.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                            <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    {q.type === "text" && (
                      <Input
                        id={q.id}
                        type="text"
                        placeholder="Write here..."
                        className="border-gray-300 focus:ring-amber-500 focus:border-amber-500"
                        value={(formData[q.id] as string) || ""}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                      />
                    )}
                    {q.type === "contact-list" && (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder={`Name ${i}`}
                              value={(formData[`${q.id}-name-${i}`] as string) || ""}
                              onChange={(e) => handleInputChange(`${q.id}-name-${i}`, e.target.value)}
                            />
                            <Input
                              placeholder={`Phone ${i}`}
                              value={(formData[`${q.id}-phone-${i}`] as string) || ""}
                              onChange={(e) => handleInputChange(`${q.id}-phone-${i}`, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-red-800 font-medium mb-2">Please complete the following:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6">
            {currentStep > 0 ? (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-6 py-2 rounded-full border border-amber-300"
              >
                ← Back
              </Button>
            ) : (
              <div />
            )}

            <Button
              onClick={handleNext}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-2 rounded-full font-medium"
            >
              {currentStepData.buttonText || "Continue →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
