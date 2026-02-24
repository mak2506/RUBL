"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { SwipeCard } from "@/components/swipe-card"
import { ChallengeModal } from "@/components/challenge-modal"
import { CompletionScreen } from "@/components/completion-screen"
import type { CardData } from "@/lib/cards-data"

interface CardDeckProps {
  cards: CardData[]
  onIndexChange: (index: number) => void
}

export function CardDeck({ cards, onIndexChange }: CardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [challengeCardId, setChallengeCardId] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const touchStartY = useRef(0)
  const touchDeltaY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const goToNext = useCallback(() => {
    if (isAnimating.current) return
    if (currentIndex < cards.length - 1) {
      isAnimating.current = true
      const next = currentIndex + 1
      setCurrentIndex(next)
      onIndexChange(next)
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, cards.length, onIndexChange])

  const goToPrev = useCallback(() => {
    if (isAnimating.current) return
    if (currentIndex > 0) {
      isAnimating.current = true
      const prev = currentIndex - 1
      setCurrentIndex(prev)
      onIndexChange(prev)
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }
  }, [currentIndex, onIndexChange])

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchDeltaY.current = 0
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaY.current = touchStartY.current - e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(() => {
    const SWIPE_THRESHOLD = 50
    if (touchDeltaY.current > SWIPE_THRESHOLD) {
      goToNext()
    } else if (touchDeltaY.current < -SWIPE_THRESHOLD) {
      goToPrev()
    }
    touchDeltaY.current = 0
  }, [goToNext, goToPrev])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrev()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  // Mouse wheel swipe
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let wheelTimeout: ReturnType<typeof setTimeout>
    let accumulated = 0

    function handleWheel(e: WheelEvent) {
      e.preventDefault()
      accumulated += e.deltaY
      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        if (accumulated > 60) {
          goToNext()
        } else if (accumulated < -60) {
          goToPrev()
        }
        accumulated = 0
      }, 100)
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [goToNext, goToPrev])

  const handleChallenge = useCallback((id: number) => {
    setChallengeCardId(id)
  }, [])

  const handleCloseChallenge = useCallback(() => {
    setChallengeCardId(null)
  }, [])

  const handleRestart = useCallback(() => {
    setIsComplete(false)
    setCurrentIndex(0)
    onIndexChange(0)
  }, [onIndexChange])

  if (isComplete) {
    return <CompletionScreen totalCards={cards.length} onRestart={handleRestart} />
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full max-w-lg mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-120px)]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
        role="feed"
        aria-label="AI knowledge cards"
      >
        {/* Card navigation dots */}
        <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating.current) {
                  isAnimating.current = true
                  setCurrentIndex(i)
                  onIndexChange(i)
                  setTimeout(() => {
                    isAnimating.current = false
                  }, 500)
                }
              }}
              className={`
                w-1.5 rounded-full transition-all duration-300
                ${i === currentIndex ? "h-6 bg-primary" : "h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"}
              `}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        {/* Cards */}
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`
              absolute inset-x-4 transition-all duration-500 ease-out
              ${i === currentIndex ? "translate-y-0 opacity-100 z-10" : ""}
              ${i < currentIndex ? "-translate-y-full opacity-0 z-0" : ""}
              ${i > currentIndex ? "translate-y-8 opacity-0 z-0" : ""}
            `}
          >
            <SwipeCard
              card={card}
              isActive={i === currentIndex}
              onChallenge={handleChallenge}
            />
          </div>
        ))}
      </div>

      {/* Challenge Modal */}
      {challengeCardId !== null && (
        <ChallengeModal
          card={cards.find((c) => c.id === challengeCardId)!}
          onClose={handleCloseChallenge}
        />
      )}
    </>
  )
}
