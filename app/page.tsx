"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { CardDeck } from "@/components/card-deck"
import { BottomNav } from "@/components/bottom-nav"
import { cards } from "@/lib/cards-data"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <main className="min-h-dvh bg-background text-foreground overflow-hidden">
      <AppHeader
        currentIndex={currentIndex}
        totalCards={cards.length}
        streak={12}
      />

      <div className="pt-[108px] pb-20">
        <CardDeck cards={cards} onIndexChange={setCurrentIndex} />
      </div>

      <BottomNav />
    </main>
  )
}
