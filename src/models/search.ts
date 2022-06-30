
export interface INewsFeeds {
  id: number
  feedName: string
  feedUrl: string
}

export interface IDate {
  start: Date | null,
  end: Date | null
}

export interface ISearchParameters {
  searchString: string
  searchDateRange: IDate
  searchFeeds: Array<number>
  searchInTitle: boolean
  searchInSummary: boolean
  searchInDates: boolean
  searchInFeeds: boolean
}

export class SearchParameters {
  Title?: string
  Summary?: string
  dateStart?: string
  dateEnd?: string
  newsFeedIds?: Array<number>

  constructor(searchValues: ISearchParameters) {
    let { 
      searchString,
      searchDateRange,
      searchFeeds, 
      searchInTitle, 
      searchInSummary, 
      searchInDates, 
      searchInFeeds } = searchValues

    this.Title = searchInTitle? searchString : undefined
    this.Summary = searchInSummary? searchString : undefined
    this.newsFeedIds = searchInFeeds? searchFeeds : undefined
    this.dateStart = searchInDates? searchDateRange.start?.toISOString() : undefined
    this.dateEnd = searchInDates? searchDateRange.end?.toISOString() : undefined
  }

  getForm(): FormData {
    let form = new FormData()

    if (this.Title) form.append('title', this.Title)
    if (this.Summary) form.append('summary', this.Summary)
    if (this.dateStart && this.dateEnd) {
      form.append('dateStart', this.dateStart)
      form.append('dateEnd', this.dateEnd)
    }
    if (this.newsFeedIds) {
      this.newsFeedIds.map(id => (
        form.append('newsFeedIds', id.toString())
      ))
    }

    return form
  }
}