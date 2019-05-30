import React, { Component } from 'react'
import shop from 'img/shop.png'
import { withRouter } from 'react-router-dom'
import './index.scss'


class NotLogged extends Component {
    render() {
        return (
            <div className='not-logged'>
                <div className='shop'><img src={shop} alt=''/></div>
                <p className="desc">请先登录噢~~</p>
                <p className="desc2" onClick={this.goLogin}>去登录</p>
            </div>
        )
    }

    goLogin =() =>{
        this.props.history.push('/login/index');
    }
}

export default withRouter(NotLogged)