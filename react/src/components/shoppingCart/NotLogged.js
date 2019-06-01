import React, { Component } from 'react'
import shop from 'img/shop.png'
import { withRouter } from 'react-router-dom'
import './index.scss'


class NotLogged extends Component {
    render() {
        return (
            <div className='not-logged'>
                <div className='shop'><img src={shop} alt=''/></div>
                
                <p className="desc">
                {
                    !localStorage.getItem('token') ? '请先登录噢~~': '暂无商品~~'
                }
                </p>
                {
                    !localStorage.getItem('token') ? <p className="desc2" onClick={this.goLogin}>去登录</p>: <p className="desc2" onClick={this.goHome}>去购物</p>
                }
                
            </div>
        )
    }

    goLogin =() =>{
        this.props.history.push('/login/index');
    }
    
    goHome = () => {
        this.props.history.push('/');
    }
}

export default withRouter(NotLogged)