import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IComment } from "../../models/comment";
import { IResponse } from "../../models/response";
import { Comments } from "../../services/callApi";

export interface ICommentSliceState {
  commentData: IComment[],
  status: string
}

const initialState: ICommentSliceState = {
  commentData: [],
  status: 'idle'
}

export const getComments = createAsyncThunk<IComment[], { newsId: number }>(
  'comments/getComments',
  async ({ newsId })=> {
    const response = await Comments.getList(newsId)
    return response
  }
)

export const addComment = createAsyncThunk<IComment, { newsId: number, text: string }>(
  'comments/addComment',
  async ({ newsId, text }) => {
    const response = await Comments.add(newsId, text)
    return response
  }
)

export const addReply = createAsyncThunk<IComment, { newsId: number, text: string, commentId: number }>(
  'comments/addReply',
  async ({ newsId, text, commentId }) => {
    const response = await Comments.addReply(newsId, commentId, text)
    return response
  }
)

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    unloadComments: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getComments.fulfilled, (state, action) => {
        let comments: IComment[] = action.payload
        state.status = 'loaded'
        state.commentData = comments
      })
  }
})

export const { unloadComments } = commentSlice.actions

export const commentList = (state: RootState) => state.comments.commentData
export const commentStatus = (state: RootState) => state.comments.status

export default commentSlice.reducer