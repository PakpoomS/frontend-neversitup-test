'use client'

import React, { ReactNode, createContext, useState } from 'react'

import { CreateToDoType, UpdateToDoType } from '@/types'

interface Context extends UpdateToDoType {
  setTodo: (data: UpdateToDoType) => void
}

export const initialState: UpdateToDoType = {
  id: 0,
  title: '',
  description: ''
}

export const TodoContext = createContext<Context>({
  ...initialState,
  setTodo: (data: UpdateToDoType) => {}
})

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todo, setTodo] = useState<UpdateToDoType>({ ...initialState })

  const contextValue = {
    ...todo,
    setTodo
  }

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
}
