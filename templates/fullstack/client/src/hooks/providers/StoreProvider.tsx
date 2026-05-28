'use client'
import { AppStore, makeStore } from '@/src/lib/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  
  if (storeRef.current == null) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  const store = storeRef.current

  return <Provider store={store}>{children}</Provider>
}