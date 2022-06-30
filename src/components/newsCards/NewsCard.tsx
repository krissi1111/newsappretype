import { Button, Card } from "react-bootstrap";
import { IFeed } from "../../models/feed";
import { INewsItem, NewsItemView } from "../../models/news"
import { Icon } from '@iconify/react';


export const NewsCard = ({newsCard, feedList, handleShowModal}: 
  {newsCard: INewsItem, feedList: IFeed[], handleShowModal: (show: boolean, newsItem: INewsItem) => void}) => {
  
  let newsCardView: NewsItemView = new NewsItemView(newsCard)
  let { title, summary, link, image, date, newsFeedId, comments } = newsCard

  let summaryLength = 150
  if (summary.length > summaryLength) summary = summary.substring(0, summaryLength) + "...";

  let feedName: string = 'Visit'
  feedList.forEach(f => {
    if (f.id === newsFeedId) {
      feedName = f.feedName
    }
  });

  return(
    <Card style={cardStyle.main}>
      <Card.Img variant="top" src={image} style={cardStyle.image}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Icon className="me-1" inline={true} icon='mdi:calendar-month'/> 
          {new Date(date).toLocaleString('is')}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <Icon className="me-1" inline={true} icon='bytesize:home'/> 
          <a className="text-muted" href={link}>{feedName}</a>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <Icon className="me-1" inline={true} icon='mdi:comment-outline'/>
          {comments.length} {(comments.length === 1)? 'comment' : 'comments'}
        </Card.Subtitle>
        <Card.Text>{summary}</Card.Text>
      </Card.Body>
      <Card.Footer style={cardStyle.footer}>
        <Button variant='outline-primary' className='w-100' onClick={() => handleShowModal(true, newsCard)}>View article</Button>
      </Card.Footer>
    </Card>
  )
}

const cardStyle = {
  main: {
    minWidth: '17.5rem',
    maxWidth: '17.5rem',
    border: '1px solid #999',
    margin: '0.325rem'
  },
  image: {
    width: '100%', 
    maxHeight: '10rem', 
    objectFit: 'cover' as const
  },
  footer: {
    backgroundColor: 'white',
    display: 'flex', 
    justifyContent: 'center'
  }
}

