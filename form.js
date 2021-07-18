import React, { useState, useEffect, useRef } from 'react';
import Modal from './modal';
import TodoDetails from './todoView';

function Form({textInput,setTextInput,todosList,setTodosList,optionView,setOptionView,windowWidth,currentTime,currentDate}) 
{
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [isTodoViewOpen,setIsTodoViewOpen]=useState(false);
    const inputFocusRef= useRef();

    useEffect(() => {  
        inputFocusRef.current.focus();
    }, []);

    const todoInputChange=(e)=>{
        let inputText=e.target.value;
        setTextInput(inputText);
    }

    const addBtnClick=()=>{
        if(textInput == "")
        {
            document.querySelector('.todo-text').placeholder="";
        }
        else
        {
            document.querySelector('.todo-text').placeholder="Enter today Plans";
            setTodosList([...todosList,{id:Date.now(),date:currentDate,time:currentTime,content:textInput,completed:false}]);
            setTextInput('');
        }
        document.querySelector('.todo-text').focus();
    }

    const todoFormSubmit=(event)=>{
        event.preventDefault();
    }

    const viewOptionHandler=(event)=>{
        setOptionView(event.target.value);
    }

    const clearCompleteTodo=(event)=>{
        let confirmClear=confirm("Are You sure to delete an entire Storage ?\n This action cannot be undone");
        if(confirmClear == 1)
        {
            if(localStorage.getItem("JA's Todo") != null)
            {
                localStorage.clear();
                setTodosList([]);
            }
        }
        else
        {
            return;
        }
    }

    const viewTotalTodo=()=>{
        setIsTodoViewOpen(true);
        document.querySelector('body').style.overflow="hidden";
    }

    return (
        <div className="form">
            <div className="form-input">
                <form method="Post" onSubmit={todoFormSubmit}>    
                    <div className="form-input-btn-display">
                        <div className="settings">
                            <button type="button" onClick={()=>setIsModalOpen(true)} style={{cursor:"pointer"}} className="fas fa-cog"></button>
                        </div>
                        <div className="custom-select-opt"> 
                            <select value={optionView} onChange={viewOptionHandler}>
                                <option value="all">All</option>
                                <option value="completed">{(windowWidth < 750) ? "Done" : "Completed"}</option>
                                <option value="uncompleted">{(windowWidth < 750) ? "UnDone" : "UnCompleted"}</option>
                            </select>
                            <span className="custom-arrow-display"></span>
                        </div>
                        <input autoComplete="off" ref={inputFocusRef} type="text" className="todo-text" onChange={todoInputChange} value={textInput} placeholder="Something like 'Want to read Books'" />
                        <button type="submit" className="add-btn" onClick={addBtnClick}>Add</button>
                    </div>
                </form> 
                <Modal open={isModalOpen}>
                    <button onClick={()=>{document.querySelector('.settings-modal').classList.add('setting-down-hide');setTimeout(()=>{document.querySelector('.settings-modal').classList.remove('setting-down-hide');setIsModalOpen(false)},200)}} className="fas fa-window-close close-settings"></button>
                    <div className="settings-view-option">
                        <div>
                            <button onClick={viewTotalTodo} className="viewTodoClick"><i className="fas fa-eye"></i>View</button>
                        </div>
                        <div>
                            <button onClick={clearCompleteTodo} className="clearCompleteTodo"><i className="fas fa-trash-alt"></i>Clear</button>
                        </div>
                    </div>
                </Modal>
                <TodoDetails open={isTodoViewOpen} setOpen={setIsTodoViewOpen}>
                </TodoDetails>
            </div>
        </div>
    )
}

export default Form;
