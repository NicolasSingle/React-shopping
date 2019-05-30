import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'zarm';
import NotLogged from 'c/shoppingCart/NotLogged'
import Logged from 'c/shoppingCart/Logged'
class index extends Component {
    render() {
        return (
            <div>
                <NavBar title="购物车" className='border-bottom' />
                {
                    !localStorage.getItem('token') ? <NotLogged /> : <Logged/>
                }
                <NavFooter active={2} />
            </div>
        )
    }



}

export default withRouter(index)