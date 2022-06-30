import React from "react"
import { Accordion } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { IComment } from "../../models/comment"
import { addComment, addReply } from "../../redux/slices/commentSlice"
import { Icon } from '@iconify/react';
import { CommentItem } from "./CommentItem"
import { CommentInput } from "./CommentInput"


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

  let dispatch = useDispatch()
  function handleInput(text: string) {
    if (typeComment) dispatch(addComment({ newsId: newsId, text: text }))
    else dispatch(addReply({ newsId: newsId, text: text, commentId: parentId }))
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


