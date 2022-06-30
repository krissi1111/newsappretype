import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IComment } from "../../models/comment";
import { IResponse } from "../../models/response";
import { Comments, Reply } from "../../services/callApi";

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
  async ({ newsId }, { rejectWithValue }) => {
    let form: FormData = new FormData()
    form.append('newsId', newsId.toString())
    const response: IResponse = await Comments.getList(form)
    if (response.success) return response.data
    else return rejectWithValue(response.message)
  }
)

export const addComment = createAsyncThunk<IComment, { newsId: number, text: string }>(
  'comments/addComment',
  async ({ newsId, text }, { rejectWithValue, dispatch }) => {
    let form: FormData = new FormData()
    form.append('newsId', newsId.toString())
    form.append('commentText', text)
    const response = await Comments.add(newsId, text)
    if (response.success) {
      dispatch(getComments({ newsId: newsId }))
      return response.data
    }
    else return rejectWithValue(response.message)
  }
)

export const addReply = createAsyncThunk<IComment, { newsId: number, text: string, commentId: number }>(
  'comments/addReply',
  async ({ newsId, text, commentId }) => {
    let form: FormData = new FormData()
    form.append('newsId', newsId.toString())
    form.append('replyText', text)
    form.append('commentId', commentId.toString())
    const response = await Reply.add(newsId, commentId, text)
    return response
  }
)

export const editComment = createAsyncThunk<IComment, { newsId: number, text: string, commentId: number }>(
  'comments/editComment',
  async ({ newsId, text, commentId }, { rejectWithValue, dispatch }) => {
    let form: FormData = new FormData()
    form.append('commentId', commentId.toString())
    form.append('commentText', text)
    const response: IResponse = await Comments.edit(form)
    if (response.success) {
      dispatch(getComments({ newsId: newsId }))
      return response.data
    }
    else return rejectWithValue(response.message)
  }
)

export const editReply = createAsyncThunk<IComment, { newsId: number, text: string, replyId: number }>(
  'comments/editReply',
  async ({ newsId, text, replyId }, { rejectWithValue, dispatch }) => {
    let form: FormData = new FormData()
    form.append('replyId', replyId.toString())
    form.append('replyText', text)
    const response: IResponse = await Reply.edit(form)
    if (response.success) {
      dispatch(getComments({ newsId: newsId }))
      return response.data
    }
    else return rejectWithValue(response.message)
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
      .addCase(getComments.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log('Comment added: ' + action.payload)
      })
  }
})

export const { unloadComments } = commentSlice.actions

export const commentList = (state: RootState) => state.comments.commentData
export const commentStatus = (state: RootState) => state.comments.status

export default commentSlice.reducer