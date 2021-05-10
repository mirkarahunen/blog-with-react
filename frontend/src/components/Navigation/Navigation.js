import React, { useState } from 'react'
import { Container, List, Icon } from 'semantic-ui-react'
import './Navigation.css'
import Login from '../Login/Login'
import NewPost from '../NewPost/NewPost'


const Navigation = (props) => {
    const [mobile, setMobile] = useState(false)
    
    const toggleMenu = (event) => {
        const menu = event.target
        menu.nextElementSibling.classList.toggle('active')        
    }

  const handleNavi = () => {
    if(window.innerWidth <= 767) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

window.addEventListener('resize', handleNavi)

    return(
        <Container fluid className={props.className}>
            <List horizontal floated='left' className="Logo" verticalAlign='middle'>
              <List.Item href='/'><Icon name="food" className="Logo"/><p className="Logo-text">Food blog</p></List.Item>
            </List>
            {window.innerWidth > 767 && !mobile ? 
            <List floated='right' horizontal verticalAlign='middle' className="Web">
                <NewPost />
                <List.Item href='#'>About me</List.Item>
                <List.Item href='#'>Recipes</List.Item>
                <List.Item href='#'>Events</List.Item>
                <List.Item href='#'>Contact</List.Item>
                <List.Item href='#'>Impressum</List.Item>
                <Login />
            </List> 
            :   
            <> 
            <Icon name="bars" className="Mobile" onClick={toggleMenu}/>
            <List floated='right'  verticalAlign='middle' className="Mobile">
                <NewPost />
                <List.Item href='#'>About me</List.Item>
                <List.Item href='#'>Recipes</List.Item>
                <List.Item href='#'>Events</List.Item>
                <List.Item href='#'>Contact</List.Item>
                <List.Item href='#'>Impressum</List.Item>
                <Login />
            </List> 
            </>    
            }   
        </Container>
    )
}

export default Navigation