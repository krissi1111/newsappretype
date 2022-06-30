import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { INewsItem } from "../../models/news";
import { IResponse } from "../../models/response";
import { ISearchParameters, SearchParameters } from "../../models/search";
import { Favorite, News } from "../../services/callApi"

export interface INewsSliceState {
  newsData: INewsItem[],
  newsPopularFav: INewsItem[],
  newsPopularCom: INewsItem[]
}

const initialState: INewsSliceState = {
  newsData: [],
  newsPopularFav: [],
  newsPopularCom: []
}

export const getNewsAll = createAsyncThunk<INewsItem[]>(
  'news/all',
  async (arg) => {
    const response = await News.getAll()
    return response
  }
)

export const getNewsSearch = createAsyncThunk<INewsItem[], ISearchParameters>(
  'news/search',
  async (SearchValues) => {
    let searchForm = new SearchParameters(SearchValues).getForm()

    const response = await News.getSearch(SearchValues)
    return response
  }
)

export const getNewsPopular = createAsyncThunk<{ favorites: INewsItem[], comments: INewsItem[] }>(
  'news/popular',
  async (arg) => {
    const response = await Favorite.getPopular()
    return response
    //return { fav: response['favorites'], com: response['comments'] }
  }
)

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getNewsSearch.fulfilled, (state, action) => {
        state.newsData = action.payload
      })
      .addCase(getNewsAll.fulfilled, (state, action) => {
        state.newsData = action.payload
      })
      .addCase(getNewsPopular.fulfilled, (state, action) => {
        let res = action.payload
        state.newsPopularFav = res.favorites
        state.newsPopularCom = res.comments
      })
  }
})

export const selectNewsData = (state: RootState) => state.news.newsData

export default newsSlice.reducer