import React from 'react'
import UserList from './UserList'
import Proyectos from './Proyectos'
import { Link } from 'react-router-dom'


export const Home = () => {
    return (
        <div>
            
            <UserList />
            <Proyectos />

        </div>


    )
}
