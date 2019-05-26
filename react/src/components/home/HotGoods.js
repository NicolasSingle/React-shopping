import React, { Component } from 'react';
// import Lazyimg from 'react-lazyimg-component';
class HotGoods extends Component {
    render() {
        return (
            <div>
                <div className='title'>热销商品</div>
                <ul className='hot-goods'>
                    {
                        this.props.hotGoodsList.map(item => {
                            return (
                                <li className='border-top' key={item.get('goodsId')}>
                                    <img src={item.get('image')} alt='' />
                                    {/* <Lazyimg className="lazy" src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}  /> */}
                                    <p className='name'>{item.get('name')}</p>
                                    <p className='price'>
                                        <span className="code">￥</span>
                                        <span className="mallPrice">{item.get('mallPrice')}</span>
                                        <span className="price-min">{item.get('price')}</span>
                                    </p>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

        );
    }
}

HotGoods.defaultProps = {
    hotGoodsList: [],
};
export default HotGoods;