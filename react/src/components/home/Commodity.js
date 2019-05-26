import React, { Component } from 'react';
import Swipers from 'swiper/dist/js/swiper.js'

class Commodity extends Component {
    render() {
        new Swipers('.swiper-container1', {
            slidesPerView: 3,
            loop: false,
            autoplay: false,
            observer: true,
        })
        return (
            <div className='commodity'>
                <div className='border-bottom titles'>商品推荐</div>
                <div className="swiper-container1">
                    <div className="swiper-wrapper">
                        {
                            this.props.goodItem.map(item => {
                                return (
                                    <div className="swiper-slide border-right" key={item.get('goodsId')}>
                                        <div className='recommend-item'>
                                            <img src={item.get('image')} alt='' />
                                            <p className='name'>{item.get('goodsName')}</p>
                                            <p className='price'>
                                                <span className='code'>￥</span>
                                                <span className='mallPrice'>{item.get('mallPrice')}</span>
                                                <span className='price-min'>￥{item.get('price')}</span>
                                            </p>
                                            <div className='item'>
                                                <div className='left'><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                                <div className='right'>查看详情</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        );
    }
}
Commodity.defaultProps = {
    goodItem: []
};

export default Commodity;

