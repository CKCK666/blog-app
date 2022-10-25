import React, { useState } from 'react'
import { Form, Button,Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
    <Form.Row className="d-flex align-items-end">
    <Form.Group as={Col} controlId="formGridEmail">
    <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
      
       
      ></Form.Control>
    </Form.Group>
   
    </Form.Row>
     
  
  
     
       
    </Form>
  )
}

export default SearchBox
