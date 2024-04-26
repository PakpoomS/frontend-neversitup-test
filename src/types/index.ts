export type CreateToDoType = {
  title: string
  description: string
}

export type UpdateToDoType = {
  id: number
  title: string
  description: string
}

export type ToDosType = {
  id: number
  title: string
  description: string
  created_at?: Date
  updated_at?: Date
}
