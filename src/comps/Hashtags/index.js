import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from './style'

function Trendings(props) {
  const {hashtag, setUpdatePost, updatePost} = props
  const navigate = useNavigate()

  function handlePost(){
    navigate(`/hashtag/${hashtag?.replace('#', '')}`)
    setUpdatePost(!updatePost)
  }

  return (
    <Container onClick={handlePost} data-test="hashtag">
      <span> {hashtag} </span>
    </Container>
  )
}

export default Trendings