

import * as React from 'react';

export class ListEvent extends React.Component {
    constructor(state,props){
        super(state,props)
       
      
    }
    

    
  
    render() {
       
        return (
             <div className="wrap-lists" >               
                <ul className="list">  
                {
                    this.props.arrayDatesAndEvents.map((elem,i)=>{
                       return ( elem.id === this.props.counter && this.props.monthCurrent ===elem.month) &&
                        elem.arrEventList.map((list,j)=>{ 
                          return (                                
                            <li key={j}>{list}</li>  
                          )
                        })
                    })
                    	
                    }
                </ul>
            </div>
        )
      
    }
}
