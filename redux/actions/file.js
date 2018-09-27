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

export function deleteFile(fileUrl){
    return async function (dispatch,getState){
        enclosure({
            serviceId: 'fileServiceImpl',
            method: 'deleteFile',
            param:{fileUrl}
        }).then((e) => {
            if(e.status==='1'){
                dispatch({
                    type: 'file.loading',
                    state: {loading: true}
                })
                let param={}
                param.param={fileName:getState().file.inputValue}
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
        })
    }
}