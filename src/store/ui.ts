import { create } from 'zustand'

export type Theme = 'dark' | 'light'

type UIState = {
  theme: Theme
  menuOpen: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setMenuOpen: (open: boolean) => void
}

const storedTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('kvr-theme')
  return saved === 'dark' || saved === 'light' ? saved : 'light'
}

export const useUI = create<UIState>((set) => ({
  theme: storedTheme(),
  menuOpen: false,
  setTheme: (theme) => {
    window.localStorage.setItem('kvr-theme', theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const theme: Theme = state.theme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('kvr-theme', theme)
      return { theme }
    }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}))
