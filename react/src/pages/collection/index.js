import React, { Component } from 'react'
import NavHeader from 'public/NavHeader'
import Scroll from 'public/Scroll'
import Api from 'api/api'
import './index.scss'
import GoodsItem from 'public/GoodsItem'
import { fromJS } from 'immutable'
class Collection extends Component {
    state = {
        list: []
    }
    page = 1
    componentDidMount() {

        this.getCollectionList()
    }
    render() {
        return (
            <div>
                <NavHeader goBack={this.goBack} icon={true} title='我的收藏' />
                <div className=' border-top'>
                    <div className='collection'>
                        <Scroll>
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

    getCollectionList = async () => {
        const data = await Api.getCollectionList({ page: this.page })
        if (data.code == 10000) {
            this.setState(prev => ({
                list: fromJS(data.data.list)
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
}

export default Collection