import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
// import Loadable from 'react-loadable';
import App from './App'
import Home from 'pages/home'       //首页
import Login from 'pages/login'     //登录主页
import SignIn from 'pages/login/SignIn'     //登录
import Register from 'pages/login/Register'     //注册
import RestorePassword from 'pages/login/RestorePassword'     //还原密码
import Main from './Main'
import Man from 'pages/man/Man'
import './index.scss'
const Logins = [
    { path: "/login/signIn", name: "SignIn", component: SignIn, noAuth: true },
    { path: "/login/register", name: "Register", component: Register, noAuth: true },
    { path: "/login/restorePassword", name: "RestorePassword", component: RestorePassword, noAuth: true },
    { path: "/login/index", name: "Login", component: Login, noAuth: true },
    { path: "/login", name: "Login", component: Login, noAuth: true },
]

const Homes = [
    { path: "/home", name: "Home", component: Home, },
    { path: "/man", name: "Man", component: Man, },
    // { path: "/", name: "Home", component: Home },
    // { path: "/user", name: "User", component: User,auth:true},
]
class ERouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        {/* 登录页面相关 */}
                        <Route path="/login" render={() =>
                            <div>
                                {
                                    Logins.map((item, index) => <Route key={index} path={item.path} render={props => this.route(item, props)} />)
                                }
                            </div>
                        } />

                        {/* 主页面相关 */}
                        <Route path="/" render={() =>
                            <Main>
                                {
                                    Homes.map((item, index) => <Route key={index} path={item.path} render={props => this.route(item, props)} />)
                                }
                            </Main>
                        } />

                    </Switch>
                </App>
            </HashRouter>
        )
    }

    route = (item, props) => {
        const token = localStorage.getItem('token')
        if (item.noAuth === true && token) {
            // 如果已经登录了，就不能进入登录相关页面
            return <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        } else {
            if (item.auth === true && !token) {
                // 一些页面需要登录
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            } else {
                return <item.component {...props} />
            }
        }
    }
}
export default ERouter

//  {/* 登录相关页面 */}
//                         {/* <Route path="/login" render={() => */}
//                         <PrivateRoute path="/home" component={Home} />
//                         <PrivateRoute path='/login/signIn' component={SignIn} />
//                         <PrivateRoute path='/login/register' component={Register} />
//                         <PrivateRoute path='/login/restorePassword' component={RestorePassword} />
//                         <PrivateRoute path='/login/index' component={Login} />
//                         <PrivateRoute path='/login' component={Login} />

//         }>
//         {/* </Route> */}
//         {/* 正常页面相关 */}
//         {/* <Route path="/" render={() =>
//             <TransitionGroup>
//                 <CSSTransition key={window.location.hash} classNames="fade" timeout={300} >
//                     <Switch>
//                         <PrivateRoute path="/home" component={Home} />
//                         <PrivateRoute path="/" component={Home} />
//                         <PrivateRoute path="/" component={Home} />
//                         <Route path='/home' component={Home} />
//                         <Route path='/' component={Home} />
//                     </Switch>
//                 </CSSTransition>
//             </TransitionGroup >
//         }>
//         </Route> */}