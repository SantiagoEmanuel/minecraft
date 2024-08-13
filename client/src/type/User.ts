export interface UserRegister {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  avatar: File | null
}

export interface User {
  id: string
  username: string
  email: string
  password: string
  avatar: string
}

export interface UserProvider {
  user: User | null
  login: (data: UserRegister) => void
  register: (data: UserRegister) => void
  logout: () => void
}
