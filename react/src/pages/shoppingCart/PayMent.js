import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import Scroll from 'public/Scroll'
import { Modal } from 'zarm';
import Api from 'api/api'
import GoodsItem from 'public/GoodsItem'
import * as action_fn from './store/action_fn'
import { connect } from 'react-redux';
import Address from 'c/shoppingCart/Address'
import Submit from 'c/shoppingCart/Submit'
class PayMent extends Component {
    state = {
        address: {},
        modal: false,
        time: 3
    }

    componentDidMount() {
        if (!this.props.orderList.size) {
            this.props.history.push('/shoppingCart')
        } else {
            this.getDefaultAddress()
        }

    }

    render() {
        return (
            <div>
                <div className='border-bottom'>
                    <NavHeader goBack={this.goBack} icon={true} title='订单结算' />
                </div>
                <Address address={this.state.address} />
                <div className='payMent'>
                    <Scroll>
                        {
                            this.props.orderList.map(item => {
                                return <GoodsItem isPayMent={true} key={item.get('_id')} goodsItem={item} />
                            })
                        }
                    </Scroll>
                </div>
                <Submit totalPrice={this.props.totalPrice} submit={this.submit} />
                <Modal visible={this.state.modal} onMaskClick={() => console.log(1)}>
                    <Modal.Header title="提示" />
                    <Modal.Body style={{ textAlign: 'center' }}>正在生成订单中 {this.state.time}</Modal.Body>
                </Modal>
            </div >

        );
    }

    goBack = () => {
        this.props.history.push('/shoppingCart')
    }


    getDefaultAddress = async () => {
        const data = await Api.getDefaultAddress()
        if (data.code == 10000) {
            this.setState(state => ({
                address: { ...state.address, ...data.data }
            }))
        }
    }

    // 去支付
    submit = () => {
        this.setState(prev => ({
            modal: true,
        }))
        this.placeOrder()
        let timeNum = 3
        let timer = setInterval(() => {
            timeNum--
            if (timeNum < 0) {
                clearInterval(timer)
                this.props.history.push('/payOk')
            } else {
                this.setState(prev => ({
                    time: timeNum
                }))
            }
        }, 1000);
    }

    placeOrder = () => {
        console.log(this.props.orderList.toJS());
        
    }
}
const mapGetters = state => ({
    orderList: state.getIn(['shoppingCart', 'orderList']),
    totalPrice: state.getIn(['shoppingCart', 'totalPrice']),
})

const mapActions = dispatch => ({
    setOrderList(list) {
        dispatch(action_fn.setOrderList(list))
    }
})
export default connect(mapGetters, mapActions)(PayMent)