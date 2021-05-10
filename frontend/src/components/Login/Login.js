import React, { useState, useContext } from 'react'
import { Button, Header, Modal, Form, Label, Input, List } from 'semantic-ui-react'
import AuthContext from '../shared/AuthContext'

const Login = () => {
    let allErrors = []
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const auth = useContext(AuthContext)
    
    const handleInput = (event) => {
        if(event.target.id === 'email') {
            if(event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                setEmail(event.target.value)
                setEmailError('')
                allErrors.pop(emailError)
            } else {
                setEmailError('Write a proper email')
                allErrors.push(emailError)
            }
        }
        if(event.target.id === 'password') {
            if(event.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/)) {
                setPassword(event.target.value)
                setPasswordError('')
                allErrors.pop(passwordError)
            } else {
                setPasswordError('Password needs to have minimum of 8 characters and at least 1 uppercase, lowercase, number and special character')
                allErrors.push(passwordError)
            }
        }
    }

    const submitForm = async(event) => {
        event.preventDefault()

        if(allErrors.length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/getUser', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                const responseData = await response.json()
                auth.login(responseData.user.id, responseData.user.username, responseData.token)
                setOpen(false)
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    const logout = () => {
        auth.logout()
        window.location.reload()
    }


    return(
    <Modal
      closeIcon
      open={open}
      trigger={!auth.token ? <List.Item href='#'>Login</List.Item> : <List.Item href="#" onClick={logout}>Logout</List.Item>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='address book' content='Login' />
      <Modal.Content>
      <Form>
        <Form.Field>
          <label>Email</label>
          {emailError ? <Label basic color="red" pointing="below">{emailError}</Label> : null}
          <Input placeholder='Email' type="email" id="email" onChange={handleInput} />
        </Form.Field>
        <Form.Field>
        {passwordError ? <Label basic color="red" pointing="below">{passwordError}</Label> : null}
          <label>Password</label>
          <Input placeholder='Password' type="password" id="password" onChange={handleInput} />
        </Form.Field>
        <Button type='submit' inverted color="green" onClick={submitForm} >Submit</Button>
    </Form>
      </Modal.Content>
    </Modal>
    )
}

export default Login