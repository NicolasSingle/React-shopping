import React, { Component } from 'react';
import './index.scss'
import Tabs from 'c/details/Tabs'
import GoodsSku from 'c/details/GoodsSku'
import { connect } from 'react-redux'
import * as action_fn from './store/action_fn'
import Scroll from 'public/Scroll'
class Details extends Component {
    page = 1

    componentDidMount() {
        this.props.goodsDetails(this.props.match.params.id, this.page)
    }
    render() {
        const { goods_details } = this.props
        return (
            <div>
                <div className="icon-back" onClick={this.goBack}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className='details'>
                    <Scroll pullup={true} onPullup={this.onPullup}>
                        <div className='banner'><img src={goods_details.getIn(['goodsOne', 'image'])} alt='' /></div>
                        <div className='goods-name border-top border-bottom'>
                            <div className='goods-title'>{goods_details.getIn(['goodsOne', 'name'])}</div>
                            <div className='pic'>￥{goods_details.getIn(['goodsOne', 'present_price'])}</div>
                        </div>
                        <div className='goods-express border-topbottom'>
                            <span>运费：0</span>
                            <span>剩余：10000</span>
                            <span>收藏：<i className="fa fa-heart-o" aria-hidden="true"></i></span>
                        </div>
                        <Tabs />

                    </Scroll>
                </div>
                <GoodsSku />
            </div>

        )
    }

    goBack = () => {
        this.props.history.goBack()
        
    }

    onPullup = that => {
        that.refresh()
    }
}

const mapGetters = state => ({
    goods_details: state.getIn(['details', 'goods_details'])
})

const mapActions = dispatch => ({
    goodsDetails(id, page) {
        dispatch(action_fn.getGoodsDetails(id, page))
    }
})

export default connect(mapGetters, mapActions)(Details) 