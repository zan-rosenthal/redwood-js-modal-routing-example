import { Context, createContext } from 'react'

export const ImageContext: Context<{
  images: string[]
  loading: boolean
}> = createContext({
  images: [],
  loading: true,
})
