import React, {Component} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'
import '!style!css!less!../style/index.less'
import rootReducer from '../redux/rootReducer'
import views from '../views'
import layout from '../layout/index'
import createLogger from 'redux-logger'
const logger = createLogger()
const store = createStore(rootReducer, applyMiddleware(thunk,logger))
const history = syncHistoryWithStore(hashHistory, store)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={views.Login}/>
                    <Route path="/register" component={views.Register}/>
                    <Route path="/todo" component={views.Todo}/>
                    <Route path="/layout" component={layout}>
                        <Route path="/todolist" component={views.Todolist}/>
                        <Route path="/exception" component={views.Exception}/>
                        <Route path="/images" component={views.Images}/>
                        <Route path="/files" component={views.Files}/>
                        <Route path="/chat" component={views.Chat}/>
                        <Route path="/sysManage" component={views.SysManage}/>
                        <Route path="/dataTransForm" component={views.DataTransform}/>
                        <Route path="/solrFile" component={views.SolrFile}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

render(<App/>, document.getElementById('app'))