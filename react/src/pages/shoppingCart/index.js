import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
class index extends Component {
    render() {
        return (
            <div>
                购物车
                <NavFooter active={2}/>
            </div>
        );
    }
}

export default index;