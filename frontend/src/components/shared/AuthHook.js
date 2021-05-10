import { useState, useCallback, useEffect, useRef } from 'react'

const AuthHook = () => {
    const [id, setId] = useState(null)
    const [username, setUsername] = useState('')
    const [token, setToken] = useState('')
    const [isloggedin, setIsloggedin] = useState(false)
    let tokenExpiration = useRef()
 
    const login = useCallback((id, username, token) => {
        setId(id)
        setUsername(username)
        setToken(token)
        setIsloggedin(true)

    // Token expires after 2 hours from creating
    tokenExpiration.current = new Date(new Date().getTime() + 1000 * 60 * 120)        

        localStorage.setItem('user',
            JSON.stringify({
                id: id,
                username: username, 
                token: token,
                isloggedin: true
            }))
    }, [])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        if(userData && userData.token) {
            login(userData.id, userData.username, userData.isloggedin)
            
           
        }
    }, [login])


    const logout = useCallback(() => {
        setId(null)
        setUsername('')
        setToken('')
        setIsloggedin(false)

        localStorage.removeItem('user')
    }, [])

    useEffect(() => { 
        if(token && tokenExpiration.current) {
            // get remaining time of the token after which automatically logout
            const remainingTime = tokenExpiration.current.getTime() - new Date().getTime()
            // Set timeout and logout automatically when time is up
            setTimeout(logout, remainingTime);
        } else {
            clearTimeout()
        }

    },[token, tokenExpiration, logout])

    return { login, id, username, isloggedin, token, logout }
}

export default AuthHook
