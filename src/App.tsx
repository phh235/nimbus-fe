import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider"
import { SidebarProvider } from "./components/ui/sidebar"
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"
import HomePage from "./pages/user/HomePage"
import AboutPage from "./pages/user/AboutPage"
import DashboardPage from "./pages/admin/DashboardPage"
import UsersPage from "./pages/admin/UsersPage"
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Login Route - No Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* User Routes - With Navbar */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>

          {/* Admin Routes - With Sidebar */}
          <Route
            path="/dashboard"
            element={
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
