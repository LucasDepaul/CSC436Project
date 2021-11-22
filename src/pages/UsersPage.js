import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import User from '../User/User'
import {Link, useNavigation} from 'react-navi'
import {ThemeContext, StateContext} from '../Context'
import {Container} from 'react-bootstrap'



export default function UsersPage () {
    const {state} = useContext(StateContext)
    const [ users, getUsers ] = useResource(() => ({
        url: `/users/`,
        headers: {"Authorization": state.user.access_token},
        method: 'get'
    }))
    useEffect(getUsers, [])
    const {textAlign} = useContext(ThemeContext)
    const navigation = useNavigation()
    console.log(users)
    var u =[]
    if (users.data){
    u = users.data.users
    console.log(u)
    }
    else 
        u = [{username: "there are no users in the system"}]

    return (
        <Container style={{padding: '15vh'}}>
            <div><Link onClick={() => navigation.goBack()}>Back</Link></div>
            <div style={{ textAlign: textAlign}}>
            <h1>  </h1>
                {(users && users.data)
                    ? u.map((p) => <User {...p} />)
                    : 'Loading...'
                }
                <hr />
            </div>
        </Container>
    )
}