import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import App from './App'
import Home from 'pages/home'       //首页
import Login from 'pages/login'     //登录主页
import SignIn from 'pages/login/SignIn'     //登录
import './index.scss'
export default class ERouter extends Component {
    render() {
        return (
            <TransitionGroup>
                <CSSTransition
                    key={window.location.hash}
                    classNames="fade"
                    timeout={300}
                >
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
            </CSSTransition>
        </TransitionGroup >
        )
    }
}