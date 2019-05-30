import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './index.scss'
class User extends Component {
    render() {
        return (
            <div className='user'>
                <img src='http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg' alt=''/>
                <p onClick={this.goLogin}>登录/注册</p>
            </div>
        );
    }

    goLogin = () => {
        this.props.history.push('/login')
    }
}

export default withRouter(User)