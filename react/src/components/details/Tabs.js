import React, { Component } from 'react';
import { Tabs } from 'zarm';
import { connect } from 'react-redux'
const { Panel } = Tabs;
class GoodsTabs extends Component {
    render() {
        const { goods_details } = this.props
        return (
            <div>
                <Tabs onChange={(i) => { console.log(i); }} lineWidth={80}>
                    <Panel title="商品详情">
                        <div className="contenta" dangerouslySetInnerHTML={{__html: goods_details.getIn(['goodsOne','detail'])}}></div>
                    </Panel>
                    <Panel title="商品评论">
                        <div className="contenta-left">商品评论</div>
                    </Panel>
                </Tabs>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    goods_details: state.getIn(['details', 'goods_details'])
})
export default connect(mapStateToProps, null)(GoodsTabs)