import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Home from 'pages/home'       //首页
import Login from 'pages/login'     //登录主页
import SignIn from 'pages/login/SignIn'     //登录

export default class ERouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" render={() =>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/login' component={Login} />
                                <Route path='/signIn' component={SignIn} />
                                <Route path='/' component={Home} />
                            </Switch>
                        }>
                        </Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}