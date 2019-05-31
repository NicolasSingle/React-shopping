
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class GoodsItem extends Component {
    render() {
        const props = this.props
        return (
            <div className='goods-item border-bottom' onClick={()=>this.details(props.goodsItem.get('id'))}>
                <div className='border left'><img src={props.goodsItem.get('image_path')} alt=''/></div>
                <div className='right'>
                    <p className='name'>{props.goodsItem.get('name')}</p>
                    <p className='price'>
                        <span className='pic'>￥{props.goodsItem.get('present_price')}</span>
                        <span className='orl-pic'>{props.goodsItem.get('orl_price')}</span>
                    </p>
                </div>
            </div>
        )
    }

    details = id => {
        this.props.history.push({ pathname: '/details/' + id })
    }
}

export default withRouter(GoodsItem)