import { useEffect, useReducer, useState } from "react";
import { ButtonGroup, CardGroup, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { INewsItem } from "../../models/news";
import { News } from "../../services/callApi";
import { NewsCard } from "./NewsCard";
import { NewsCardPagination } from "./NewsCardPagination";
import { NewsModal } from "./NewsModal";

export interface ICardListState {
  currentPage: number,
  itemsPerPage: number,
  maxLength: number,
  pageCount: number,
  newsData: Array<INewsItem>,
  newsDataCurrent: Array<INewsItem>
}

export const NewsCardList = ({ newsCards }: { newsCards: Array<INewsItem>; }) => {
  const initialState: ICardListState = {
    currentPage: 3,
    itemsPerPage: 10,
    maxLength: 100,
    pageCount: 10,
    newsData: newsCards,
    newsDataCurrent: []
  }

  const [state, dispatch] = useReducer(cardListReducer, initialState)
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(state.newsData[0])
  const [feedList, setFeedList] = useState([])

  useEffect(() => {
    dispatch({ type: 'dataRefresh', payload: newsCards })
  }, [newsCards])

  useEffect(() => {
    News.getFeeds()
    .then(feeds => {
      setFeedList(feeds)
    })
  }, [])

  function handleChangePage(pageNumber: number) {
    dispatch({ type: 'changePage', payload: pageNumber })
  }

  function handleShowModal(show: boolean, newsItem?: INewsItem) {
    if(newsItem) setModalItem(newsItem)
    setShowModal(show)
  }

  function handleItemsPerPage(number: number) {
    dispatch({ type: 'changeItemsPerPage', payload: number })
  }

  const PageCountDropdown = () => {
    const pageCounts = [5, 10, 20, 50, 100]

    return (
      <Dropdown>
        <DropdownButton as={ButtonGroup} title='Items per page'>
          {pageCounts.map((number: number) => 
            <Dropdown.Item
              key={number}
              active={number === state.itemsPerPage}
              onClick={() => handleItemsPerPage(number)}
            >
              {number}
            </Dropdown.Item>
          )}
        </DropdownButton>
      </Dropdown>
    )
  }

  return (
    <Container fluid style={cardListStyle.main}>
      <div style={cardListStyle.paginationContainer}>
        <NewsCardPagination state={state} handleChangePage={handleChangePage}/>
        <PageCountDropdown/>
      </div>
      <CardGroup style={cardListStyle.cardGroup}>
        {state.newsDataCurrent.map(
          (newsItem: INewsItem) => 
            <NewsCard 
              key={newsItem.link} 
              newsCard={newsItem} 
              handleShowModal={handleShowModal} 
              feedList={feedList}
            />
          )
        }
      </CardGroup>
      <div style={cardListStyle.paginationContainer}>
        <NewsCardPagination state={state} handleChangePage={handleChangePage}/>
        <PageCountDropdown/>
      </div>
      {modalItem && <NewsModal newsItem={modalItem} show={showModal} handleShow={handleShowModal}/>}
    </Container>
  );
};

function cardListReducer(state: ICardListState, action: any) {
  switch (action.type) {
    case 'changePage':
      {
        let currentPage = action.payload
        
        let returnState = { ...state, currentPage: currentPage };
        let newsDataCurrent = getCurrentNewsItems(returnState)
        
        return { ...returnState, newsDataCurrent: newsDataCurrent }
      }
    case 'changeItemsPerPage':
      {
        let itemsPerPage = action.payload
        let currentPage = 1
        let dataLength = Math.min(state.newsData.length, state.maxLength)
        let pageCount = Math.ceil(dataLength / itemsPerPage)

        let returnState = { ...state, itemsPerPage: itemsPerPage, pageCount: pageCount, currentPage: currentPage }
        let newsDataCurrent = getCurrentNewsItems(returnState)

        return { ...returnState, newsDataCurrent: newsDataCurrent}
      }
    case 'dataRefresh':
      {
        let newsData = action.payload
        let currentPage = 1
        let dataLength = Math.min(newsData.length, state.maxLength)
        let pageCount = Math.ceil(dataLength / state.itemsPerPage)

        let returnState = { ...state, newsData: newsData, pageCount: pageCount, currentPage: currentPage }
        let newsDataCurrent = getCurrentNewsItems(returnState)

        return { ...returnState, newsDataCurrent: newsDataCurrent }
      }
    default:
      return state;
  }
}

function getCurrentNewsItems(state: ICardListState): Array<INewsItem> {
  let { itemsPerPage, currentPage, pageCount, maxLength, newsData } = state
  
  let start = itemsPerPage * (currentPage - 1)
  let end = (currentPage !== pageCount)? start + itemsPerPage : maxLength

  return newsData.slice(start, end);
}

const cardListStyle = {
  main: {
    justifyContent: 'center', 
    minHeight: '0rem', 
    flexDirection: 'column' as const, 
    width: '100%'
  },
  cardGroup: {
    display: 'flex', 
    justifyContent: 'space-evenly'
  },
  paginationContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
// d-flex justify-content-between align-items-center