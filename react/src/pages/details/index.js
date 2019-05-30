import React, { Component } from 'react';
import './index.scss'
import Tabs from 'c/details/Tabs'
import GoodsSku from 'c/details/GoodsSku'
import { connect } from 'react-redux'
import * as action_fn from './store/action_fn'

class Details extends Component {
    page = 1
    componentDidMount() {
        this.props.goodsDetails('418fc60784d04e71beffe1ce5174c947', this.page)
    }
    render() {
        return (
            <div className='details'>
                <div className='banner'><img src='http://images.baixingliangfan.cn/shopGoodsImg/20180411/20180411083404_6619.jpg' alt='' /></div>
                <div className='goods-name border-top border-bottom'>
                    <div className='goods-title'>纳美小苏打源生护龈牙膏3010/支</div>
                    <div className='pic'>￥16.8</div>
                </div>
                <div className='goods-express border-topbottom'>
                    <span>运费：0</span>
                    <span>剩余：10000</span>
                    <span>收藏：<i className="fa fa-heart-o" aria-hidden="true"></i></span>
                </div>
                <Tabs />
                <div className="icon-back" onClick={this.goBack}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <GoodsSku />
            </div>
        )
    }

    goBack = () => {
        this.props.history.goBack()
    }
}

const mapGetters = state => ({
    recommend: state.getIn(['home', 'recommend'])
})

const mapActions = dispatch => ({
    goodsDetails(id, page) {
        dispatch(action_fn.getGoodsDetails(id, page))
    }
})

export default connect(mapGetters, mapActions)(Details) 