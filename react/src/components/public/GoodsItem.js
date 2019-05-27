import React from 'react';
export default props => {
    return (
        <div className='goods-item border-bottom'>
            <div className='border left'><img src={props.goodsItem.get('image_path')} /></div>
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