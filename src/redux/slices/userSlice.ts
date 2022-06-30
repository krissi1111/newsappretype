import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IResponse } from "../../models/response";
import { IUser, IUserAuth, IUserRegister } from "../../models/user";
import { User } from "../../services/callApi";


export interface IUserSliceState {
  user: IUser
  loggedIn: boolean
}

export const loginToken = createAsyncThunk<IUserAuth, undefined>(
  'user/loginToken',
  async(arg) => {
    const response = await User.status()
    return response
  }
)

export const loginForm = createAsyncThunk<IUserAuth, {username: string, password: string}>(
  'user/loginForm',
  async(body) => {
    const response = await User.login(body.username, body.password)
    return response
  }
)

export const register = createAsyncThunk<IUserAuth, IUserRegister>(
  'user/register',
 async (body, { rejectWithValue }) => {
  const response = await User.register(body)
  return response
 }
)

const initialState: IUserSliceState = {
  user: {
    id: -1,
    userName: 'Guest',
    firstName: 'Guest',
    lastName: 'Guest',
    fullName: 'Guest',
    userType: 'User'
  },
  loggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false
      localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginToken.fulfilled, (state, action) => {
      let res: IUserAuth = action.payload
      localStorage.setItem('token', res.token)
      state.user = res.user
      state.loggedIn = true
      console.log(res.token)
    })
    .addCase(loginForm.fulfilled, (state, action) => {
      let res: IUserAuth = action.payload
      localStorage.setItem('token', res.token)
      state.user = res.user
      state.loggedIn = true
      console.log(res.token)
    })
    .addCase(loginForm.rejected, (state, action) => {
      console.log(action.payload)
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loggedIn = true
      console.log(action.payload)
    })
    .addCase(register.rejected, (state, action) => {
      console.log(action.payload)
    })
  }
})

export const { logout } = userSlice.actions

export const isLoggedIn = (state: RootState) => state.user.loggedIn
export const currentUser = (state: RootState) => state.user.user

export default userSlice.reducer