import React, { Component } from 'react';
import NavFooter from 'public/NavFooter'
import { NavBar, Tabs } from 'zarm';
import { connect } from 'react-redux'
import * as action_fn from './store/action_fn'
import GoodsItem from 'public/GoodsItem'
import Scroll from 'public/Scroll'
import './index.scss'
const { Panel } = Tabs;
class Category extends Component {
    state = {
        leftTabIndex: 0,
        list: [],
        defaultValue: 0,
    }
    ele = null
    componentDidMount() {
        this.props.getCategory(this)
        this.ele = document.querySelector('.right .za-tabs .za-tabs__header ul')
        this.ele.style.width = (21.333 * 4) + 'vw'
        let childNodes
        setTimeout(() => {
            childNodes = Array.from(this.ele.childNodes)
            childNodes.forEach((item, index) => {
                if (index == 0) {   // 设置默认选中状态
                    item.style.color = '#e0322b'
                }
            })
        }, 10);
    }
    render() {
        // console.log(this.props.category.getIn([0, 'bxMallSubDto']));
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
                        <Tabs onChange={(i) => this.onChangeTab(i)} defaultValue={this.state.defaultValue}>
                            {
                                this.state.list.map(item => {
                                    return (
                                        <Panel title={item.get('mallSubName')} key={item.get('mallSubId')}>
                                            <div className="scroll-warpper-category">
                                                <Scroll>
                                                    {
                                                        this.props.goodsItem.map(item => {
                                                            return <GoodsItem key={item.get('id')} goodsItem={item} />
                                                        })
                                                    }
                                                </Scroll>
                                            </div>
                                        </Panel>
                                    )
                                })
                            }
                        </Tabs>
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
        this.setState(prev => ({
            leftTabIndex: index,
            list: val.get('bxMallSubDto'),
        }))
        this.getEle(val.get('bxMallSubDto').size)
    }


    getEle = (width) => {
        if (this.ele) {
            let childNodes
            setTimeout(() => {
                childNodes = Array.from(this.ele.childNodes)
                childNodes.forEach((item, index) => {
                    if (index == 0) {   // 设置默认选中状态
                        item.style.color = '#e0322b'
                    }
                })
            }, 10);
            if (width == 3) {
                setTimeout(() => {
                    this.ele.style.width = '100%'
                    childNodes.forEach(item => {
                        item.style.width = '33.333%'
                    })
                }, 10);
            } else {
                setTimeout(() => {
                    this.ele.style.width = (21.333 * width) + 'vw'
                }, 50);
            }
        }
    }

    onChangeTab = index => {
        console.log(index);
        
        this.elefn(index)
        console.log(this.props.category.getIn([this.state.leftTabIndex,'bxMallSubDto',index,'mallSubId']));
        
    }


    elefn = index => {
        if (this.ele) {
            let childNodes = Array.from(this.ele.childNodes)
            for (let i = 0; i < childNodes.length; i++) {
                if (i == index && childNodes[i].style.color) {
                    return
                }
                for (var j = 0; j < childNodes.length; j++) {
                    childNodes[j].style.color = ""
                }
                childNodes[index].style.color = "#e0322b"
            }
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
    }
})

export default connect(mapGetters, mapActions)(Category)