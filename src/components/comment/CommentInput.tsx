import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";


export const CommentInput = ({ buttonText = 'Comment', placeholder = 'Add new comment', value = '', handleClick }: { buttonText?: string; placeholder?: string; value?: string; handleClick: (text: string) => void; }) => {

  const [commentText, setCommentText] = useState(value);

  return (
    <InputGroup>
      <Form.Control
        as='textarea'
        placeholder={placeholder}
        value={commentText}
        onChange={event => setCommentText(event.target.value)} />
      <Button variant='outline-secondary' onClick={() => handleClick(commentText)}>{buttonText}</Button>
    </InputGroup>
  );
};
