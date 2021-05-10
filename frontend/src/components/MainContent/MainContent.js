import React, { useState, useEffect, useContext } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import AliceCarousel from 'react-alice-carousel'
import './MainContent.css'
import AuthContext from '../shared/AuthContext'
import ImageUpload from '../ImageUpload/ImageUpload'
import ImageUploadMulti from '../ImageUpload/ImageUploadMultiple'
import UICard from '../Card/Card'

const MainContent = () => {
    const [image, setImage] = useState([])
    const [newImage, setNewImage] = useState()
    const [middle_image, setMiddleImage] = useState([])
    const [posts, setPosts] = useState([])
    const auth = useContext(AuthContext)
    const token = auth.token
    


    useEffect(() => {
        const getImage = async () => {
            const response = await fetch('http://localhost:5000/api/getImage', {
                headers: {
                    'Content-type': 'Application/json'
                }
            })
            const responseData = await response.json()
            const mainSectionImage = responseData.filter(item => item.image_key === "main")
            const middleSectionImage = responseData.filter(item => item.image_key === 'middle-section')
            setImage(mainSectionImage[mainSectionImage.length - 1].image)
            setMiddleImage(middleSectionImage[middleSectionImage.length - 1].image)
    
        }
        getImage()

        const getPosts = async () => {
            const response = await fetch('http://localhost:5000/api/getPosts', {
                headers: {
                    'Content-type': 'application/json'
                }  
            })
            const responseData = await response.json()
            setPosts(responseData)
        }

        getPosts()
    }, [image, middle_image])

    
    const deleteHandler = deletedPostID => {
        // Filter the removed post out and display the remaining ones 
        setPosts(postIDs => {
            postIDs.filter(post => post.id !== deletedPostID)
        })
    }

    const postImage = async () => {
        const formData = new FormData()
        formData.append('image', newImage)
        formData.append('image_key', 'middle-section')

        try {
            const response = await fetch('http://localhost:5000/api/postImage', {
                method: 'POST',
                body: formData
            })
            const responseData = await response.json()
            setMiddleImage(responseData)
        } catch (error) {
            console.log(error);
        }
    }

    let responsive = {
    0: { items: 1 },
    900: { items: 2 },
    1024: { items: 3 }
  }

    return(
        <>
        <Container fluid className="Main" style={{backgroundImage: `url(http://localhost:5000/${image})`}} >
            <h1 className="Main-header" >New food blog</h1>
            <p className="Header-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            {token && 
                <ImageUploadMulti onChange={(value) => setNewImage(value)} id="main"/>
            }
        </Container>    
        <Container className="Introduction">
            <h3>Short introduction</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
                Aldus PageMaker including versions of Lorem Ipsum.</p>
        </Container>

        <Container fluid className="Carousel-Background">
        
           <AliceCarousel
            responsive={responsive}
            fadeOutAnimation={true}
            autoPlayInterval={3000}
            autoPlay={true}
            infinite={true}
           >
            <Container fluid className="blog-cards">
            {posts.map(item => {
                return(
                    <UICard 
                        key={item.id}
                        id={item.id}
                        header={item.header}
                        text={item.text}
                        image={item.image}
                        post_key={item.post_key}
                        onDelete={deleteHandler}
                    />
                )
            })}
            </Container>
            </AliceCarousel>
        
          </Container>  
        <Container fluid className="middle-section" style={{backgroundImage: `url(http://localhost:5000/${middle_image})`}}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged.</p>
            <Button basic inverted>Sign up for newsletter</Button>    
            {token &&<Form>
                <ImageUpload onChange={(value) => setNewImage(value)}/>
                <Button type="submit" style={{display: 'block', margin: '20px auto'}} inverted onClick={postImage}>Save</Button>
            </Form>}
        </Container>

        <Container fluid className="Products">
          <Container className="Product-box">
            <Container fluid className="Product-text-1">
                <h3>Pancakes</h3>
                <p>Pancake Day, or Shrove Tuesday, is the traditional feast day before the start of Lent on Ash Wednesday. Lent – the 40 days leading up to Easter – was traditionally a time of fasting and on Shrove Tuesday, Anglo-Saxon Christians went to confession and were “shriven” (absolved from their sins). A bell would be rung to call people to confession. This came to be called the “Pancake Bell” and is still rung today.</p>
                <Button basic inverted>Read more</Button>
            </Container>
            <Container fluid className="Product-image-1"></Container>
          </Container>
          <Container className="Product-box">
            <Container fluid className="Product-image-2"></Container>
            <Container fluid className="Product-text-2">
                <h3>Cheesecake</h3>
                <p>Cheesecake is a sweet dessert consisting of one or more layers. The main, and thickest, layer consists of a mixture of a soft, fresh cheese (typically cottage cheese, cream cheese or ricotta), eggs, and sugar. If there is a bottom layer, it most often consists of a crust or base made from crushed cookies (or digestive biscuits), graham crackers, pastry, or sometimes sponge cake. Cheesecake may be baked or unbaked (and is usually refrigerated).</p>
                <Button basic inverted>Read more</Button>
            </Container>
            
          </Container>
        </Container>
        
        </>
    )
}

export default MainContent