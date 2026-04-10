import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'))
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('portfolio_token'))

  const login = (tokenValue) => {
    localStorage.setItem('portfolio_token', tokenValue)
    setToken(tokenValue)
    setIsAdmin(true)
  }

  const logout = () => {
    localStorage.removeItem('portfolio_token')
    setToken(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
