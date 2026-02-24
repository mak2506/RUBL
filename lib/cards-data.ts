export interface CardData {
  id: number
  category: string
  categoryColor: string
  title: string
  summary: string
  readTime: string
  source: string
}

export const cards: CardData[] = [
  {
    id: 1,
    category: "Basics",
    categoryColor: "bg-primary text-primary-foreground",
    title: "What Is a Large Language Model?",
    summary:
      "LLMs are neural networks trained on vast text datasets. They predict the next token in a sequence, enabling them to generate human-like text, answer questions, and even write code.",
    readTime: "2 min",
    source: "AI Fundamentals",
  },
  {
    id: 2,
    category: "News",
    categoryColor: "bg-chart-2 text-foreground",
    title: "OpenAI Launches GPT-5 with Real-Time Reasoning",
    summary:
      "The latest model features improved chain-of-thought reasoning, multimodal understanding, and can process video inputs natively. Benchmarks show a 40% improvement in complex problem-solving.",
    readTime: "3 min",
    source: "TechCrunch",
  },
  {
    id: 3,
    category: "Research",
    categoryColor: "bg-chart-3 text-background",
    title: "Mixture of Experts: Scaling Without the Cost",
    summary:
      "MoE architectures activate only a fraction of model parameters per input, dramatically reducing compute costs while maintaining performance. This approach powers many modern frontier models.",
    readTime: "4 min",
    source: "arXiv Digest",
  },
  {
    id: 4,
    category: "Tools",
    categoryColor: "bg-chart-4 text-foreground",
    title: "Build AI Agents with LangGraph",
    summary:
      "LangGraph lets developers build stateful, multi-step AI agents using a graph-based workflow. Define nodes, edges, and conditional logic to orchestrate complex reasoning chains.",
    readTime: "3 min",
    source: "LangChain Blog",
  },
  {
    id: 5,
    category: "Ethics",
    categoryColor: "bg-chart-5 text-background",
    title: "The Alignment Problem: Are We Solving It?",
    summary:
      "Researchers debate whether current RLHF techniques truly align AI with human values or merely create the appearance of alignment. New interpretability methods offer a path forward.",
    readTime: "5 min",
    source: "AI Safety Weekly",
  },
  {
    id: 6,
    category: "Basics",
    categoryColor: "bg-primary text-primary-foreground",
    title: "Understanding Transformers Architecture",
    summary:
      "The transformer model uses self-attention mechanisms to process input sequences in parallel. This breakthrough architecture forms the backbone of modern NLP and is now expanding into vision and audio.",
    readTime: "3 min",
    source: "AI Fundamentals",
  },
  {
    id: 7,
    category: "News",
    categoryColor: "bg-chart-2 text-foreground",
    title: "Anthropic Achieves Constitutional AI Milestone",
    summary:
      "A new training paradigm that uses AI-written principles to guide behavior, reducing harmful outputs by 85% in evaluations while maintaining helpfulness scores across all benchmarks.",
    readTime: "2 min",
    source: "Wired",
  },
]
