import React, { Component } from 'react'
import NavHeader from 'public/NavHeader'
import Scroll from 'public/Scroll'
import Api from 'api/api'
import './index.scss'
import GoodsItem from 'public/GoodsItem'
import { fromJS } from 'immutable'
import PageHoc from 'c/hoc/PageHoc'

class Collection extends Component {
    state = {
        list: []
    }
    page = 1
    componentDidMount() {
        this.getCollectionList()
    }
    render() {
        const list = fromJS(this.props.dataArr)
        return (
            <div>
                <NavHeader goBack={this.goBack} icon={true} title='我的收藏' />
                <div className=' border-top'>
                    <div className='collection'>
                        <Scroll pullup={true} onPullup={this.onPullup}>
                            {
                                this.state.list.map(item => {
                                    return <GoodsItem isCollection={true} key={item.get('_id')} goodsItem={item} deleteItem={this.deleteItem} />
                                })
                            }

                        </Scroll>
                    </div>
                </div>

            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/my')
    }

    getCollectionList = async (flag) => {
        if (this.props.isLocked()) return // 必须等待上一次请求完成
        this.props.locked()//开始请求之前锁住
        const data = await Api.getCollectionList({ page: this.page })
        if (data.code == 10000) {
            this.props.setTotal(data.data.count)  // 总条数
            this.props.unLocked() // 解锁
            if (flag) {
                this.props.setNewData(data.data.list)
            } else {
                this.props.dataArr.push(...data.data.list)
            }
            this.setState(prev => ({
                list: fromJS(this.props.dataArr)
            }))
        }
    }

    // 删除收藏
    deleteItem = async id => {
        const data = await Api.cancelCollection({ id })
        if (data.code == 10000) {
            this.getCollectionList()
        }
    }

    // 分页
    onPullup = () => {
        if (this.props.dataArr.length >= 10) {
            if (this.props.hasMore()) {
                this.page++
                this.getCollectionList(true)
            } 
        }
    }
}

export default PageHoc(Collection)