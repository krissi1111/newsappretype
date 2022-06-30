import React, { useState } from "react";
import { Button, ButtonGroup, Card, Collapse } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Wrapper } from "../../App";
import { IComment } from "../../models/comment";
import { Icon } from '@iconify/react';
import { CommentList } from "./Comment";
import { CommentInput } from "./CommentInput";
import { Comments } from "../../services/callApi";


export const CommentItem = ({ comment, typeComment = true, newsId, parentId }: { comment: IComment; typeComment?: boolean; newsId: number; parentId: number; }) => {

  let { id, userFullName, date, text, replies } = comment;
  date = new Date(date).toLocaleString('is');
  const [showCollapse, setShowCollapse] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  let dispatch = useDispatch();

  function handleCollapse(show: boolean) {
    if (!(showCollapse && show !== showReplies)) {
      setShowCollapse(!showCollapse);
    }
    setShowReplies(show);
  }

  async function handleDelete() {
    await Comments.delete(id)
  }

  async function handleEdit(text: string) {
    //dispatch(editComment({ text: text, commentId: id }));
    await Comments.edit(id, text)
  }

  const CommentButton = ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void; }) => {
    return (
      <Button
        size='sm'
        variant='light'
        style={{ backgroundColor: 'white', padding: '0.25rem' }}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  return (
    <Card>
      <Card.Body style={{ paddingBlock: '0.5rem' }}>
        <div style={commentItemStyle.top}>
          <h5>
            {userFullName}
          </h5>
          <h6 style={{ color: 'gray' }}>
            {date}
          </h6>
        </div>
        <div className='mb-2 ms-1'>
          {text}
        </div>
        <div>
          <ButtonGroup>
            {typeComment && <CommentButton onClick={() => handleCollapse(true)}>
              <Icon inline={true} className='me-1' icon='mdi:comment-outline' />
              {replies?.length} Replies
            </CommentButton>}
            <CommentButton onClick={() => handleCollapse(false)}>
              <Icon inline={true} className='me-1' icon='mdi:comment-edit-outline' />Edit
            </CommentButton>
            <CommentButton onClick={() => handleDelete()}>
              <Icon inline={true} className='me-1' icon='mdi:comment-remove-outline' />Delete
            </CommentButton>
          </ButtonGroup>
          <Collapse in={typeComment && showCollapse && showReplies}>
            <div>
              <CommentList comments={replies} typeComment={false} newsId={newsId} parentId={id} />
            </div>
          </Collapse>
          <Collapse in={showCollapse && !showReplies}>
            <div>
              <CommentInput
                placeholder='Edit comment'
                value={text}
                handleClick={text => handleEdit(text)} />
            </div>
          </Collapse>
        </div>
      </Card.Body>
    </Card>
  );
};

const commentItemStyle = {
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
