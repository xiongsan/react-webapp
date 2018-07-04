import React, {Component} from 'react'
import {Table} from 'antd'
import {enclosure} from 'enclosure-utils'
import {connect} from 'react-redux'
import * as actions from 'actions/todo'
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
	componentWillMount(){
        this.props.dispatch(actions.queryTodoPage(1))
	}
	changePage(pageNo){
        this.props.dispatch(actions.queryTodoPage(pageNo))
	}
    render() {
		let {pageSize,current,total,dataSource,loading}=this.props
		const columns=[
		{title:'编号',dataIndex:'id'},
		{title:'姓名',dataIndex:'title'},
		{title:'检查',dataIndex:'checked'},
		{title:'性别',dataIndex:'sex'}]
        return (
            <section id="platform-appList">
               <Table 
				dataSource={dataSource}
				columns={columns}
				rowKey={record => record.id}
                loading={loading}
                pagination={{pageSize:pageSize,current:current,total:total,onChange:this.changePage.bind(this)}}
			   />
            </section>
        )
    }
}
function select(state) {
    return state.todo
}
export default connect(select)(Test)