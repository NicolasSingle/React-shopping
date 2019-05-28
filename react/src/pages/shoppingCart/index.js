import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { NavBar } from 'zarm';
class index extends Component {
    render() {
        return (
            <div>
                <NavBar title="购物车" className='border-bottom' />
                <NavFooter active={2}/>
            </div>
        );
    }
}

export default index;