import { useEffect, useState } from "react"
import { ListGroup, Tab, Tabs } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Wrapper } from "../../App"
import { RootState } from "../../app/store"
import { INewsItem } from "../../models/news"
import { getNewsPopular, selectNewsData } from "../../redux/slices/newsSlice"
import { NewsModal } from "./NewsModal"
import { Icon } from '@iconify/react';


export interface IPopularNewsState {
  favorites: INewsItem[]
  comments: INewsItem[]
}

export const PopularNews = () => {
  let newsDataState = useSelector((state: RootState) => state.news)
  let [popularFav, setPopularFav] = useState(newsDataState.newsPopularFav)
  let [popularCom, setPopularCom] = useState(newsDataState.newsPopularCom)
  let dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(popularFav[0])

  function handleShowModal(show: boolean, newsItem?: INewsItem) {
    if(newsItem) setModalItem(newsItem)
    setShowModal(show)
  }

  useEffect(() => {
    dispatch(getNewsPopular())
  }, [dispatch])

  useEffect(() => {
    setPopularFav(newsDataState.newsPopularFav)
    setPopularCom(newsDataState.newsPopularCom)
  }, [newsDataState])

  return (
    <Wrapper>
      <h4>Most popular news</h4>
      <Tabs
        variant='tabs'
        defaultActiveKey='com' 
        id='Auth-tab' 
        className='mb-2 mt-3 mx-0 d-flex align-items-stretch nav-fill'
      >
        <Tab eventKey='com' title='Comments'>
          <ListGroup as="ol" numbered>
            {popularCom.map(item => (
              <PopularItem newsItem={item} handleShowModal={handleShowModal} />
            ))}
          </ListGroup>
        </Tab>
        <Tab eventKey='fav' title='Favorites'>
          <ListGroup as="ol" numbered>
            {popularFav.map(item => (
              <PopularItem newsItem={item} handleShowModal={handleShowModal} />
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
      {modalItem && <NewsModal newsItem={modalItem} show={showModal} handleShow={handleShowModal}/>}
    </Wrapper>
  )
}

export const PopularItem = ({ newsItem, handleShowModal }: 
  { newsItem: INewsItem, handleShowModal: (show: boolean, newsItem: INewsItem) => void }) => {
  let { title, date } = newsItem
  date = new Date(date).toLocaleString('is')

  return (
    <ListGroup.Item
      as='li'
      className='d-flex justify-content-between align-items-start'
      onClick={() => handleShowModal(true, newsItem)}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{title}</div>
        <Icon inline={true} icon='mdi:calendar-month'/> {date}
      </div>

    </ListGroup.Item>
  )
}