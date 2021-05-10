import { createContext } from 'react'

const AuthContext = createContext({
    id: '',
    username: '',
    isloggedin: false,
    login: () => {},
    logout: () => {}
})

export default AuthContext