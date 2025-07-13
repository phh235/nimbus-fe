import { Link, Outlet } from "react-router-dom"
import { Logo } from "../components/navbar/logo"
import { NavMenu } from "../components/navbar/nav-menu"
import { NavigationSheet } from "../components/navbar/navigation-sheet"
import { ModeToggle } from "../components/theme/mode-toggle"
import { Button } from "@/components/ui/button"

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/sign-up">Đăng ký</Link>
            </Button>
            <ModeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout
