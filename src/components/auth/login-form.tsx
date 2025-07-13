import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Nhập email bên dưới để đăng nhập vào tài khoản của bạn
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu *</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
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
