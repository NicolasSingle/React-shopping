import React, { Component } from 'react';
import Swipers from 'swiper/dist/js/swiper.js'
import { withRouter } from 'react-router-dom'
import { addShop } from 'js/utils'
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
                                    <div className="swiper-slide border-right" key={item.get('goodsId')} onClick={() => this.details(item.get('goodsId'))}>
                                        <div className='recommend-item'>
                                            <img src={item.get('image')} alt='' />
                                            <p className='name'>{item.get('goodsName')}</p>
                                            <p className='price'>
                                                <span className='code'>￥</span>
                                                <span className='mallPrice'>{item.get('mallPrice')}</span>
                                                <span className='price-min'>￥{item.get('price')}</span>
                                            </p>
                                            <div className='item'>
                                                <div className='left' onClick={(e) => this.addShop(e, item.get('goodsId'))}><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                                <div className='right' onClick={() => this.details(item.get('goodsId'))}>查看详情</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }

    details = id => {
        this.props.history.push({ pathname: '/details/' + id })
    }

    // 加入购物车
    addShop = (e, id) => {
        e.stopPropagation();
        addShop(id)
    }
}
Commodity.defaultProps = {
    goodItem: []
};

export default withRouter(Commodity)

