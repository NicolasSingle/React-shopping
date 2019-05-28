import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { NavBar } from 'zarm';
import { connect } from 'react-redux'
import * as action_fn from './store/action_fn'
import GoodsItem from 'public/GoodsItem'
import Scroll from 'public/Scroll'
import './index.scss'
class Category extends Component {
    state = {
        leftTabIndex: 0,
        rightTabIndex: 0,
        list: [],
        defaultValue: 0,
        scrollTo: false
    }
    componentDidMount() {
        this.props.getCategory(this)
        let ele = document.querySelector('.tab-title')
        ele.style.width = (21.333 * 4) + 'vw'
    }
    render() {
        return (
            <div>
                <NavBar title="商品分类" className='border-bottom' />
                <div className='content'>
                    <ul className='left'>
                        {
                            this.props.category.map((item, index) => {
                                return (
                                    <li onClick={() => this.onLeftTab(item, index)} className={`${this.state.leftTabIndex == index ? 'active' : ''}`} key={item.get('mallCategoryId')}>{item.get('mallCategoryName')}</li>
                                )
                            })
                        }
                    </ul>
                    <div className='right'>
                        <div className='tab-title'>
                            {
                                this.state.list.map((item, index) =>
                                    (<div onClick={() => this.onRightTab(item, index)} className={`tab-item ${this.state.rightTabIndex == index ? 'active' : ''}`} key={item.get('mallSubId')}>{item.get('mallSubName')}</div>))
                            }
                        </div>
                        <div className="scroll-warpper-category">
                            <Scroll scrollTo={this.state.scrollTo}>
                                {
                                    this.props.goodsItem.map(item => {
                                        return <GoodsItem key={item.get('id')} goodsItem={item} />
                                    })
                                }
                            </Scroll>
                        </div>
                    </div>
                </div>
                <NavFooter active={1} />
            </div>
        );
    }

    // 点击左侧列表
    onLeftTab = (val, index) => {
        
        if (this.state.leftTabIndex == index) {
            return
        }
        const id = this.props.category.getIn([index, 'bxMallSubDto', 0, 'mallSubId'])
        setTimeout(() => {
            this.props.getGoodsList(id)
        }, 0);
        this.setState(prev => ({
            leftTabIndex: index,
            list: val.get('bxMallSubDto'),
            scrollTo: true,
        }))
        this.getEle(val.get('bxMallSubDto').size)
    }


    // 点击右侧侧侧列表
    onRightTab = (val, index, ) => {

        if (this.state.rightTabIndex == index) {
            return
        }
        const id = this.props.category.getIn([this.state.leftTabIndex, 'bxMallSubDto', index, 'mallSubId'])
        setTimeout(() => {
            this.props.getGoodsList(id)
        }, 0);
        this.setState(prev => ({
            rightTabIndex: index,
        }))
    }

    getEle = width => {
        let ele
        if (width == 3) {
            setTimeout(() => {
                ele = document.querySelector('.tab-title')
                let childNodes = Array.from(ele.childNodes)
                ele.style.width = '100%'
                childNodes.forEach(item => {
                    item.style.width = '33.333%'
                })
            }, 0);

        } else {
            ele = document.querySelector('.tab-title')
            ele.style.width = (21.333 * width) + 'vw'
        }
    }


}
const mapGetters = state => ({
    category: state.getIn(['category', 'category']),
    goodsItem: state.getIn(['category', 'goodsItem'])
})

const mapActions = dispatch => ({
    getCategory(that) {
        dispatch(action_fn.getCategory(that))
    },

    getGoodsList(id) {
        dispatch(action_fn.getGoodsList(id))
    }
})

export default connect(mapGetters, mapActions)(Category)