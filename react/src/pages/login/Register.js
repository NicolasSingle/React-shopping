import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
import { toast } from 'js/utils'
import { connect } from 'react-redux';
import * as action_fn from './store/action_fn'
class Register extends Component {
    state = {
        username: '',
        password: '',
        email: ''
    }

    render() {
        return (
            <div className='public'>
                <div className='sign-in-warp warp'></div>
                <div className='header'>
                    <NavHeader goBack={this.goBack} icon={true} title='新账户' />
                </div>
                <div className='inputs'>
                    <div className='pwd'>
                        <input maxLength='10' name='username' defaultValue={this.state.username} onChange={this.handleInputChange} type='text' placeholder='USERNAME' />
                    </div>
                    <div className='pwd'>
                        <input type='email' name='email' placeholder='EMAIL' defaultValue={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' type='password' name='password' placeholder='PASSWORD' defaultValue={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <p>
                        <span onClick={this.goSignin}>已经有账户了吗？</span>
                    </p>
                    <span className='btn' onClick={this.register}>注 册</span>
                </div>
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/login/index');
    }

    goSignin = () => {
        this.props.history.push('/login/signin');
    }

    handleInputChange = e => {
        e.persist()
        this.setState(prev => ({
            [e.target.name]: e.target.value
        }))
    }
    // 注册
    register = async () => {
        const state = this.state
        if (!state.username || !state.password || !state.email) {
            return toast('请填写完整信息','error')
        }
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!reg.test(state.email)) {
            return toast('邮箱格式错误','error')
        }
        // 注册
        this.props.register(state,this)
    }
}

const mapDispatchToProps = dispatch => ({
    register(state,that) {
        dispatch(action_fn.register(state,that))
    }
})

export default connect(null, mapDispatchToProps)(Register)