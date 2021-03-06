import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { CreatePage } from './pages/CreatePage'
import { TablePage } from './pages/TablePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'
import { DetailTablePage} from './pages/DetailTablePage'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path ="/table" exact>
                    <TablePage />
                </Route>
                <Route path = "/table/detail">
                    <DetailTablePage />
                </Route>
                <Route path = "/create" exact>
                    <CreatePage />
                </Route>
                <Route path = "/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/table"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}