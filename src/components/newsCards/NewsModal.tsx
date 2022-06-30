import { Button, ButtonGroup, Image, Modal } from "react-bootstrap";
import { IComment } from "../../models/comment";
import { INewsItem } from "../../models/news";
import { CommentContainer } from "../comment/Comment";
import { Icon } from '@iconify/react';


export const NewsModal = ({ newsItem, show, handleShow }: 
  { newsItem: INewsItem, show: boolean, handleShow: (show: boolean) => void }) => {
  /*
  const status: string = useSelector(commentStatus)
  const dispatch = useDispatch()

  const comments2: IComment[] = useSelector(commentList)*/
  const comments: IComment[] = newsItem.comments
  let { id, title, summary, link, image, date, newsFeedId, isDeleted } = newsItem
  date = new Date(date).toLocaleString('is')
  /*
  useEffect(() => {
    if (show && status === 'idle'){
      dispatch(getComments({ newsId: id }))
    }
    else if (!show) {
      dispatch(unloadComments())
    }
  }, [show, dispatch, id, status])

  */
  return (
    <Modal centered show={show} onHide={() => handleShow(false)}>
      <Modal.Header closeButton/>
      <Modal.Body>
        <Image
          src={image} 
          style={cardModalStyle.image}
        />
        <Modal.Title>
          {title}
        </Modal.Title>
        <div className='text-muted'> 
          <Icon inline={true} icon='mdi:calendar-month'/> {date}
        </div>
        <p>
          {summary}
        </p>
      </Modal.Body>
      <CommentContainer comments={comments} newsId={id}/>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='outline-primary'>
          <Icon inline={true} icon='el:star-empty'/>
        </Button>
        <ButtonGroup>
          <Button>Delete</Button>
          <Button href={link} variant='outline-primary'>
            Visit site
            <Icon inline={true} className='mx-1' icon='eva:external-link-fill'/>
          </Button>
          <Button onClick={() => handleShow(false)}>Close</Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  )
}

const cardModalStyle = {
  image: {
    width: '100%', 
    maxHeight: '20rem', 
    objectFit: 'cover' as const
  }
}

