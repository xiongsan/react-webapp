import React, {Component} from 'react'
import {Table, Input} from 'antd'

const Search = Input.Search;
import {connect} from 'react-redux'
import * as actions from 'actions/file'
import {Popconfirm} from "antd";

class File extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        this.props.dispatch(actions.queryFileList({pageNo:1,pageSize:this.props.pageSize}))
    }

    changePage(pageNo) {
        this.props.dispatch(actions.queryFileList({pageNo,pageSize:this.props.pageSize,param:{fileName:this.props.inputValue}}))
    }

    changeInput = (e) => {//箭头函数就不需要bind(this)了
        this.props.dispatch(actions.inputChange(e.target.value))
    }

    /*这个地方坑的我好惨*/
    handleDelete=(fileUrl)=>{
        this.props.dispatch(actions.deleteFile(fileUrl))
    }
    render() {
        let {pageSize, current, total, dataSource, loading, inputValue} = this.props
        const columns = [
            {title: '文件编号', dataIndex: 'id'},
            {title: '文件名', dataIndex: 'fileName'},
            {title: '文件uuid', dataIndex: 'fileUrl'},
            {
                title: '上传时间',
                dataIndex: 'createTime',
                render: createTime => new Date(createTime).format()
            },
            {
                title:'下载',
                dataIndex: 'operation',
                render:(text,record)=>{
                    const url=`baseController/download/${record.fileName}/${record.fileUrl}`
                    return (
                        <a href={url}>下载</a>
                    )
                }
            },
            {
                title:'删除',
                dataIndex: 'justIndex',
                render:(text,record)=>{
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.fileUrl)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    )
                }
            }
            ]
        return (
            <section id="platform-appList">
                <Search
                placeholder="按文件名检索"
                onChange={this.changeInput}
                value={inputValue}
                style={{ width: 500,marginBottom:'20px'}}
            />
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={record => record.id}
                    loading={loading}
                    pagination={{
                        pageSize: pageSize,
                        current: current,
                        total: total,
                        onChange: this.changePage.bind(this)
                    }}
                />
            </section>
        )
    }
}

function select(state) {
    return state.file
}

export default connect(select)(File)