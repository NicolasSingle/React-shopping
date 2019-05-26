import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
class index extends Component {
    render() {
        return (
            <div>
                我的
                <NavFooter active={3} />
            </div>
        );
    }
}

export default index;