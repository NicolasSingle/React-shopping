import React, { Component } from 'react';
import './index.scss'
import { addShop } from 'js/utils'
import { withRouter } from 'react-router-dom'

class GoodsSku extends Component {
    render() {
        return (
            <div className='goods-sku border-top'>
                <div className='home' onClick={()=>this.props.history.push('/')}>
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span>首页</span>
                </div>
                <div className='home'  onClick={()=>this.props.history.push('/shoppingCart')}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>购物车</span>
                </div>
                <div className='immediately' onClick={this.addCard}>加入购物车</div>
                <div className='immediately immediately2'>立即购买</div>
            </div>
        )
    }

    addCard = () => {
        addShop(this.props.id)
        
    }
}

export default withRouter(GoodsSku)