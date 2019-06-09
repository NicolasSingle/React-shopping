import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import Scroll from 'public/Scroll'
import Api from 'api/api'
import './index.scss'
import { Button } from 'zarm';
import PageHoc from 'c/hoc/PageHoc'
class index extends Component {
    state = {
        id: '',
        list: [],
    }
    page = 1
    componentDidMount() {
        let status = this.props.match.params.id
        if (status && (status == 0 || status == 1)) {
            this.setState(state => ({
                id: status
            }))
            this.getMyOrder(status)
        } else {
            this.props.history.replace('/my')
        }

    }
    render() {
        return (
            <div>
                <div className='border-bottom'>
                    <NavHeader goBack={this.goBack} icon={true} title='我的订单' />
                </div>
                <div className='order'>
                    <Scroll pullup={true} onRef={this.onRef} isToelement={true} onPullup={this.onPullup}>
                        <div className='scroll-list'>
                            {
                                this.state.list.map(item => {
                                    return (
                                        <div className='item' key={item._id}>
                                            <div className="top border-bottom">
                                                <div >订单编号: {item.order_id}</div>
                                                <div className="order-ok">
                                                    {this.state.id == 0 ? '待支付' : '已完成'}
                                                </div>
                                            </div>
                                            {
                                                item.order_list.map(val => {
                                                    return (
                                                        <div className="list" key={val._id}>
                                                            <img src={val.image_path} className="good-img" />
                                                            <div className="good-title">{val.name}</div>
                                                            <div className="good-count">
                                                                <p >￥{val.present_price * val.count}</p>
                                                                <p className="count">x{val.count}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="timre bottom border-top">创建时间: {item.add_time}</div>
                                            <div className="bottom">收货地址: {item.address}</div>
                                            <div className="bottom">共 {item.order_list.length} 件商品   合计: {item.mallPrice}</div>
                                            {
                                                this.state.id == 0 ? <Button block theme="danger" className='btn' onClick={() => this.goPay(item.order_id)}>去支付</Button> : ''
                                            }
                                        </div>
                                    )
                                })
                            }
                            {
                                !this.state.list.length ? <div className='no-data'>暂无订单~~</div> : null
                            }
                        </div>
                    </Scroll>
                </div>
            </div>
        )
    }
    onRef = (ref) => {
        this.child = ref
    }

    goBack = () => {
        this.props.history.push('/my')
    }

    getMyOrder = async (status, flag) => {
        if (this.props.isLocked()) return // 必须等待上一次请求完成
        this.props.locked()//开始请求之前锁住
        const data = await Api.myOrder({ status, page: this.page })
        if (data.code == 10000) {
            this.props.setTotal(data.data.count)  // 总条数
            this.props.unLocked() // 解锁
            if (flag && data.data.list.length) {
                this.props.setNewData(data.data.list)
                setTimeout(() => {
                    this.child.refresh()
                }, 200);
            } else {
                this.props.dataArr.push(...data.data.list)
            }


            this.setState(prev => ({
                list: this.props.dataArr
            }))
        }
    }

    goPay = id => {
        this.props.history.push(`/payOk/${id}`)
    }

    // 分页
    onPullup = () => {
        if (this.props.dataArr.length >= 10) {
            if (this.props.hasMore() && !this.props.isLocked()) {
                this.page++
                this.getMyOrder(this.state.id, true)
            }
        }
    }

}

export default PageHoc(index)