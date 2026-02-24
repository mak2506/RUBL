"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle2, XCircle, Sparkles } from "lucide-react"
import type { CardData } from "@/lib/cards-data"

interface ChallengeModalProps {
  card: CardData
  onClose: () => void
}

const challenges: Record<string, { question: string; options: string[]; answer: number }> = {
  "What Is a Large Language Model?": {
    question: "What do LLMs primarily predict to generate text?",
    options: ["The next word", "The next token", "The sentiment", "The grammar"],
    answer: 1,
  },
  "OpenAI Launches GPT-5 with Real-Time Reasoning": {
    question: "What percentage improvement in complex problem-solving does GPT-5 show?",
    options: ["20%", "30%", "40%", "50%"],
    answer: 2,
  },
  "Mixture of Experts: Scaling Without the Cost": {
    question: "What is the key advantage of MoE architectures?",
    options: [
      "More parameters total",
      "Activates all parameters per input",
      "Only activates a fraction of parameters",
      "Uses smaller training datasets",
    ],
    answer: 2,
  },
  "Build AI Agents with LangGraph": {
    question: "What type of workflow does LangGraph use?",
    options: ["Linear pipeline", "Graph-based", "Tree-based", "Stack-based"],
    answer: 1,
  },
  "The Alignment Problem: Are We Solving It?": {
    question: "What technique is commonly used for AI alignment today?",
    options: ["Supervised learning", "RLHF", "Genetic algorithms", "Transfer learning"],
    answer: 1,
  },
  "Understanding Transformers Architecture": {
    question: "What mechanism allows transformers to process sequences in parallel?",
    options: ["Recurrence", "Convolution", "Self-attention", "Pooling"],
    answer: 2,
  },
  "Anthropic Achieves Constitutional AI Milestone": {
    question: "By how much did the new paradigm reduce harmful outputs?",
    options: ["50%", "70%", "85%", "95%"],
    answer: 2,
  },
}

export function ChallengeModal({ card, onClose }: ChallengeModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const challenge = challenges[card.title] || {
    question: "What did you learn from this card?",
    options: ["Key concept A", "Key concept B", "Key concept C", "Key concept D"],
    answer: 0,
  }

  const handleSelect = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
    setIsAnswered(true)
  }

  const isCorrect = selectedOption === challenge.answer

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-auto bg-card border border-border rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-300 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close challenge"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="size-5 text-primary" />
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">Challenge</h3>
        </div>

        <Badge className={`${card.categoryColor} rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4`}>
          {card.category}
        </Badge>

        {/* Question */}
        <p className="text-base font-medium text-foreground mb-6 leading-relaxed">
          {challenge.question}
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-6">
          {challenge.options.map((option, i) => {
            let optionStyle = "border-border bg-secondary/50 text-foreground hover:bg-secondary"
            if (isAnswered) {
              if (i === challenge.answer) {
                optionStyle = "border-primary bg-primary/10 text-primary"
              } else if (i === selectedOption && !isCorrect) {
                optionStyle = "border-destructive bg-destructive/10 text-destructive-foreground"
              } else {
                optionStyle = "border-border bg-secondary/30 text-muted-foreground"
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={`
                  w-full text-left px-4 py-3 rounded-xl border text-sm font-medium
                  transition-all duration-200 flex items-center justify-between
                  ${optionStyle}
                  ${!isAnswered ? "active:scale-[0.98]" : ""}
                `}
              >
                <span>{option}</span>
                {isAnswered && i === challenge.answer && (
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                )}
                {isAnswered && i === selectedOption && !isCorrect && i !== challenge.answer && (
                  <XCircle className="size-5 text-destructive shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Result */}
        {isAnswered && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
              className={`
                rounded-xl p-4 text-center text-sm font-medium mb-4
                ${isCorrect ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive-foreground"}
              `}
            >
              {isCorrect
                ? "Correct! You nailed it."
                : "Not quite. The correct answer is highlighted above."}
            </div>
            <Button onClick={onClose} className="w-full rounded-xl h-11 font-bold">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
