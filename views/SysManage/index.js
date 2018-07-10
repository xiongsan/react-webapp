/**
 * Created by LLB on 16/4/25.
 */
import React, {Component} from 'react'
import {message} from 'antd'
import {enclosure} from 'enclosure-utils'

class Index extends Component {
    static contextTypes={
        router:React.PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <section>
                系统管理模块带开发：用户管理，角色管理，菜单管理；
            </section>
        )
    }
}
export default Index