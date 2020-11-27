import React,{useContext,useEffect} from 'react'
import ReactDom from 'react-dom';
import {TotalTodoListContext} from './App';
import Todoitems from './todoitems';

function TodoDetails({open,setOpen,children}) 
{ 
    const todoDetailedList=useContext(TotalTodoListContext);

    const closeViewPopup=(e)=>{
        document.querySelector('.detailed-todo').classList.add("detailed-popup");
        setTimeout(()=>{
            setOpen(false);
            document.querySelector('.detailed-todo').classList.remove("detailed-popup");
            document.querySelector('body').style.overflow="visible";
        },400);
    }

    if(!open) return null;

    return ReactDom.createPortal(
        <div className="detailed-todo" >
            <div className="todo-info">
                {/* <TotalTodoListContext.Consumer> */}
                <button onClick={closeViewPopup}><i className="fas fa-window-close close-todo-view-window"></i></button>
                <Todoitems todoDetailedList={todoDetailedList} />
                {/* {children} */}
          
                {/* </TotalTodoListContext.Consumer> */}
            </div>
        </div>,document.getElementById('todo-details')
    )
}

export default TodoDetails;