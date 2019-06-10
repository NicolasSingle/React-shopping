import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
import { connect } from 'react-redux';
import { toast } from 'js/utils'
import * as action_fn from './store/action_fn'

class SignIn extends Component {
    state = {
        check: false,
        username: '',
        password: ''
    }
    render() {
        return (
            <div className='public'>
                <div className='sign-in-warp warp'></div>
                <div className='header'>
                    <NavHeader goBack={this.goBack} icon={true} title='登 录' />
                </div>
                <div className='inputs'>
                    <div className='pwd'>
                        <input  name='username' defaultValue={this.state.username} onChange={this.handleInputChange} type='text' placeholder='USERNAME OR EMAIL' />
                        <i className='fa fa-close' onClick={this.clear}></i>
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' name='password' defaultValue={this.state.password} onChange={this.handleInputChange} type={this.state.check ? 'text' : 'password'} placeholder='PASSWORD' />
                        <i className={`fa ${this.state.check ? 'fa-eye' : 'fa-eye-slash'}`} onClick={this.checkEye}></i>
                    </div>
                    <p>
                        <span onClick={this.goRegister}>新账户</span>
                        <span onClick={this.restorePassword}>忘记密码？</span>
                    </p>
                    <span className='btn' onClick={this.login}>登 录</span>
                </div>
            </div>
        )
    }

    // 返回上一页
    goBack = () => {
        this.props.history.push('/login/index');
    }

    // 切换明文密码
    checkEye = () => {
        this.setState(prev => ({
            check: !prev.check
        }))
    }

    // 清空用户名
    clear = () => {
        this.setState(prev => ({
            username: ''
        }))
    }

    // 新账户
    goRegister = () => {
        this.props.history.push('/login/register');
    }

    restorePassword = () => {
        this.props.history.push('/login/restorePassword');
    }

    handleInputChange = e => {
        e.persist()
        this.setState(prev => ({
            [e.target.name]: e.target.value
        }))
    }

    // 登录
    login = () => {
        if (!this.state.username || !this.state.password) {
            return toast('请填写用户名或密码','error')
        }
        this.props.signin(this.state.username, this.state.password, this)
    }
}

const mapActions = dispatch => ({
    signin(name, pwd, that) {
        dispatch(action_fn.signin(name, pwd, that))
    }
})
export default connect(null, mapActions)(SignIn)