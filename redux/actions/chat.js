import $ from 'jquery'
import { notification } from 'antd';

$.postJSON = function(url, data, callback) {
    return $.ajax({
        'type' : 'POST',
        'url' : url,
        'contentType' : 'application/json',
        'data' : JSON.stringify(data),
        'dataType' : 'json',
        'success' : callback
    });
};
export function titleChange(title) {
    return {type: 'todo.titleChange', title}
}

