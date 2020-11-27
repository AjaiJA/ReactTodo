import React from 'react';

function Todolist({inputFocusRef,todosList,setTodosList,optionFilter})
{
    const doneCheck=(e)=>{
       let checkTodoId=parseInt(e.target.getAttribute("data-target"));
       setTodosList(todosList.map((listCheck)=>{
            if(listCheck.id === checkTodoId)
            {
                return {
                    ...listCheck,completed:!listCheck.completed
                }
            }
            return listCheck;
       }));
    }

    const deleteTodoItems=(e)=>{
        let deleteTodoID=e.target.getAttribute("data-target");
        let trSelector=document.querySelectorAll('tr');
        for(let i = 0;i < trSelector.length;i++)
        {
            if(parseInt(trSelector[i].className)==deleteTodoID)
            {
                trSelector[i].classList.add("anime-tr-rotate");
                setTimeout(()=>{
                        setTodosList(todosList.filter((list)=>
                        list.id !== parseInt(deleteTodoID)
                    ));
                    trSelector[i].classList.remove("anime-tr-rotate");
                },500);
            }
        }
    }

    return(
        <div className="todo-list-section">
            <div className="todo-contents">
                <table>
                    <thead>
                        <tr>
                            <th>Check</th>
                            <th>Contents</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        optionFilter.map(content=>(  
                            <tr key={content.id} className={content.id}>
                                <td>
                                    <div className="check-anime">
                                        <input type="checkbox" ref={inputFocusRef} onClick={doneCheck} defaultChecked={content.completed} className="check-btn" data-target={content.id} />
                                        <span className="check-fade"></span>
                                    </div>
                                </td>
                                <td>
                                    <p className={`list-items ${content.completed ? "todo-list-plan-completed" : ""}`} >{content.content}</p>
                                </td>
                                <td>
                                    <button onClick={deleteTodoItems} className="fas fa-trash delete-btn" data-target={content.id} >Remove</button>
                                </td>
                            </tr>   
                        ))
                    }      
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todolist;