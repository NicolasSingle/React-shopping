import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
import { connect } from 'react-redux';
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
                        <input name='username' maxLength='20' defaultValue={this.props.username} onChange={this.handleInputChange} type='text' placeholder='USERNAME OR EMAIL' />
                        {/* <i className='fa fa-close' onClick={this.clear}></i> */}
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' name='password' defaultValue={this.props.password} onChange={this.handleInputChange} type={this.state.check ? 'text' : 'password'} placeholder='PASSWORD' />
                        <i className={`fa ${this.state.check ? 'fa-eye' : 'fa-eye-slash'}`} onClick={this.checkEye}></i>
                    </div>
                    <p>
                        <span onClick={this.goRegister}>新账户</span>
                        <span onClick={this.restorePassword}>忘记密码？</span>
                    </p>
                    <span className='btn' onClick={()=>this.props.signin(this)}>登 录</span>
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

    // // 清空用户名
    // clear = () => {
    //     this.props.clearInputVal('username')
        
    //     setTimeout(() => {
    //         console.log(this.props.username);
            
    //     }, 0);
        
    // }

    // 新账户
    goRegister = () => {
        this.props.history.push('/login/register');
    }

    restorePassword = () => {
        this.props.history.push('/login/restorePassword');
    }

    handleInputChange = e => {
        e.persist()
        const data = {
            [e.target.name]: e.target.value
        }
        this.props.setInputVal(data)

    }
}

const mapStateToProps = state => ({
    username: state.getIn(['login', 'username']),
    password: state.getIn(['login', 'password']),
})

const mapDispatchToProps = dispatch => ({
    signin(that) {
        dispatch(action_fn.signin(that,'login'))
    },
    setInputVal(val) {
        dispatch(action_fn.setInputVal(val))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)