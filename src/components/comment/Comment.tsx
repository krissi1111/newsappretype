import { Accordion } from "react-bootstrap"
import { IComment } from "../../models/comment"
import { Icon } from '@iconify/react';
import { CommentItem } from "./CommentItem"
import { CommentInput } from "./CommentInput"
import { Comments } from "../../services/callApi"


export const CommentContainer = ({ comments, newsId }: { comments: IComment[], newsId: number }) => {

  return (
    <Accordion>
      <Accordion.Item eventKey='1'>
        <Accordion.Header>
          <Icon inline={true} className="mx-1" icon='mdi:comment-outline' />
          {comments.length} {(comments.length === 1) ? 'Comment' : 'Comments'}
        </Accordion.Header>
        <Accordion.Collapse eventKey='1'>
          <CommentList comments={comments} newsId={newsId} />
        </Accordion.Collapse>
      </Accordion.Item>
    </Accordion>
  )
}

export const CommentList = ({ comments, newsId, parentId = newsId, typeComment = true }:
  { comments?: IComment[], newsId: number, parentId?: number, typeComment?: boolean }) => {

  async function handleInput(text: string) {
    if (typeComment) await Comments.add(newsId, text)
    else await Comments.addReply(newsId, parentId, text)
  }

  return (
    <>
      <CommentInput placeholder='Add new comment' handleClick={text => handleInput(text)} />
      {comments?.map((comment: IComment) =>
        <CommentItem
          comment={comment}
          newsId={newsId}
          parentId={parentId}
          typeComment={typeComment}
        />)}
    </>
  )
}


