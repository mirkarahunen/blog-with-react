import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Header, Comment, Form, Button, Image, Input } from 'semantic-ui-react'
//import ImageUpload from '../ImageUpload/ImageUpload'
import './Post.css'

const Post = (props) => {
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [writer, setWriter] = useState('')
    const [newComment, setNewComment] = useState([])
    const [clicked, setClicked] = useState(false)
    const [newReply, setNewReply] = useState([])
    const [replies, setReplies] = useState([])
    const id = useParams().id
   
    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getPost/:id', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                const responseData = await response.json()
                setPost(responseData[0])
                console.log(responseData);
            } catch (error) {
                console.log(error);
            }
        }
        getPost()

        const getComments = async () => {

            try {
                const response = await fetch('http://localhost:5000/api/getComments/:id', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                const responseData = await response.json()
                setComments(responseData)
                
            } catch (error) {
                console.log(error);
            }
        }
        getComments()

        const getReplies = async () => {                
            try {
                const response = await fetch('http://localhost:5000/api/getReplies', {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const responseData = await response.json()                
                setReplies(responseData)

            } catch (error) {
                console.log(error);
            }
        }
        getReplies()

    }, [id, newComment, newReply])

    const postComment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/postComment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    posted_by: writer,
                    comment: commentText
                })
            })
            const responseData = await response.json()
            setNewComment(responseData)
        } catch (error) {
            console.log(error);
        }
    }

    const postReply = async (item, {value}) => {
        const id = Object.values({value}).toString()

        try {
            const response = await fetch('http://localhost:5000/api/postReply', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    comment_id: id,
                    posted_by: writer,
                    reply: commentText
                })
            })
            const responseData = await response.json()
            setNewReply(responseData)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Container fluid className="Post">
            <Container className="Header" fluid style={{backgroundImage: `url(http://localhost:5000/${post.image})`}} >
             <Header className="image-text">{post.image_text}</Header>
            </Container>
            
            <h3 className="Post-Header">{post.header}</h3>
            <Container className="Box-1" fluid>
                <Container className="image-container">
                    <Image size="medium" src={`http://localhost:5000/${post.box_1_image}`}/>
                    {/*<ImageUpload />*/}
                </Container>
                <Container className="text-container">
                    <p>{post.box_1_text}</p>
                </Container>
            </Container>
            <Container className="Box-2" fluid>
                <Container className="text-container">
                    <p>{post.box_2_text}</p>
                </Container>
                <Container className="image-container">
                    <Image size="medium" src={`http://localhost:5000/${post.box_2_image}`}/>
                    {/*<ImageUpload />*/}
                </Container>
            </Container>
            <Container className="Box-3" fluid>
                <p>{post.box_3_text}</p>
            </Container>

            <Container fluid className="All-Comments">
                <Comment.Group>
                     <Header as='h3' dividing>
                         Comments
                    </Header>
                {comments.map(item => {
                    return(
                      <Comment key={item.id} value={item.id}>
                        <Comment.Content>
                          <Comment.Author as='a'>{item.posted_by}</Comment.Author>
                          <Comment.Metadata>
                            <div>{item.created}</div>
                          </Comment.Metadata>
                          <Comment.Text>{item.comment}</Comment.Text>
                          {!clicked ?
                          
                            <Comment.Actions> 
                                <Comment.Action onClick={() => setClicked(true)}>Reply</Comment.Action>
                            </Comment.Actions>
                          : 
                           <Comment.Actions> 
                                <Input type="text" placeholder="Name" className="reply" onChange={(evt) => setWriter(evt.target.value)}/>
                                <Input type="text" placeholder="Reply comment" className="reply" onChange={(evt) => setCommentText(evt.target.value)}/>
                                <Button onClick={postReply} className="reply-button" value={item.id} basic primary>Post</Button>
                            </Comment.Actions>
                          }
                        </Comment.Content>
                        {replies.map(reply => {   
                         if(item.id === reply.comment_id) {   
                        return(
                        <Comment.Group>
                          <Comment key={reply.id}>
                            <Comment.Content>
                              <Comment.Author as='a'>{reply.posted_by}</Comment.Author>
                              <Comment.Metadata>
                                <span>{reply.created}</span>
                              </Comment.Metadata>
                              <Comment.Text>{reply.reply}</Comment.Text>
                            </Comment.Content>
                          </Comment>
                        </Comment.Group>
                        )} else {
                            return null
                        }})}
                      </Comment>
                    )})}
                    <Form reply className="Comment-Form">
                        <Form.Field>
                            <label>Name</label>
                            <Input placeholder='Name' type="text" id="name" onChange={(evt) => setWriter(evt.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Comment</label>
                        <Form.TextArea type="text" id="comment" onChange={(evt) => setCommentText(evt.target.value)}/>
                            <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={postComment}/>
                        </Form.Field>
                    </Form>
                </Comment.Group>
            </Container>            
        </Container>
    )
}

export default Post