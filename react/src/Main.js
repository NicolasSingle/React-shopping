import React from 'react'
export default class Common extends React.Component {

    render() {
        return (
            <div>
                // 测试页面 我是主页面的头部
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}