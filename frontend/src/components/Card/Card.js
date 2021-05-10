import React, { useContext, useState } from 'react'
import { Container, Card, Image, Button } from 'semantic-ui-react'

import './Card.css'
import AuthContext from '../shared/AuthContext'

const UICard = (props) => {
  const auth = useContext(AuthContext)
  const token = auth.token
  const [overlay, setOverlay] = useState(false)
  //const [current, setCurrent] = useState(1)

  const deletePost = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: props.id
        })
      })
      const responseData = await response.json()
      props.onDelete(props.id)
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  const showCard = () => {
    setOverlay(true)
  }

  const hideCard = () => {
    setOverlay(false)
  }


    return(
      
        <Card onClick={() => window.location = `/post/${props.id}`}  onMouseEnter={showCard} onMouseLeave={hideCard}>
            <Container className={overlay ? "overlay" : "overlay hidden"}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <p>Click on the card to read more</p>
            </Container>
            <Image src={`http://localhost:5000/${props.image}`} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{props.header}</Card.Header>
              <Card.Description>
                {/*{props.text.substring(0,70) + '...'}*/}
              </Card.Description>
            </Card.Content>
            {token && <Button.Group>
                <Button basic color="red" onClick={deletePost}>Delete</Button>
                <Button.Or />
                <Button basic color="green">update</Button>               
            </Button.Group>}
           
        </Card>
      
    )
}

export default UICard