import React from 'react'
import { Container } from './style'

function Trendings(props) {
  const {hashtag} = props
  return (
    <Container>
      <span> {hashtag} </span>
    </Container>
  )
}

export default Trendings