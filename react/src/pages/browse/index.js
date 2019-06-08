import React, { Component } from 'react';
import Scroll from 'public/Scroll'
import GoodsItem from 'public/GoodsItem'
import { Confirm } from 'zarm';
import { fromJS } from 'immutable'
import { recentlyBrowse } from 'js/cache'
import './index.scss'
import NavHeader from 'public/NavHeader'
class index extends Component {
    state = {
        confirm: false,
        list: fromJS(recentlyBrowse.getBrowse())
    }
    render() {
        return (
            <div>
                <div className='border-bottom'>
                    <div className='browse-header'>
                        <NavHeader goBack={this.goBack} icon={true} title='最近浏览' />
                        {recentlyBrowse.getBrowse().length?<span onClick={()=>this.setState({confirm:true})}>清空</span>:''}
                    </div>
                    <div className='browse'>
                        <Scroll>
                            {
                                this.state.list.map(item => {
                                    return <GoodsItem isCollection={true} key={item.get('_id')} goodsItem={item} deleteItem={() => this.deleteItem(item.get('id'))} />
                                })
                            }
                        </Scroll>
                    </div>
                </div>
                {
                    !recentlyBrowse.getBrowse().length ? <div className='no-data'>暂无最近浏览~~</div> : null
                }

                <Confirm
                    shape="radius"
                    visible={this.state.confirm}
                    title="确认信息"
                    message="你确定清空吗？"
                    onOk={this.clear}
                    onCancel={() => this.setState({ confirm: false })}
                />
            </div>
        );
    }

    goBack = () => {
        this.props.history.push('/my')
    }

    deleteItem = id => {
        recentlyBrowse.deleteOne(id)
        this.setState({
            list: fromJS(recentlyBrowse.getBrowse())
        })
    }

    clear = () => {
        recentlyBrowse.clearBrowse()
        this.setState({
            confirm: false,
            list: fromJS(recentlyBrowse.getBrowse())
        })
        
    }
}

export default index;