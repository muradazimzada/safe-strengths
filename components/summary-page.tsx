"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { saveSafetyPlan } from "@/lib/actions"

interface SummaryPageProps {
  formData: { [key: string]: string | string[] }
}

export default function SummaryPage({ formData }: SummaryPageProps) {
  const summaryRef = useRef<HTMLDivElement>(null)

  const handlePrint = async () => {
    const input = summaryRef.current
    if (input) {
      // Save to database first
      try {
        await saveSafetyPlan({ responses: formData })
        console.log("Plan saved successfully")
      } catch (error) {
        console.error("Failed to save plan:", error)
        // Optionally, inform the user that saving failed but they can still print.
      }

      // Then generate PDF
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const ratio = canvasWidth / canvasHeight
        const width = pdfWidth
        const height = width / ratio

        let position = 0
        let heightLeft = canvasHeight

        pdf.addImage(imgData, "PNG", 0, position, width, height)
        heightLeft -= pdf.internal.pageSize.getHeight() * (canvasWidth / pdf.internal.pageSize.getWidth())

        while (heightLeft > 0) {
          position = heightLeft - canvasHeight
          pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, position, width, height)
          heightLeft -= pdf.internal.pageSize.getHeight() * (canvasWidth / pdf.internal.pageSize.getWidth())
        }

        pdf.save("SafeStrengths_Safety_Plan.pdf")
      })
    }
  }

  const getAnswer = (id: string) => {
    const answer = formData[id]
    if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      return <span className="text-gray-500 italic">No answer provided.</span>
    }
    return Array.isArray(answer) ? answer.join(", ") : answer
  }

  return (
    <div className="bg-amber-50 min-h-screen p-4 font-sans">
      <div
        ref={summaryRef}
        className="container mx-auto max-w-4xl bg-white rounded-3xl border-4 border-amber-300 p-6 md:p-10 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-amber-800 text-center mb-4">Your SafeStrengths Safety Plan</h1>
        <p className="text-center text-gray-600 mb-8">
          Remember to keep this plan in a safe location. Review and update it as needed. Trust your instincts—your
          safety is the priority!
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">
              Warning Signs for You
            </h2>
            <p className="mb-2">
              <strong>When anger or tension starts to build at home, you notice the following warning signs:</strong>
              <br /> {getAnswer("q3_1")}
            </p>
            <p className="mb-2">
              <strong>
                When things at home start to feel tense or when people begin treating you in a hurtful way, you notice:
              </strong>
              <br /> {getAnswer("q3_2")}
            </p>
            <p className="mb-2">
              <strong>The bodily sensations or thoughts that alert you when you might be in danger are:</strong>
              <br /> {getAnswer("q3_3")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">
              De-escalation Strategies
            </h2>
            <p className="mb-2">
              <strong>
                When your husband or partner starts getting upset, things that have helped calm him down are:
              </strong>
              <br /> {getAnswer("q4_1")}
            </p>
            <p className="mb-2">
              <strong>
                Here's what has helped keep things from escalating when others in your home acted in a hurtful or
                harmful way:
              </strong>
              <br /> {getAnswer("q4_2")}
            </p>
            <p className="mb-2">
              <strong>
                When your body feels tight or your heart races, you said this or these things have helped you feel
                calmer and think more clearly:
              </strong>
              <br /> {getAnswer("q4_3")}
            </p>
            <p className="mb-2">
              <strong>
                When you realize you're in danger, here's what you think you can do right away to protect yourself and
                stay safe:
              </strong>
              <br /> {getAnswer("q4_4")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">
              Your Personal Escape Plan
            </h2>
            <p className="mb-2">
              <strong>If you decide to leave, these are the important things you'll try to take with you:</strong>
              <br /> {getAnswer("q7_1")}
            </p>
            <p className="mb-2">
              <strong>Places you can go to feel safe:</strong>
              <br /> {getAnswer("q7_2")}
            </p>
            <p className="mb-2">
              <strong>Transportation options you can access safely:</strong>
              <br /> {getAnswer("q7_3")}
            </p>
            <p className="mb-2">
              <strong>Your backup options are:</strong>
              <br /> {getAnswer("q7_4")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">
              Building a Support System
            </h2>
            <p className="mb-2">
              <strong>People you can call for help:</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>
                {getAnswer("q12-name-1")} - {getAnswer("q12-phone-1")}
              </li>
              <li>
                {getAnswer("q12-name-2")} - {getAnswer("q12-phone-2")}
              </li>
              <li>
                {getAnswer("q12-name-3")} - {getAnswer("q12-phone-3")}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">
              Emergency Helplines
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold">National Domestic Violence Hotline</h3>
                <p>Call: 1-800-799-7233</p>
                <p>Text: "START" to 88788</p>
                <p>thehotline.org – live chat available</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold">Crisis Text Line</h3>
                <p>Text "HOME" to 741741</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold">National Suicide & Crisis Lifeline</h3>
                <p>Call or Text 988</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold">Human Trafficking Hotline</h3>
                <p>Call 1-888-373-7888</p>
                <p>Text "BEFREE" (233733)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <Button onClick={handlePrint} size="lg" className="bg-amber-600 hover:bg-amber-700">
          <Printer className="w-5 h-5 mr-2" />
          Print your SafeStrengths Safety Plan
        </Button>
      </div>
    </div>
  )
}
