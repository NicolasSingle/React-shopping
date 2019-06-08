import React, { Component } from 'react';
import NavHeader from 'public/NavHeader'
import { Radio, Button, Toast, Confirm } from 'zarm';
import './index.scss'
class PayOk extends Component {
    state = {
        btn: true,
        confirm: false
    }
    render() {
        return (
            <div className='pay-ok'>
                <div className='border-bottom'>
                    <NavHeader goBack={this.goBack} icon={true} title='支付详情' />
                </div>
                <Radio.Group type="cell" onChange={e => this.onChange(e)}>
                    <Radio className='border-bottom' value="0"><i className="fa fa-check-square" aria-hidden="true"></i>普通支付</Radio>
                    <Radio className='border-bottom' value="1"><i className="fa fa-weixin" aria-hidden="true"></i>支付宝</Radio>
                    <Radio className='border-bottom' value="2"><i className="fa fa-weixin" aria-hidden="true"></i>微信</Radio>
                </Radio.Group>
                {this.state.btn ? <Button className='btn' block theme="danger">支付</Button> : ''}
                <Confirm
                    shape="radius"
                    visible={this.state.confirm}
                    title="提示"
                    message="当前订单未支付,确定要返回吗？"
                    onOk={() => this.back()}
                    onCancel={() => this.setState({confirm:false})}
                />
            </div>
        )
    }

    goBack = () => {
        this.setState(state =>({
            confirm: true
        }))
    }

    back = () => {
        this.props.history.replace('/')
    }
    onChange = e => {
        let flag
        if (e == 1 || e == 2) {
            flag = false
            Toast.show('暂未实现', 500);
        } else {
            flag = true
        }
        this.setState(state => ({
            btn: flag
        }))
    }
}

export default PayOk;