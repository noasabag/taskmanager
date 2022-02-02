import './App.css';
import React from 'react';
import List from './list.js'
import './ToDo.css'

class Todo extends React.Component{
  constructor(props){
    super(props)
    this.state={list:[]}
  }
  
  addMission = (event) => {
    let a=Math.random()
    this.setState( {
      list: [...this.state.list,{id:a, description:document.getElementById("myInput").value, completed:false}]
    }) 
     } 

  removeMission=(missionID)=>{
      let newARR = this.state.list.filter(object=>{
      if(object.id===missionID) return false
      else return true
    })
    this.setState({list:newARR})
     }

  changeState=(listItem)=>{       //mission completes or not
   var a =this.state.list.length
    for (let i = 0; i < a; i++) {
      if( this.state.list[i].id===listItem.id){
        this.setState({list:
        [  ...this.state.list.slice(0,i),
          Object.assign({}, this.state.list[i], {completed:!this.state.list[i].completed}), ...this.state.list.slice(i+1)]
        })
       }
    }
   
  }
  
  render(){
    
return(
  <div>
     <h1>To Do List</h1>
     <input  placeholder='decription' id = 'myInput'/> 
       <button id = {9} onClick={this.addMission}>add </button> 
      
            <ul>
               {
                this.state.list.map(element => {
             return (<div><List changeState={this.changeState} listItem={element} removeMission={this.removeMission} /></div>
)
            }
                  ) }
             </ul>
  
  </div>
  )


}

};
export default Todo;