import React, { Component } from 'react';
import './index.scss'
import Tabs from 'c/details/Tabs'
import GoodsSku from 'c/details/GoodsSku'
import { connect } from 'react-redux'
import * as action_fn from './store/action_fn'
import Scroll from 'public/Scroll'
class Details extends Component {
    page = 1
    state = {
        isCollection: 0,
    }
    id = ''
    componentDidMount() {
        this.id = this.props.match.params.id
        this.props.goodsDetails(this.id, this.page)
        this.props.isCollectionFn(this.id, this)
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
                            <span>
                                {this.state.isCollection == 0 ? '收藏：' : '取消收藏  '}

                                <i style={{ color: `${this.state.isCollection != 0 ? 'red' : ''}` }} className={`fa  ${this.state.isCollection == 0 ? 'fa-heart-o' : 'fa-heart'}`} onClick={() => this.collection(this.id)} aria-hidden="true"></i>
                            </span>
                        </div>
                        <Tabs />

                    </Scroll>
                </div>
                <GoodsSku id={goods_details.getIn(['goodsOne', 'id'])} />
            </div>

        )
    }

    goBack = () => {
        this.props.history.goBack()

    }

    onPullup = that => {
        that.refresh()
    }

    // 点击收藏
    collection = id => {
        this.props.collection(id, this)
    }
}

const mapStateToProps = state => ({
    goods_details: state.getIn(['details', 'goods_details'])
})

const mapDispatchToProps = dispatch => ({
    goodsDetails(id, page) {
        dispatch(action_fn.getGoodsDetails(id, page))
    },

    isCollectionFn(id, that) {
        dispatch(action_fn.isCollection(id, that))
    },

    collection(id, that) {
        dispatch(action_fn.collection(id, that))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Details) 