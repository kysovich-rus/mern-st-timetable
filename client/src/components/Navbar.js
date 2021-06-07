import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/auth.context";


export const Navbar = ({email}) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper red darken-2" style ={{ padding: '0 2rem'}}>
                <span className="brand-logo" >Расписание студента</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to = "/create">Создать</NavLink></li>
                    <li><NavLink to = "/table/detail">Найти по дате</NavLink></li>
                    <li><NavLink to ="/table">Все записи</NavLink></li>
                    <li>Привет, <strong>{email}</strong>!</li>
                    <li><a href = "/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}