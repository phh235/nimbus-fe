import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState } from "react"
import { toastError } from "@/helper/toast"
import { useAppDispatch } from "../../helper/index"
import { authActions } from "@/redux/authSlice"
import { loginUser } from "@/api/authApi"
import { Eye, EyeOff, Loader } from "lucide-react"

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [state, setState] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.email || !state.password) {
      toastError("Vui lòng nhập đầy đủ email và mật khẩu!")
      return
    }

    setIsLoading(true)

    try {
      const response = await loginUser({
        email: state.email,
        password: state.password,
      })

      if (response.status === 200) {
        dispatch(authActions.login(response.data || response))
        setState({ email: "", password: "" })
      }
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleLogin} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Nhập email bên dưới để đăng nhập vào tài khoản của bạn
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu *</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              tabIndex={0}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Hoặc tiếp tục với
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Bạn chưa có tài khoản?{" "}
        <Link to="/sign-up" className="underline underline-offset-4">
          Đăng ký
        </Link>
      </div>
    </form>
  )
}
