import {enclosure} from 'enclosure-utils'


export function queryFileList(pageNo, param) {
    return async function (dispatch, getState) {
        dispatch({
            type: 'file.loading',
            state: {loading: true}
        })
        enclosure({
            serviceId: 'fileServiceImpl',
            method: 'solrService',
            pageNo,
            pageSize: getState().file.pageSize,
            param
        }).then((e) => {
            dispatch({
                type: 'file.list',
                state: {dataSource: e.data, total: e.recordsTotal, loading: false, current: pageNo}
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
        enclosure({
            serviceId: 'fileServiceImpl',
            method: 'solrService',
            pageNo:1,
            pageSize: getState().file.pageSize,
            param: {fileName: value}
        }).then((e) => {
            dispatch({
                type: 'file.list',
                state: {dataSource: e.data, total: e.recordsTotal, loading: false,current: 1}
            })
        })
    }
}