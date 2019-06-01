import React, { Component } from 'react';
import { Stepper, Confirm } from 'zarm';
import {toast} from 'js/utils'
import Api from 'api/api'
class Logged extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const { list } = nextProps;
        // 当传入的type发生变化的时候，更新state
        if (list.length !== prevState.list.length) {
            return {
                list,
            }
        }
        return null;
    }
    selectAll = []
    state = {
        checkedAll: false,//全选状态
        checkFlag: false, // 是否有商品处于选中状态
        totalPrice: 0,   // 总价格
        list: [],
        confirm: false
    }

    componentDidMount() {
        setTimeout(() => {
            let ele = Array.from(document.querySelectorAll('.za-stepper__input'))
            ele.forEach(item => {
                item.setAttribute('disabled', 'disabled')
            })
        }, 100);
    }
    render() {
        return (
            <div className='logged'>
                <div className='goods-item2 count border-bottom'>
                    <div className='select'>
                        <input type='checkbox' checked={this.state.checkedAll} onChange={this.changeAll} />
                    </div>
                    <div className='conut-pic'>
                        <p>
                            <span>合计：</span>
                            <span className='pic'>￥{this.state.totalPrice}</span>
                        </p>
                        {this.state.checkFlag ? <p className='order-ok'>请确认订单</p> : null}

                    </div>
                </div>
                {
                    this.state.checkFlag ? (
                        <div className="confirm">
                            <div onClick={this.deleteShop}>删除</div>
                            <div>去结算</div>
                        </div>
                    ) : null
                }

                {/* 以下是商品 */}
                {
                    this.state.list.map(item => {
                        return (
                            <div className='goods-item2 border-bottom' key={item.cid}>
                                <div className='select'>
                                    <input type='checkbox' checked={item.check} onChange={() => this.changeItem(item.cid)} />
                                </div>
                                <div className='border pictures'><img src={item.image_path} alt='' /></div>
                                <div className='trade-warp'>
                                    <p className='trade-name'>{item.name}</p>
                                    <div>
                                        <p className='price'><span>￥</span>{this.toFixed(item.present_price * item.count)}</p>
                                        <p><Stepper shape="circle" defaultValue={item.count} min={1} max={20} onChange={(e) => this.stepper(e, item.cid)} /></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {/* alert确认框框 */}
                <Confirm
                    shape="radius"
                    visible={this.state.confirm}
                    title="确认信息"
                    message="确定要删除商品吗？"
                    onOk={() => this.onOk()}
                    onCancel={() => this.setState({confirm:false})}
                />
            </div>
        )
    }

    changeAll = () => {
        this.setState(prev => ({
            checkedAll: !prev.checkedAll
        }))
        if (!this.state.checkedAll) {   // 全选
            this.setState(prev => ({
                list: prev.list.map(item => ({ ...item, check: true })),
                checkFlag: true,
                totalPrice: this.totalPriceFn(prev.list)
            }))
            this.selectAll = this.state.list
        } else {   // 取消全选
            this.setState(prev => ({
                list: prev.list.map(item => ({ ...item, check: false })),
                checkFlag: false,
                totalPrice: 0
            }))
            this.selectAll = []
        }
    }

    // 单选
    changeItem = (id) => {
        let arr = [...this.state.list]
        let arr2 = arr.map(item => {
            if (item.cid == id) {
                if (!item.check) {
                    item.check = true
                } else {
                    item.check = false
                }
            }
            return {
                ...item
            }
        })
        // 勾住单选后全选
        // 获取单选的数组
        this.selectAll = arr2.filter(v => v.check == true)
        let seleteAllFlag
        // 判断单选的数组是不是等于商品的总共数组，如果是就是全选，否则就不是全选
        this.selectAll.length == arr.length ? seleteAllFlag = true : seleteAllFlag = false

        this.setState(prev => ({
            checkedAll: seleteAllFlag,
            items: arr2,
            checkFlag: this.selectAll.length ? true : false,
            totalPrice: this.totalPriceFn(this.selectAll)
        }))
    }

    // 计算总价的方法
    totalPriceFn = list => {
        return list.map(item => item.count * item.present_price).reduce((prev, cur) => (prev + cur), 0).toFixed(2)
    }

    // 保留两位小数
    toFixed = (pic) => {
        return pic.toFixed(2)
    }

    // 购物车加减
    stepper = async (count, id) => {
        const data = await Api.editCart({ count, id })
        if (data.code == 10000) {
            let arr = [...this.state.list]
            arr.forEach((item, index) => {
                if (item.cid == id) {
                    arr[index].count = count
                }
            })
            this.setState(prev => ({
                list: arr,
                totalPrice: this.totalPriceFn(arr)
            }))
        }
    }

    // 购物车删除
    deleteShop = () => {
        this.setState(prev=>({
            confirm: true
        }))
    }

    onOk = async () => {
        const ids = this.selectAll.map(item => {
            return item.cid
        })
        const data = await Api.deleteShop(ids)
        if (data.code == 10000) {
            toast(data.msg)
            this.setState(prev=>({
                confirm: false,
            }))

            // 调用方法再请求一次数据
            this.props.getCard()
        }
    }
}

Logged.defaultProps = {
    list: []
};
export default Logged