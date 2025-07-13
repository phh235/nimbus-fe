import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { toastError } from "@/helper/toast"
import { useAppDispatch } from "@/helper"
import { registerUser } from "@/api/authApi"
import { authActions } from "@/redux/authSlice"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    phone2: "",
    gender: "male",
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useAppDispatch()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.name || !state.email || !state.password || !confirmPassword) {
      toastError("Vui lòng nhập đầy đủ thông tin!")
      return
    }

    if (state.password !== confirmPassword) {
      toastError("Mật khẩu xác nhận không khớp!")
      return
    }

    setIsLoading(true)

    try {
      const response = await registerUser({
        email: state.email,
        password: state.password,
        name: state.name,
        gender: state.gender,
        phone: state.phone,
        phone2: state.phone2,
      })

      if (response.status === 200) {
        dispatch(authActions.register(response.data || response))
        setState({
          name: "",
          email: "",
          phone: "",
          phone2: "",
          gender: "male",
          password: "",
        })
        setConfirmPassword("")
      }
    } catch (error) {
      console.error("Register error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleRegister} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng ký</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Họ và tên *</Label>
          <Input 
            id="name" 
            type="text" 
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label>Giới tính</Label>
          <RadioGroup 
            value={state.gender} 
            onValueChange={(value) => setState({ ...state, gender: value })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="male" value="male" />
              <Label htmlFor="male">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="female" value="female" />
              <Label htmlFor="female">Nữ</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            required 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input 
            id="phone" 
            type="text" 
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone2">Số điện thoại 2</Label>
          <Input 
            id="phone2" 
            type="text" 
            value={state.phone2}
            onChange={(e) => setState({ ...state, phone2: e.target.value })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Mật khẩu *</Label>
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
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={0}
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng ký
        </Button>
      </div>
      <div className="text-center text-sm">
        Bạn đã có tài khoản?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Đăng nhập
        </Link>
      </div>
    </form>
  )
}
