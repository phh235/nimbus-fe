import { toastError, toastSuccess } from "@/helper/toast"
import { post } from "./axiosConfig"

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  name: string
  email: string
  password: string
  gender: string
  phone: string
  phone2: string
}

export const loginUser = async (loginData: LoginRequest): Promise<any> => {
  try {
    const response = await post<any>("/auth/login", loginData)

    if (response.token) {
      localStorage.setItem("token", response.token)
    }
    if (response.status === 200) {
      toastSuccess("Đăng nhập thành công")
    }

    return response
  } catch (error) {
    toastError("Đăng nhập thành công")
    console.error("Login failed:", error)
    throw error
  }
}
export const registerUser = async (registerData: RegisterRequest): Promise<any> => {
  try {
    const response = await post<any>("/auth/register", registerData)

    if (response.status === 200) {
      toastSuccess("Đăng ký thành công")
    }

    return response
  } catch (error) {
    toastError("Đăng ký thất bại")
    console.error("Register failed:", error)
    throw error
  }
}
