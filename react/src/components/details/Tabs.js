import React, { Component } from 'react';
import { Tabs } from 'zarm';
const { Panel } = Tabs;
class GoodsTabs extends Component {
    render() {
        return (
            <div>
                <Tabs onChange={(i) => { console.log(i); }} lineWidth={80}>
                    <Panel title="商品详情">
                        <div className="content">商品详情</div>
                    </Panel>
                    <Panel title="商品评论">
                        <div className="content">商品评论</div>
                    </Panel>
                </Tabs>
            </div>
        );
    }
}

export default GoodsTabs;