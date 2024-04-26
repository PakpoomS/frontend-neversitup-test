'use server'

import { defaultSession, SessionData, sessionOptions } from '@/utils/session'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export const getSession = async () => {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    if (!session.isLoggedIn) {
      return defaultSession
    }
    return { ...session }
  } catch (error) {
    throw error
  }
}

export const setSession = async (JWT: string) => {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    console.log(JWT)
    session.JWT = JWT
    session.isLoggedIn = true
    await session.save()

    return true
  } catch (error) {
    return false
  }
}

export const resetSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  session.destroy()
}
