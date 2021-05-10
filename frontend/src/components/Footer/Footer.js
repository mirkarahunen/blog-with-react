import React from 'react'
import { Container, Icon, List } from 'semantic-ui-react'
import './Footer.css'

const Footer = () => {
    return(
        <>
        <Container fluid className="Footer">
            <List>
                <List.Item>Street in Hamburg 1, 20000 Hamburg</List.Item>
                <List.Item>Call us on +49 40 1231234</List.Item>
                <List.Item>Send us an email: info@info.com</List.Item>
                <Container className="social-media">
                    <Icon name="facebook" />
                    <Icon name="instagram" />
                    <Icon name="twitter" />
                </Container>
                
            </List>

        </Container>
        <Container fluid className="Footer-low-section">
            <Icon name="copyright" /><p>Copyright 2021 Company name: All rights reserved</p>
        </Container>
        </>
    )
}

export default Footer