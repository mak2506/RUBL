"use client"

import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, Flame } from "lucide-react"

interface CompletionScreenProps {
  totalCards: number
  onRestart: () => void
}

export function CompletionScreen({ totalCards, onRestart }: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
      <div className="relative mb-8">
        <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Trophy className="size-12 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 size-10 rounded-full bg-chart-3/20 flex items-center justify-center">
          <Flame className="size-6 text-chart-3" />
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-2 font-[family-name:var(--font-heading)]">
        All Caught Up!
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-2">
        {"You've completed all"} {totalCards} {"cards for today. Your AI knowledge is growing stronger."}
      </p>
      <p className="text-xs text-muted-foreground/60 mb-8">
        Come back tomorrow for fresh content
      </p>

      <Button
        onClick={onRestart}
        variant="outline"
        className="rounded-xl h-11 px-8 gap-2 font-bold"
      >
        <RotateCcw className="size-4" />
        Review Again
      </Button>
    </div>
  )
}
