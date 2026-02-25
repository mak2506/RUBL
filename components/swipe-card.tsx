"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronUp, Trophy } from "lucide-react"
import type { CardData } from "@/lib/cards-data"

interface SwipeCardProps {
  card: CardData
  isActive: boolean
  onChallenge: (id: number) => void
}

export function SwipeCard({ card, isActive, onChallenge }: SwipeCardProps) {
  return (
    <article
      className={`
        w-full rounded-2xl border border-border bg-card p-6 
        transition-all duration-500 ease-out
        ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
      role="region"
      aria-label={`Card: ${card.title}`}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Category tag + meta */}
        <div className="flex items-center justify-between">
          <Badge className={`${card.categoryColor} rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider`}>
            {card.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="size-3.5" />
            <span className="text-xs">{card.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold leading-tight tracking-tight text-balance font-[family-name:var(--font-heading)]">
          {card.title}
        </h2>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground flex-1">
          {card.summary}
        </p>

        {/* Source */}
        <span className="text-xs text-muted-foreground/60 uppercase tracking-wide">
          Source: {card.source}
        </span>

        {/* Challenge button */}
        <Button
          onClick={() => onChallenge(card.id)}
          className="w-full rounded-xl h-12 text-sm font-bold uppercase tracking-wider gap-2"
          size="lg"
        >
          <Trophy className="size-4" />
          Take the Challenge
        </Button>

        {/* Swipe hint */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <ChevronUp className="size-4 text-muted-foreground/40 animate-bounce" />
          <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            Swipe up for next
          </span>
        </div>
      </div>
    </article>
  )
}
