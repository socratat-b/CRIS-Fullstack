// src/app/page.tsx
"use client"

import { useKioskStore } from "@/state/use-kiosk-store"
import { SuccessStep } from "@/components/kiosk/success-step"
import { SelectServiceStep } from "@/components/kiosk/select-service"
import { TrueCopyRequest } from "@/components/kiosk/true-copy-request"
import { VerifyRegistration } from "@/components/kiosk/verify-registration"

export default function HomePage() {
  const { currentStep, service } = useKioskStore()

  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {currentStep === 1 && <SelectServiceStep />}
        {currentStep === 2 && service === "trueCopy" && <TrueCopyRequest />}
        {currentStep === 2 && service === "verify" && <VerifyRegistration />}
        {currentStep === 3 && <SuccessStep />}
      </div>
    </div>
  )
}
