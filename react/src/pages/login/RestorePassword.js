import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
import { connect } from 'react-redux';
import * as action_fn from './store/action_fn'
class RestorePassword extends Component {
    state = {
        password: '',
        email: ''
    }

    render() {
        return (
            <div className='public'>
                <div className='sign-in-warp warp'></div>
                <div className='header'>
                    <NavHeader goBack={this.goBack} icon={true} title='找回密码' />
                </div>
                <div className='inputs'>
                    <div className='pwd'>
                        <input type='email' name='email' type='email' placeholder='EMAIL' defaultValue={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' name='password' type='password' placeholder='PASSWORD' defaultValue={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <p>
                        <span>通过电子邮件还原密码</span>
                    </p>
                    <span className='btn' onClick={()=>this.props.signin(this)}>确认修改</span>
                </div>
            </div>
        )
    }

    goBack = () => {
        this.props.history.push('/login/index');
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
    email: state.getIn(['login', 'email']),
    password: state.getIn(['login', 'password']),

})

const mapDispatchToProps = dispatch => ({
    signin(that) {
        dispatch(action_fn.signin(that, 'restorePassword'))
    },
    setInputVal(val) {
        dispatch(action_fn.setInputVal(val))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword)