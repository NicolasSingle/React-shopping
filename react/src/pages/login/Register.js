import React, { Component } from 'react'
import './index.scss'
import NavHeader from 'public/NavHeader'
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
                        <input maxLength='10' name='username' defaultValue={this.props.username} onChange={this.handleInputChange} type='text' placeholder='USERNAME' />
                    </div>
                    <div className='pwd'>
                        <input type='email' name='email' placeholder='EMAIL' defaultValue={this.props.email} onChange={this.handleInputChange} />
                    </div>
                    <div className='pwd'>
                        <input maxLength='16' type='password' name='password' placeholder='PASSWORD' defaultValue={this.props.password} onChange={this.handleInputChange} />
                    </div>
                    <p>
                        <span onClick={this.goSignin}>已经有账户了吗？</span>
                    </p>
                    <span className='btn' onClick={()=>this.props.signin(this)}>注 册</span>
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
        const data = {
            [e.target.name]: e.target.value
        }
        this.props.setInputVal(data)
    }
}



const mapStateToProps = state => ({
    username: state.getIn(['login', 'username']),
    password: state.getIn(['login', 'password']),
    email: state.getIn(['login', 'email']),
})

const mapDispatchToProps = dispatch => ({
    signin(that) {
        dispatch(action_fn.signin(that, 'register'))
    },
    setInputVal(val) {
        dispatch(action_fn.setInputVal(val))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)