import React from 'react'

function Todoitems({todoDetailedList}) {
    return (
        <div className="todo-detailed-view-opt">
             <table className="table-pop">
                <thead>
                    <tr>
                        <th className="date-table-width">Date</th>
                        <th className="time-table-width">Time</th>
                        <th className="plan-table-width">Plan</th>
                        <th className="result-table-width">Result</th>
                    </tr>
                </thead>
                <tbody>
                {
                    todoDetailedList.map(content=>(
                        <tr key={content.id}>
                            <td>
                                <p className="pop-date">{content.date}</p>
                            </td>
                            <td>
                                <p className="pop-time">{content.time}</p>
                            </td>
                            <td>
                               <p className="list-items-pop">{content.content}</p>
                            </td>
                            <td>
                                <p className="result-pop">{(content.completed) ? "Completed" : "UnCompleted"}</p>
                            </td>
                        </tr>   
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Todoitems;
