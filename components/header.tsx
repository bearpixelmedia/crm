import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { ProgressButton } from "@/components/progress/progress-button"

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ProgressButton />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}
