

export interface IComment {
  id: number
  userId: number
  userFullName: string
  text: string
  date: string
  replies?: IComment[]
}