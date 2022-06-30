import { ISearchParameters, SearchParameters } from "../models/search"
import { IUserRegister } from "../models/user"


const APIUrl = 'http://127.0.0.1:5000/'

export enum Method {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Put = 'PUT',
  Delete = 'DELETE'
}

const getToken = () => {
  let token = localStorage.getItem('token')
  return 'Bearer ' + token
}

export const fetcher = async (
  { Method, SubUrl, Body, Auth } : { Method: Method, SubUrl: string, Body?: FormData | string, Auth?: boolean }) => {
    let authHeader: string = ''
    
    if (Auth) authHeader = getToken()

    let result = await fetch(APIUrl+SubUrl, {
      method: Method,
      body: Body,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    })
    return await result.json()
}

export const News = {
  getAll: () => {
    return fetcher({ Method: Method.Get, SubUrl: 'news' })
  },
  getSearch: (search: ISearchParameters) => {
    let body = JSON.stringify(new SearchParameters(search))
    return fetcher({ Method: Method.Post, SubUrl: 'news/search', Body: body })
  },
  getFeeds: () => {
    return fetcher({ Method: Method.Post, SubUrl: 'news/feeds' })
  },
  add: () => {
    return fetcher({ Method: Method.Get, SubUrl: 'news/add', Auth: true })
  }
}

export const User = {
  status: () => {
    return fetcher({ Method: Method.Post, SubUrl: 'user/loginToken', Auth: true })
  },
  login: (username: string, password: string) => {
    let body = JSON.stringify({username: username, password: password})
    return fetcher({ Method: Method.Post, SubUrl: 'user/login', Body: body })
  },
  register: (register: IUserRegister) => {
    let body = JSON.stringify(register)
    return fetcher({ Method: Method.Post, SubUrl: 'user/register', Body: body })
  },
  registerAdmin: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'user/register', Body: Body, Auth: true })
  }
}

export const Comments = {
  getList: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'news/commentList', Body: Body })
  },
  add: (newsId: number, text: string, userId?: number) => {
    let body = JSON.stringify({newsId: newsId, text: text, userId: userId})
    return fetcher({ Method: Method.Post, SubUrl: 'comment/addComment', Body: body, Auth: true })
  },
  delete: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'comment/deleteComment', Body: Body, Auth: true })
  },
  restore: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'comment/restoreComment', Body: Body, Auth: true })
  },
  edit: (Body: FormData) => {
    return fetcher({ Method: Method.Patch, SubUrl: 'comment/editComment', Body: Body, Auth: true })
  }
}

export const Reply = {
  add: (newsId: number, commentId: number, text: string, userId?: number) => {
    let body = JSON.stringify({newsId: newsId, userId: userId, parentId: commentId, text: text})
    return fetcher({ Method: Method.Post, SubUrl: 'comment/addReply', Body: body, Auth: true })
  },
  delete: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'comment/deleteReply', Body: Body, Auth: true })
  },
  restore: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'comment/restoreReply', Body: Body, Auth: true })
  },
  edit: (Body: FormData) => {
    return fetcher({ Method: Method.Patch, SubUrl: 'comment/editReply', Body: Body, Auth: true })
  }
}

export const Favorite = {
  addRemove: (Body: FormData) => {
    return fetcher({ Method: Method.Post, SubUrl: 'news/favAddRemove', Body: Body, Auth: true })
  },
  userFavs: () => {
    return fetcher({ Method: Method.Get, SubUrl: 'news/userFav', Auth: true })
  },
  getPopular: () => {
    return fetcher({ Method: Method.Get, SubUrl: 'news/popularComments' })
  }
}