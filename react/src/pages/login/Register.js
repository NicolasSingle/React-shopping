import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
import Api from 'api/api'
import { toast } from 'js/utils'
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
                        <input maxLength='16' name='password' placeholder='PASSWORD' defaultValue={this.state.password} onChange={this.handleInputChange} />
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
            return toast('请填写完整信息')
        }
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!reg.test(state.email)) {
            return toast('邮箱格式错误')
        }
        Api.register(state).then(res => {
            if (res.code == 10000) {
                toast(res.msg, 'right-round')
                localStorage.setItem('token', res.data)
                setTimeout(() => {
                    this.props.history.push('/home');
                }, 1000);
            }

        })

    }
}


export default Register