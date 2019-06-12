import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import { Radio, Button, Toast, Confirm, Alert } from 'zarm';
import './index.scss'
import Api from 'api/api'
class PayOk extends Component {
    state = {
        btn: true,
        confirm: false,
        alert: false,
        mallPrice: '',
    }
    id = ''
    componentDidMount() {
        this.id = this.props.match.params.id
        this.getOrderDetils(this.id)
    }
    render() {
        return (
            <div className='pay-ok'>
                <div>
                    <NavHeader goBack={this.goBack} icon={true} title='支付详情' />
                </div>
                <Radio.Group type="cell" onChange={e => this.onChange(e)}>
                    <Radio className='border-bottom' value="0"><i className="fa fa-check-square" aria-hidden="true"></i>普通支付</Radio>
                    <Radio className='border-bottom' value="1"><i className="fa fa-weixin" aria-hidden="true"></i>支付宝</Radio>
                    <Radio className='border-bottom' value="2"><i className="fa fa-weixin" aria-hidden="true"></i>微信</Radio>
                </Radio.Group>

                {this.state.btn && this.state.mallPrice ? <Button className='btn' onClick={this.pay} block theme="danger">支付</Button> : ''}
                <Confirm
                    shape="radius"
                    visible={this.state.confirm}
                    title="提示"
                    message="当前订单未支付,确定要返回吗？"
                    onOk={() => this.back()}
                    onCancel={() => this.setState({ confirm: false })}
                />
                <Alert
                    shape="radius"
                    visible={this.state.alert}
                    title="提示"
                    message={`支付成功,一共${this.state.mallPrice}元`}
                    onCancel={this.offAlert}
                />
            </div>
        )
    }

    goBack = () => {
        this.setState(state => ({
            confirm: true
        }))
    }

    back = () => {
        // this.props.history.replace('/')
        this.props.history.goBack()
    }
    onChange = e => {
        e = Number(e)
        let flag
        if (e === 1 || e === 2) {
            flag = false
            Toast.show('暂未实现', 500);
        } else {
            flag = true
        }
        this.setState(state => ({
            btn: flag
        }))
    }

    pay = async () => {
        // 支付
        const data = await Api.payOrder({ order_id: this.id })
        if (data.code === window.SUCCESS) {
            setTimeout(() => {
                this.setState(state => ({
                    alert: true
                }))
            }, 400);

        }
    }

    offAlert = () => {
        this.back()
    }
    getOrderDetils = async order_id => {
        const data = await Api.getOrderDetils({ order_id })
        if (data.code === window.SUCCESS) {
            if (data.data.status === 0) {
                this.setState(state => ({
                    mallPrice: data.data.mallPrice
                }))
            } else {
                Toast.show(`该订单已完成`, 500);
                setTimeout(() => {
                    this.back()
                }, 1000);
            }

        }
    }
}

export default PayOk;