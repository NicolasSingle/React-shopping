import React, { Component } from 'react'
import BScroll from "better-scroll";
import PropTypes from 'prop-types';
class Scroll extends Component {
    scroll = null
    render() {
        return (
            <div id='scroll'>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }

    componentWillMount() {
        setTimeout(() => {
            //确保在dom初始化后才执行滚动方法
            this.init();
        }, 20);
    }
    init() {
        const ele = document.getElementById('scroll')
        if (!ele) {
            return;
        }
        this.scroll = new BScroll(ele, {
            probeType: this.props.probeType,
            click: this.props.click,
            pullDownRefresh: this.props.pullDownRefresh,
            bounce: this.props.bounce
        });
        if (this.props.listenScroll) {
            //滚动事件触发
            const that = this; //pos 指的是滚动到的位置
            this.scroll.on("scroll", pos => {
                that.$emit("scroll", pos);
            });
        }

        // 上拉加载
        if (this.props.pullup) {
            this.scroll.on("scrollEnd", () => {
                if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                    this.$emit("scrollToEnd");
                }
            });
        }

        // 下拉刷新
        if (this.props.pullDownRefresh) {
            this.scroll.on("scroll", pos => {
                if (pos.y > 50) {
                    this.$emit("scrollChange");
                }
            });
            //滑动结束松开事件
            this.scroll.on("pullingDown", () => {
                this.$emit("onPullDown");
            });
        }
        // 移动端滚动
        if (this.props.beforeScroll) {
            this.scroll.on("beforeScrollStart", () => {
                this.$emit("beforeScroll");
            });
        }
    }
    // 开启滚动
    enable() {
        this.scroll && this.scroll.enable();
    }
    // 关闭滚动
    disable() {
        this.scroll && this.scroll.disable();
    }
    finishPullDown() {
        this.scroll && this.scroll.finishPullDown();
    }
    refresh() {
        this.scroll && this.scroll.refresh();
    }
    scrollToElement() {
        this.scroll &&
            this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
    scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    }
}
Scroll.propTypes = {
    probeType: PropTypes.number,
    data: PropTypes.array,
    click: PropTypes.bool,
    listenScroll: PropTypes.bool,
    pullup: PropTypes.bool,
    pullDownRefresh: PropTypes.bool,
    beforeScroll: PropTypes.bool,
    bounce: PropTypes.object,
};

Scroll.defaultProps = {
    probeType: 1,
    data: [],
    click: true,
    listenScroll: false,
    pullup: false,
    pullDownRefresh: false,
    beforeScroll: false,
    bounce: {
        top:true
    },
};

export default Scroll