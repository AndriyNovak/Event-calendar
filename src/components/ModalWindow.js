import * as React from 'react';

export class ModalWindow extends React.Component {
    constructor(state,props){
        super(state,props)
        
    }
    

  
    render() {
        return (
             <div className="modalWindow-wrap" style={{display:this.props.displayModalWindow ?"none": "flex"}}>
                <div className="modalWindow">
                    <textarea  autoFocus rows="7" value={this.props.inpEvent} placeholder="Введите событие" onChange={()=>this.props.handlerChange(event)}></textarea>
                    <div className="all-btn">
                        <button className="save-btn" onClick={()=>this.props.handlerClickSave(this.props.inpEvent)}>Сохранить</button>
                        <button className="cancel-btn"  onClick={()=>this.props.handlerClickCencel()}>Отмена</button>
                    </div>
                </div>
                
                
            </div>
        )
      
    }
}
