import React, { Component } from 'react'
import Swipers from 'swiper/dist/js/swiper.js'

function contentRender(slider) {
    return slider.map(item => {
        return (
            <div className="swiper-slide" key={item.get('goodsId')}><img src={item.get('image')} alt='' /></div>
        );
    });
}

class Swiper extends Component {
    render() {
        new Swipers('.swiper-container', {
            loop: true,  //循环
            observer: true,
            autoplay: {   //滑动后继续播放（不写官方默认暂停）
                disableOnInteraction: false,
            },
            pagination: {  //分页器
                el: '.swiper-pagination',
            }
        })
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {contentRender(this.props.slider)}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
}
// Swiper.propTypes = {
//     slider: PropTypes.array,
// }

Swiper.defaultProps = {
    slider: []
};
export default Swiper