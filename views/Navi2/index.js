/**
 * Created by Winna on 2016/12/14.
 */
import React, {Component} from 'react'
import $ from 'jquery'
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        let i = 0
        let elements = []
        let elementContainer = $('#itemContainer')
        function addData() {
            i++
            elementContainer.children().remove()
            let element = $('<div  style="background:red;height:20px;width:100px;' +
                'margin-bottom:5px;position:relative;display:block;"></div>')
            element.html("异常" + i)
            elements.unshift(element)
            elements.length > 5?elements.pop():void(0)
            elements.map(item=>{
                $(item).css({top:0})
                elementContainer.append(item)
            })
            elements.map(item=>{
                item.animate({top: 25}, 500, 'linear', function () {
                })
            })
        }
        setInterval(addData, 500)
    }

    render() {
        return (
            <section id="platform-appList">
                <div id="itemContainer" style={{marginLeft:'301px',
                    marginTop:'75px',height:'125px',
                    background:'pink',marginBottom:'5px',
                    overflow: 'hidden'}}>
                </div>
                <div
                    style={{marginLeft:'300px',
                        height:'100px',
                        width:'102px',
                        position:'absolute',
                        overflow: 'hidden',
                        border:'solid 1px black'}}
                >
                </div>
            </section>
        )
    }
}
export default Test