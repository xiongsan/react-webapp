
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Carousel} from 'antd'
const bodyHeight=document.body.clientHeight
const height=(1-0.0325*2)*0.275*0.82*bodyHeight-2//减去2是因为border占2px
const rectMargin=0.006*bodyHeight
const rectHeight = (height - 7 * rectMargin) / 6
import styles from './MsgModule.less'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    renderNewItem(){
        return (
            <div id="itemContainer" className={styles.itemsContainer} style={{top:-rectHeight}}/>
        )
    }
    render() {
        return (
            <section className={styles.MsgModule}>
                <div className={styles["platform-exception-up"]}>
                    <span className={styles["platform-exception-span"]}>消息提醒</span>
                </div>
                <div className={styles["platform-exception-down"]}>
                    {this.renderNewItem()}
                    <div className={styles["platform-exception-down-contain-div"]}/>
                </div>
            </section>
        )
    }
}
export default index