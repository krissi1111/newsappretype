import { IComment } from "./comment"


export interface INewsItem {
  id: number
  newsFeedId: number
  title: string
  summary: string
  date: string
  link: string
  image: string
  isDeleted: boolean
  comments: IComment[]
}

export class NewsItemView {
  id: number
  newsFeedId: number
  title: string
  summary: string
  date: string
  link: string
  image: string
  isDeleted: boolean
  comments: IComment[]

  constructor(newsItem: INewsItem) {
    let { id, title, summary, link, image, date, newsFeedId, isDeleted, comments } = newsItem

    // Summary has max length of 150
    //const summaryLength = 150;
    //if (summary.length > summaryLength) summary = summary.substring(0, summaryLength) + "...";

    date = new Date(date).toLocaleString('is');
    
    this.summary = summary
    this.date = date
    this.id = id
    this.newsFeedId = newsFeedId
    this.image = image
    this.title = title
    this.link = link
    this.isDeleted = isDeleted
    this.comments = comments
  }
}