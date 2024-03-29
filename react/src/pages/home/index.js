import React from 'react'
import './index.scss'
import Search from 'c/home/Search'
import Swiper from 'c/home/Swiper'
import Panl from 'c/home/Panl'
import Commodity from 'c/home/Commodity'
import Floor from 'c/home/Floor'
import HotGoods from 'c/home/HotGoods'
import Scroll from 'public/Scroll'
import NavFooter from 'public/NavFooter'
import * as action_fn from './store/action_fn'
import { connect } from 'react-redux'
import 'swiper/dist/css/swiper.min.css'

class Home extends React.Component {
    componentDidMount() {
        this.props.getRecommend()
    }

    render() {
        const recommend = this.props.recommend
        return (
            <div >
                <Search />
                <div className='scroll-warpper'>
                    <Scroll pullup={true} onPullup={this.onPullup}>
                        <Swiper slider={recommend.get('slides')} />
                        <Panl panlList={recommend.get('category')} />
                        <Commodity goodItem={recommend.get('recommend')} />
                        <Floor title='休闲食品' floor={recommend.get('floor1')}/>
                        <Floor title='新鲜水果' floor={recommend.get('floor2')}/>
                        <Floor title='营养奶品' floor={recommend.get('floor3')}/>
                        <HotGoods hotGoodsList={recommend.get('hotGoods')}/>
                    </Scroll>
                </div>
                <NavFooter/>
            </div>
        )
    }

    onPullup = that => {
        that.refresh()
    }
}


const mapStateToProps = (state) => ({
    recommend: state.getIn(['home', 'recommend'])
})

const mapDispatchToProps = dispatch => ({
    getRecommend() {
        dispatch(action_fn.getRecommend())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)