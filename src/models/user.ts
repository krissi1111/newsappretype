

export interface IUser {
  id: number
  userName: string
  firstName: string
  lastName: string
  fullName: string
  userType: string
}

export interface IUserAuth {
  token: string
  tokenExpirationTime: string
  user: IUser
}

export interface IUserRegister {
  username: string
  firstName: string
  lastName: string
  password: string
}