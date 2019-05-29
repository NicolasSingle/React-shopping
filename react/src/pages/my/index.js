import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { NavBar } from 'zarm';
import User from 'c/my/User'
import TabItems from 'c/my/TabItems'

class index extends Component {
    render() {
        return (
            <div>
                <NavBar title="我的" className='border-bottom' />
                <User />
                <TabItems/>
                <NavFooter active={3} />
            </div>
        );
    }
}

export default index;