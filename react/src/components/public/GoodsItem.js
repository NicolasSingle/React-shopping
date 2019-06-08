
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class GoodsItem extends Component {
    render() {
        const props = this.props
        return (
            <div className='goods-item border-bottom' onClick={() => this.details(props.goodsItem.get('id')||props.goodsItem.get('cid'))}>
                <div className='border left'><img style={{ 'objectFit': props.isCollection || props.isPayMent? 'scale-down' : '' }} src={props.goodsItem.get('image_path')} alt='' /></div>
                <div className='right'>
                    <p className='name'>{props.goodsItem.get('name')}</p>
                    <p className='price'>
                        <span className='pic'>￥{props.goodsItem.get('count')?props.goodsItem.get('present_price')*props.goodsItem.get('count'):props.goodsItem.get('present_price')}</span>
                        {
                            !props.isCollection ? <span className='orl-pic'>{props.goodsItem.get('orl_price')}</span> : null
                        }
                        {
                            props.isPayMent ? <span className='count'>x{props.goodsItem.get('count')}</span> : null
                        }
                    </p>
                    {
                        props.isCollection ? <i onClick={(e) => this.deleteItem(e, props.goodsItem.get('cid'))} className="fa fa-close" aria-hidden="true"></i> : null
                    }
                </div>
            </div>
        )
    }

    details = id => {
        this.props.history.push({ pathname: '/details/' + id })
    }

    deleteItem = (e,id) => {
        e.stopPropagation();
        this.props.deleteItem(id)
    }
}

export default withRouter(GoodsItem)