import React from 'react';
import ReactDOM from 'react-dom';
import Todo  from './Todo.js'
class List extends React.Component{
    constructor(props){
      super(props)
    
    }
    
    render(){
             return (
            <div className={this.props.listItem.completed ? 'done' : 'ul'}>
            <li id = {this.props.listItem.id} onClick={()=>{this.props.changeState(this.props.listItem) }}>{ this.props.listItem.description }</li>
            <button id = {8} onClick={() =>this.props.removeMission( this.props.listItem.id)}><span>&#10060;</span></button>
            </div>)
    }
}

export default List;

