import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  JWT: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  JWT: '',
  isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || '52c196ec2cd493618f60a81615114f2aebd4d4324566de15f68a814a89490c05',
  cookieName: 'neversitup_token',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.SESSION_SECRET || '52c196ec2cd493618f60a81615114f2aebd4d4324566de15f68a814a89490c05'
  }
}
