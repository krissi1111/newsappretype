import React, { useEffect, useReducer, useState } from "react"
import { Button, Collapse, Form } from "react-bootstrap"
import { IDate, INewsFeeds, ISearchParameters } from "../../models/search"
import { News } from "../../services/callApi"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
import { getNewsSearch } from "../../redux/slices/newsSlice";
import { Icon } from "@iconify/react";


export const SearchTab = () => {
  const initialState: ISearchParameters = {
    searchString: '',
    searchDateRange: { start: null, end: null },
    searchFeeds: new Array<number>(),
    searchInTitle: true,
    searchInSummary: true,
    searchInDates: false,
    searchInFeeds: false
  }

  const [searchFeedList, setSearchFeedList] = useState([])
  const [dateRange, setDateRange] = useState<IDate>({ start: null, end: null })
  const [state, dispatchLocal] = useReducer(searchTabReducer, initialState)
  const dispatchGlobal = useDispatch()

  let { searchInSummary, searchInTitle, searchInFeeds, searchInDates, searchString, searchFeeds } = state

  useEffect(() => {
    News.getFeeds()
    .then(feeds => {
      setSearchFeedList(feeds)
    })
  }, [])

  useEffect(() => {
    let { start, end } = dateRange
    dispatchLocal({ type: 'setDateRange', payload: [start, end] })
  }, [dateRange])

  function handleStringSelectors(title: boolean, summary: boolean) {
    dispatchLocal({ type: 'setSearchSelectors', payload: [title, summary] })
  }

  function handleFeedSelectors(sel: number | boolean) {
    if (typeof sel === 'boolean') dispatchLocal({ type: 'setFeedSelectors', payload: sel })
    else  dispatchLocal({ type: 'chooseFeeds', payload: sel })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    let searchValues = state
    dispatchGlobal(getNewsSearch(searchValues))
  }

  return (
    <Form onSubmit={event => handleSubmit(event)}>

      <Form.Group className='mb-3' controlId='searchString'>
        <Form.Label>Search</Form.Label>
        <Form.Control
          type='text'
          placeholder='Search...'
          value={searchString}
          onChange={event => dispatchLocal({ type: 'setString', payload: event.target.value })}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='searchSelectors'>
        <Form.Check
          type="radio"
          checked={searchInTitle && searchInSummary}
          onChange={() => handleStringSelectors(true, true)}
          label="Search All" />
        <Form.Check
          type="radio"
          checked={searchInTitle && !searchInSummary}
          onChange={() => handleStringSelectors(true, false)}
          label="Search Title" />
        <Form.Check
          type="radio"
          checked={!searchInTitle && searchInSummary}
          onChange={() => handleStringSelectors(false, true)}
          label="Search Summary" />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Dates</Form.Label>
        <Form.Check
          type="checkbox"
          label='Search dates'
          onChange={() => dispatchLocal({ type: 'setSearchInDates' })}
          checked={searchInDates}
        />
        <Collapse in={searchInDates}>
          <div >
            <DatePicker
              selectsRange={true}
              startDate={dateRange.start}
              endDate={dateRange.end}
              inline={true}
              onChange={date => setDateRange({ start: date[0], end: date[1] })}
            />
          </div>  
        </Collapse>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Feeds</Form.Label>
        <Form.Check 
          type="radio"
          label="Search all feeds"
          checked={!searchInFeeds}
          onChange={() => handleFeedSelectors(false)}
        />
        <Form.Check 
          type="radio"
          label="Select feeds"
          checked={searchInFeeds}
          onChange={() => handleFeedSelectors(true)}
        />
        <Collapse in={searchInFeeds}>
          <div>
            {searchFeedList.map((feed: INewsFeeds) => (
              <Form.Check
                key={feed.feedName}
                className="mx-3"
                type="checkbox"
                label={feed.feedName}
                onChange={() => handleFeedSelectors(feed.id)}
                checked={searchFeeds.includes(feed.id)}
              />
            ))}
          </div>
        </Collapse>
      </Form.Group>
      <Button variant='primary' type='submit'>
        <Icon inline={true} icon='ant-design:file-search-outlined'/> Search
      </Button>
      <Button onClick={() => News.add()}>Add</Button>
    </Form>
  )
}

function searchTabReducer(state: ISearchParameters, action: any) {
  switch (action.type) {
    case 'setString':
      return { ...state, searchString: action.payload }
    case 'setDateRange':
      {
        let dates = action.payload
        let returnState = state

        if (dates[1] !== null) {
          let [dateStart, dateEnd] = dates
          dateStart.setHours(0)
          dateStart.setMinutes(0)

          dateEnd.setHours(23)
          dateEnd.setMinutes(59)
          dateEnd.setSeconds(0)

          returnState = { ...returnState, searchDateRange: { start: dateStart, end: dateEnd } }
        }
        return returnState
      }
    case 'setSearchInDates':
      {
        let searchInDates = !state.searchInDates
        return { ...state, searchInDates: searchInDates }
      }
    case 'setSearchSelectors':
      {
        let [searchInTitle, searchInSummary] = action.payload

        return { ...state, searchInTitle: searchInTitle, searchInSummary: searchInSummary }
      }
    case 'setFeedSelectors':
      {
        return { ...state, searchInFeeds: action.payload }
      }
    case 'chooseFeeds':
      {
        let feedId: number = action.payload
        let feeds = [...state.searchFeeds]

        if (feeds.includes(feedId)) feeds = feeds.filter(id => id !== feedId)
        else 
        {
          feeds.push(feedId)
        }
        return { ...state, searchFeeds: feeds }
      }
    default:
      return state;
  }
}