import React, { useState, useContext } from 'react'
//import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

import { Button, Header, Modal, Form, Input, List, TextArea } from 'semantic-ui-react'

import './NewPost.css'
import AuthContext from '../shared/AuthContext'
import ImageUpload from '../ImageUpload/ImageUpload'

const NewPost = () => {
    const [open, setOpen] = useState(false)
    const auth = useContext(AuthContext)
    const [header, setHeader] = useState('')
    const [imageText, setImageText] = useState('')
    const [image, setImage] = useState()
    const [box1Text, setbox1Text] = useState('')
    const [box2Text, setbox2Text] = useState('')
    const [box3Text, setbox3Text] = useState('')
    const [box1Image, setbox1Image] = useState()
    const [box2Image, setbox2Image] = useState()
    //const [editorState, setEditorState] = useState(EditorState.createEmpty())
    //const content = convertToRaw(editorState.getCurrentContent())
  

    const submitPost = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('header', header)
        //formData.append('text', content.blocks[0].text)
        formData.append('box_1_text', box1Text)
        formData.append('box_2_text', box2Text)
        formData.append('box_3_text', box3Text)
        formData.append('image_text', imageText)
        formData.append('box_1_image', box1Image)
        formData.append('box_2_image', box2Image)
        formData.append('image', image)
        formData.append('post_key', 'post')

        try {
            const response = await fetch('http://localhost:5000/api/newPost', {
                method: 'POST',
                body: formData
            })
            await response.json()
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }
/*
    const changeStateBold = (event) => {
      event.preventDefault()
        const bold = RichUtils.toggleInlineStyle(editorState, 'BOLD')
        setEditorState(bold)    
    }

    const changeStateUnderline = event => {
      event.preventDefault()
        const underline = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE')
        setEditorState(underline)
    }

    const changeStateItalic = event => {
      event.preventDefault()
        const italic = RichUtils.toggleInlineStyle(editorState, 'ITALIC')
        setEditorState(italic)   
    }
*/
    return(
    <Modal
      closeIcon
      open={open}
      trigger={auth.token && <List.Item href="#">New post</List.Item>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header  content='New post' />
      <Modal.Content>
      <Form>
        <Form.Field>
          <label>Header</label>
          <Input placeholder='Post Header' type="text" id="header" onChange={(event) => setHeader(event.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Image text</label>
          <Input placeholder='Image text' type="text" id="image_text" onChange={(event) => setImageText(event.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Text Box 1</label>
          {/*<Button.Group className="text-buttons">
              <Button icon="bold" id="bold" onMouseDown={changeStateBold} />
              <Button icon='underline' id="underline" onMouseDown={changeStateUnderline}/>
              <Button icon='italic' id="italic" onMouseDown={changeStateItalic}/>
          </Button.Group>
          <Editor editorState={editorState} onChange={setEditorState} />*/}
          <Form.Field className="Editor" >
            <TextArea onChange={(event) => setbox1Text(event.target.value)}></TextArea>
            <Form.Field>
            <ImageUpload onChange={(value) => setbox1Image(value)}/>
        </Form.Field>
          </Form.Field>
        </Form.Field>
        <Form.Field>
          <label>Text Box 2</label>
          <Form.Field className="Editor" >
            <TextArea onChange={(event) => setbox2Text(event.target.value)}></TextArea>
            <Form.Field>
            <ImageUpload onChange={(value) => setbox2Image(value)}/>
        </Form.Field>
          </Form.Field>
        </Form.Field>
        <Form.Field>
          <label>Text Box 3</label>
          <Form.Field className="Editor" >
            <TextArea onChange={(event) => setbox3Text(event.target.value)}></TextArea>
          </Form.Field>
        </Form.Field>
        <Form.Field>
            <ImageUpload onChange={(value) => setImage(value)}/>
        </Form.Field>
        <Button type='submit' inverted color="green" onClick={submitPost}>Submit</Button>
    </Form>
      </Modal.Content>
    </Modal>
    )

}

export default NewPost