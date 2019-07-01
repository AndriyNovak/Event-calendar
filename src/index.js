import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./style/style.scss";

import {ModalWindow} from './components/ModalWindow';
import {ListEvent} from "./components/ListEvent"
const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

class App extends React.Component {
    constructor(state){
        super(state)
        this.state = ({
            currentDate:new Date(),
            arrDayInWeek:[1,2,3,4,5,6,7],
            arrNumberOfWeek:[1,2,3,4,5],
            displayModalWindow:true,
            inpEvent:"",
            arrInputList:[],
            LastDayOfMonth:"",           
            flagCurrentDay:true,            
            activeClickPreviousMonth:false,
            activeClickCurrentMonth:true,
            activeClickNextMonth:false,
            currentMonth:"",
            month:(new Date()).getMonth(),            
            arrayDatesAndEvents:[],
            counter:0,
            arrDate:[]
        })
        
    }
    getLastDayOfMonth(year,month){
        const newDate = new Date(year,month+1,0);              
        return newDate.getDate(); 
          
    }
    getArrAllDayInMonth(){
        
        this.setState({
            LastDayOfMonth:this.getLastDayOfMonth(this.state.currentDate.getFullYear(),this.state.currentDate.getMonth())
        })
    }
    getCurrentMonth(month){
        
        return monthNames[month]
    }
    handlerClickPreviousMonth(){
        this.setState({
            flagCurrentDay:false,
            activeClickPreviousMonth:true,
            activeClickCurrentMonth:false,
            activeClickNextMonth:false, 

            month:this.state.month-1,
            LastDayOfMonth:this.getLastDayOfMonth(this.state.currentDate.getFullYear(),this.state.month-1)
        })
        if((this.state.month-1)===this.state.currentDate.getMonth()){
            this.setState({
                flagCurrentDay:true
            })
        }
        if(this.state.month<=0){
            this.setState({
               month:11
            })
        }
      
    }
    handlerClickNextMonth(){
        this.setState({
            flagCurrentDay:false,
            activeClickPreviousMonth:false,
            activeClickCurrentMonth:false,
            activeClickNextMonth:true,           
            month:this.state.month+1,
            LastDayOfMonth:this.getLastDayOfMonth(this.state.currentDate.getFullYear(),this.state.month+1)
        })
        if((this.state.month+1)===this.state.currentDate.getMonth()){
            this.setState({
                flagCurrentDay:true
            })
        }
        if(this.state.month>=11){
            this.setState({
               month:0
            })
        }
       
    }
    handlerClickCurrentMonth(){
        this.setState({ 
            month:this.state.currentDate.getMonth(),
            flagCurrentDay:true,
            activeClickPreviousMonth:false,
            activeClickCurrentMonth:true,
            activeClickNextMonth:false,           
            LastDayOfMonth:this.getLastDayOfMonth(this.state.currentDate.getFullYear(),this.state.currentDate.getMonth())
        })
    }
    
    componentWillMount(){
        this.getArrAllDayInMonth();      
              
    }

    handlerOnClickCell(counter,inpEvent){       
        this.setState({
            counter:counter,
            displayModalWindow:false,
                     
        })
        
    }
     
    handlerClickSave(inpEvent){           
        let arrAll = [];   
        if(inpEvent!==""){
            arrAll.push(...this.state.arrayDatesAndEvents,{
                id:this.state.counter,
                arrEventList:[inpEvent],
                month:this.state.month
            })
        } 
        this.setState({
            inpEvent:""  ,
            displayModalWindow:true,
            arrayDatesAndEvents: arrAll
                            
        });    
    }
    handlerClickCencel(){        
        this.setState({
            displayModalWindow:true 
        })
    }  
    handlerChange(event){        
        this.setState({
            inpEvent: event.target.value,
            
        })        
    }
   
    render() {
      
        return (
            <div className="main-wrap">
                <h2>КАЛЕНДАРЬ СОБЫТИЙ</h2>
                <header>
                    
                    <button className={this.state.activeClickPreviousMonth ? "btn btn-light active-click" : "btn btn-light"} onClick={()=>this.handlerClickPreviousMonth()}>Previous Month</button>
                    <button className={this.state.activeClickCurrentMonth ? "btn btn-light active-click" : "btn btn-light"} onClick={()=>this.handlerClickCurrentMonth()}>Current ({this.getCurrentMonth(this.state.month)})</button>
                    <button className={this.state.activeClickNextMonth ? "btn btn-light active-click" : "btn btn-light"} onClick={()=>this.handlerClickNextMonth()}>Next Month</button>
                </header>
              
                <table>                    
                    <tbody>
                    {      
                        this.state.arrNumberOfWeek.map((el1,i)=>{
                            return (
                                <tr key={i}>
                                    {  
                                        this.state.arrDayInWeek.map((el2,j)=>{ 
                                            if(( 7*i+j+1)<=this.state.LastDayOfMonth){
                                                if(( 7*i+j+1)===this.state.currentDate.getDate() && this.state.flagCurrentDay===true){
                                                    return (
                                                        <td key={j} className="cellWrap currentCell" onClick={()=>this.handlerOnClickCell(( 7*i+j+1),this.state.inpEvent)}>
                                                            {                                                            
                                                               7*i+j+1
                                                            }
                                                            <ListEvent                                                             
                                                                
                                                                counter={7*i+j+1}
                                                                monthCurrent={this.state.month}
                                                                arrayDatesAndEvents={this.state.arrayDatesAndEvents}
                                                            />
                                                        </td> 
                                                    )  
                                                }else return (
                                                    <td key={j} className="cellWrap" onClick={()=>this.handlerOnClickCell((7*i+j+1),this.state.inpEvent)}>
                                                        {                                                           
                                                            7*i+j+1
                                                        }
                                                        <ListEvent 
                                                                counter={7*i+j+1}  
                                                                monthCurrent={this.state.month}
                                                                arrayDatesAndEvents={this.state.arrayDatesAndEvents}                       
                                                            />
                                                    </td> 
                                                )  
                                            }  
                                        })
                                    }
                                </tr>
                            )
                        }) 
                    }  
                    </tbody>
                </table> 

                <ModalWindow 
                    displayModalWindow={this.state.displayModalWindow}                    
                    handlerChange={this.handlerChange.bind(this)}
                    handlerClickSave={this.handlerClickSave.bind(this)}
                    inpEvent={this.state.inpEvent}                   
                    handlerClickCencel={this.handlerClickCencel.bind(this)}
                    arrAllDatesAndEvents={this.state.arrAllDatesAndEvents}
                />
               
            </div>
            
           
        )
      
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));