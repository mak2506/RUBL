"use client"

import { Progress } from "@/components/ui/progress"
import { Flame, Zap } from "lucide-react"

interface AppHeaderProps {
  currentIndex: number
  totalCards: number
  streak: number
}

export function AppHeader({ currentIndex, totalCards, streak }: AppHeaderProps) {
  const progressValue = ((currentIndex + 1) / totalCards) * 100

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="size-5 text-primary" />
          <h1 className="text-base font-bold tracking-tight font-[family-name:var(--font-heading)]">
            AI-Inshorts
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
            <Flame className="size-4 text-chart-3" />
            <span className="text-sm font-semibold text-foreground">{streak}</span>
            <span className="text-xs text-muted-foreground">day streak</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {totalCards} cards today
          </span>
          <span className="text-xs font-medium text-primary">
            {Math.round(progressValue)}%
          </span>
        </div>
        <Progress value={progressValue} className="h-1.5 bg-secondary" />
      </div>
    </header>
  )
}
