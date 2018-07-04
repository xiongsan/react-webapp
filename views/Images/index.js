import React, {Component} from 'react'
import {enclosure} from 'enclosure-utils'
import styles from './style.less'
import {Carousel} from 'antd';


class Index extends Component {
    constructor(props) {
        super(props)
        this.state={
            items:[]
        }
    }

    componentWillMount() {
        enclosure({serviceId:'fileServiceImpl',method:'showPic'}).then((e) => {
            if(e.status==='1'){
                this.setState({items:e.data})
            }
        })
    }

    renderCarousel(){
        const {items} = this.state
        let imgs=[]
        items.map((item)=>{
            console.log(item)
            const src=`baseController/showPic/${item.fileUrl}`
            const img=<img key={item.id} alt={item.fileName} src={src} style={{height: '500px'}}/>
            imgs.push(img)
        })
        return (<Carousel dots={false} autoplay autoplaySpeed={3000}>{imgs}</Carousel>)
    }

    render() {
        return (
            <section>
                {this.renderCarousel()}
            </section>

        )
    }
}

export default Index
