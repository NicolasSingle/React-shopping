import React, { Component } from 'react';
import './index.scss'
import Tabs from 'c/details/Tabs'
import GoodsSku from 'c/details/GoodsSku'

class Details extends Component {
    render() {
        return (
            <div className='details'>
                <div className='banner'><img src='http://images.baixingliangfan.cn/shopGoodsImg/20180411/20180411083404_6619.jpg' /></div>
                <div className='goods-name border-top border-bottom'>
                    <div className='goods-title'>纳美小苏打源生护龈牙膏3010/支</div>
                    <div className='pic'>￥16.8</div>
                </div>
                <div className='goods-express border-topbottom'>
                    <span>运费：0</span>
                    <span>剩余：10000</span>
                    <span>收藏：<i className="fa fa-heart-o" aria-hidden="true"></i></span>
                </div>
                <Tabs/>
                <div className="icon-back" onClick={this.goBack}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <GoodsSku/>
            </div>
        )
    }

    goBack = () => {
        this.props.history.goBack()
    }
}

export default Details