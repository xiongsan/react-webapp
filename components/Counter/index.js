import React, {Component} from 'react'
import styles from './style.less'
const cols = [7, 6, 5, 4, 3, 2, 1]
export default class Count extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let num = this.props.num?this.props.num:'0'
        let i=7
        return (
            <div className={styles["count-container"]}>
                {cols.map(col => {
                    i--
                    return (
                        <div className={styles.count}>
                            <div id={"num"+i} className={styles.num}>{col > num.length? 0 : num.substring(num.length-col,num.length-col+1)}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
