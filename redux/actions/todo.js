import {enclosure} from 'enclosure-utils'
import { notification } from 'antd';
export function titleChange(title) {
    return {type: 'todo.titleChange', title}
}

export function addTodo() {
    return async function (dispatch,getState) {
        await enclosure({serviceId:'todoListServiceIml',method:'addTodo',param:{title:getState().todo.title}}).then((e) => {
                if(e.status==='1'){
                    notification.success({
                        message:'添加任务',
                        description:'添加任务成功',
                        duration:1
                    })
                }
                else{
                    notification.error({
                        message:'添加任务',
                        description:e.tips,
                        duration:1
                    })
                }
        });
        await extractFunction(dispatch,true)
    }
}

export function complete(param) {
    return async function (dispatch) {
        await  enclosure({serviceId:'todoListServiceIml',method:'modifyTodoList',param}).then((e)=>{
            if(e.status==='1'){
                notification.success({
                    message:'任务执行',
                    description:'状态更改成功',
                    duration:1
                })
            }
            else{
                notification.error({
                    message:'任务执行',
                    description:e.tips,
                    duration:1
                })
            }
        })
       await extractFunction(dispatch)
    }
}

export function deleteTask(param) {
    return async function (dispatch) {
      await  enclosure({serviceId:'todoListServiceIml',method:'cancelTodo',param}).then((e)=>{
            if(e.status==='1'){
                notification.success({
                    message:'删除任务',
                    description:'删除任务成功',
                    duration:1
                })
            }
            else{
                notification.error({
                    message:'删除任务',
                    description:param.tips,
                    duration:1
                })
            }
        })
        await extractFunction(dispatch)
    }
}

export function queryTodoPage(pageNo) {
    return async function (dispatch,getState) {
        let param={}
        param.pageNo=pageNo
        param.pageSize=getState().todo.pageSize
        dispatch({
            type:'todoPage',
            state:{loading:true}
        })
        enclosure({serviceId:'todoListServiceIml',method:'getPageData',param}).then((e)=>{
            dispatch({
                type:'todoPage',
                state:{dataSource:e.data,total:e.recordsTotal,loading:false,current:pageNo}
            })
    })
    }
}

export function changeFilter(filter) {
    return {type: 'todo.changeFilter', filter}
}

export function getTodoList(){
    return async function (dispatch) {
        extractFunction(dispatch)
    }
}
function extractFunction(dispatch,flag){
    enclosure({serviceId:'todoListServiceIml',method:'todoList',param:{}}).then((e)=>{
        if(e.status==='1'){
            dispatch({
                type:'todo.TodoList',
                todoList:e.data
            })
            if(flag)
                dispatch({type:'todo.addTodo',title:''})
        }
    })
}