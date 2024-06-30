import React, { Component } from 'react'
import { BrowserRouter as Router,Route,Switch,Link
} from 'react-router-dom';
 class Test extends Component {
     state={
         title:'',
         body:''
     };
     componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => this.setState({
      title:data.title,
      body:data.body
  }))
     }
    render() {
        const {title, body} = this.state
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
}
export default Test;