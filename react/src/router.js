import React, { Component } from 'react';
import './index.scss'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from "react-transition-group"
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <div >
                
            </div>
        )
    } else {
        return null;

    }
};
const App = Loadable({
    loader: () => import('./App'),
    loading: MyLoadingComponent
});
const Home = Loadable({
    loader: () => import('pages/home'),
    loading: MyLoadingComponent
});
const Category = Loadable({
    loader: () => import('pages/category'),
    loading: MyLoadingComponent
});
const ShoppingCart = Loadable({
    loader: () => import('pages/shoppingCart/ShoppingCart'),
    loading: MyLoadingComponent
});
const My = Loadable({
    loader: () => import('pages/my'),
    loading: MyLoadingComponent
});
const Login = Loadable({
    loader: () => import('pages/login'),
    loading: MyLoadingComponent
});
const SignIn = Loadable({
    loader: () => import('pages/login/SignIn'),
    loading: MyLoadingComponent
});

const Register = Loadable({
    loader: () => import('pages/login/Register'),
    loading: MyLoadingComponent
});
const RestorePassword = Loadable({
    loader: () => import('pages/login/RestorePassword'),
    loading: MyLoadingComponent
});
const Details = Loadable({
    loader: () => import('pages/details'),
    loading: MyLoadingComponent
});
const Collection = Loadable({
    loader: () => import('pages/collection'),
    loading: MyLoadingComponent
});
const AddressList = Loadable({
    loader: () => import('pages/address/AddressList'),
    loading: MyLoadingComponent
});
const AddressEdit = Loadable({
    loader: () => import('pages/address/AddressEdit'),
    loading: MyLoadingComponent
});
const Browse = Loadable({
    loader: () => import('pages/browse'),
    loading: MyLoadingComponent
});
const Order = Loadable({
    loader: () => import('pages/order'),
    loading: MyLoadingComponent
});
const PayMent = Loadable({
    loader: () => import('pages/shoppingCart/PayMent'),
    loading: MyLoadingComponent
});
const PayOk = Loadable({
    loader: () => import('pages/shoppingCart/PayOk'),
    loading: MyLoadingComponent
});
const City = Loadable({
    loader: () => import('pages/city'),
    loading: MyLoadingComponent
});
// import App from './App'
// import Home from 'pages/home'       //首页
// import Category from 'pages/category'       //分类
// import ShoppingCart from 'pages/shoppingCart/ShoppingCart'       //购物车
// import My from 'pages/my'       //我的
// import Login from 'pages/login'     //登录主页
// import SignIn from 'pages/login/SignIn'     //登录
// import Register from 'pages/login/Register'     //注册
// import RestorePassword from 'pages/login/RestorePassword'     //还原密码
// import Details from 'pages/details'     //商品详情
// import Collection from 'pages/collection'     //我的收藏
// import AddressList from 'pages/address/AddressList'     //地址列表
// import AddressEdit from 'pages/address/AddressEdit'     //地址的新增与编辑
// import Browse from 'pages/browse'     //最近浏览
// import Order from 'pages/order'     //我的订单
// import PayMent from 'pages/shoppingCart/PayMent'     //订单
// import PayOk from 'pages/shoppingCart/PayOk'     //付款页面





// import Main from './Main'
const Logins = [
    { path: "/login/signIn", name: "SignIn", component: SignIn, noAuth: true },
    { path: "/login/register", name: "Register", component: Register, noAuth: true },
    { path: "/login/restorePassword", name: "RestorePassword", component: RestorePassword, noAuth: true },
    { path: "/login/index", name: "Login", component: Login, noAuth: true },
    { path: "/login", name: "Login", component: Login, noAuth: true },
]

const Homes = [
    { path: "/home", name: "Home", component: Home, },
    { path: "/category", name: "Category", component: Category, },
    { path: "/shoppingCart", name: "ShoppingCart", component: ShoppingCart, },
    { path: "/my", name: "My", component: My, },
    { path: "/details/:id", name: "Details", component: Details, },
    { path: "/collection", name: "Collection", component: Collection, },
    { path: "/addressEdit/:id", name: "AddressEdit", component: AddressEdit, },
    { path: "/addressList", name: "AddressList", component: AddressList, },
    { path: "/browse", name: "Browse", component: Browse, },
    { path: "/order/:id", name: "Order", component: Order },
    { path: "/payMent", name: "PayMent", component: PayMent },
    { path: "/payOk/:id", name: "PayOk", component: PayOk },
    { path: "/city", name: "City", component: City },
    { path: "/", name: "Home", component: Home, },
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
                            // <Main>
                            //     {
                            <Switch>
                                {
                                    Homes.map((item, index) => <Route key={index} path={item.path} render={props => this.route(item, props)} />)
                                }
                            </Switch>
                            //     }
                            // </Main>
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