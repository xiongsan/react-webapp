import {enclosure} from 'enclosure-utils'


export function queryFileList(param) {
    return async function (dispatch) {
        dispatch({
            type: 'file.loading',
            state: {loading: true}
        })
        enclosure({
            serviceId: 'fileServiceImpl',
            method: 'getFileList',
            param
        }).then((e) => {
            dispatch({
                type: 'file.list',
                state: {dataSource: e.data, total: e.recordsTotal, loading: false, current: param.pageNo}
            })
        })
    }
}

export function inputChange(value) {
    return async function (dispatch, getState) {
        dispatch({
            type: 'file.loading',
            state: {loading: true, inputValue: value}
        })
        let param={}
        param.param={fileName:value}
        param.pageNo=getState().file.current
        param.pageSize=getState().file.pageSize
        enclosure({
            serviceId: 'fileServiceImpl',
            method: 'getFileList',
            param
        }).then((e) => {
            dispatch({
                type: 'file.list',
                state: {dataSource: e.data, total: e.recordsTotal, loading: false}
            })
        })
    }
}