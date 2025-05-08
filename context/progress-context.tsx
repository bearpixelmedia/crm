"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { ProgressModal } from "@/components/progress/progress-modal"

interface ProgressContextType {
  openProgressModal: () => void
  closeProgressModal: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProgressModal = () => setIsModalOpen(true)
  const closeProgressModal = () => setIsModalOpen(false)

  return (
    <ProgressContext.Provider value={{ openProgressModal, closeProgressModal }}>
      {children}
      <ProgressModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
