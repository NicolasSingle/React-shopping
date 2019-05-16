import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Home from 'pages/home'
export default class ERouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" render={() =>
                            <Switch>
                                <Route path='/' component={Home} />
                                <Route path='/home' component={Home} />
                            </Switch>
                        }>
                        </Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}