"use client"

import { Home, Search, Bookmark, User } from "lucide-react"

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border" aria-label="Main navigation">
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
        <NavItem icon={Home} label="Feed" active />
        <NavItem icon={Search} label="Explore" />
        <NavItem icon={Bookmark} label="Saved" />
        <NavItem icon={User} label="Profile" />
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}
