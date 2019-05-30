import React, { Component } from 'react';
import './index.scss'
class GoodsSku extends Component {
    render() {
        return (
            <div className='goods-sku border-top'>
                <div className='home'>
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span>首页</span>
                </div>
                <div className='home'>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>购物车</span>
                </div>
                <div className='immediately'>加入购物车</div>
                <div className='immediately immediately2'>立即购买</div>
            </div>
        )
    }
}

export default GoodsSku;