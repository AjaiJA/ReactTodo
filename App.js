import React,{Component,useState,useEffect,useRef,useContext} from 'react';
import ReactDOM from 'react-dom';
import Form from './form';
import Todolist from './todolist';
import "./style.css";

export const TotalTodoListContext=React.createContext();

function App()
{
    const [textInput,setTextInput]=useState("");
    const [todosList,setTodosList]=useState([]);
    const [optionView,setOptionView]=useState("all");
    const [optionFilter,setOptionFilter]=useState([]);
    const [greeting,setGreeting]=useState("");
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    const [windowHeight,setWindowHeight]=useState(window.innerHeight);
    const [currentTime,setCurrentTime]=useState("-- : -- : --");
    const [currentDate,setCurrentDate]=useState("--- --,  ----");
    const [year,setYear]=useState(2020);

    useEffect(()=>{
        checkTodoStorage();
        setInterval(()=>currentDateTime(),1000);
        window.addEventListener('resize',setWidthHeight);
        return()=>{
            clearInterval(()=>currentDateTime());
            window.removeEventListener('resize',setWidthHeight);
        }
    },[]);

    useEffect(()=>{
        storeTodos();
        optViewFilterHandler();
    },[todosList,optionView,windowWidth]);

    const setWidthHeight=()=>{
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    const storeTodos=()=>{
        localStorage.setItem("JA's Todo",JSON.stringify(todosList));
    }

    const checkTodoStorage=()=>{
        let isStorageAlreadyAvailable=localStorage.getItem("JA's Todo");
        if(isStorageAlreadyAvailable != null)
        {
            let todoLocalStorage=JSON.parse(localStorage.getItem("JA's Todo"));
            setTodosList(todoLocalStorage);
        }
        else
        {
            localStorage.setItem("JA's Todo",JSON.stringify([]));
        }
    }

    const currentDateTime=()=>{
        let currentDate=new Date();
        let hour=currentDate.getHours().toString();
        let second=currentDate.getSeconds().toString();
        let minute=currentDate.getMinutes().toString();

        let currentGreeting=(hour >= 0  && hour < 12) ? "Good Morning" : (hour >= 12 && hour < 15 ) ? "Good Afternoon" : (hour >= 15 && hour < 19) ? "Good Evening" : "Good Night";  
        let monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        setCurrentDate(monthList[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear());
        setCurrentTime(((hour.length < 2) ? "0"+hour : hour) + " : " + ((minute.length < 2) ? "0"+minute : minute) + " : " + ((second.length < 2) ? "0"+second : second));
        setGreeting(currentGreeting);
        setYear(currentDate.getFullYear());
    }

    function optViewFilterHandler()
    {
        switch(optionView)
        {
            case 'completed':
                setTimeout(()=>setOptionFilter(todosList.filter(todoSelect=>todoSelect.completed === true)),300);
                break;
            case 'uncompleted':
                setTimeout(()=>setOptionFilter(todosList.filter(todoSelect=>todoSelect.completed === false)),300);
                break;
            case 'all':
                setOptionFilter(todosList);
                break;
            default:
                break;
        }
    }

    return(
        <div className="App">
            <TotalTodoListContext.Provider value={todosList}>
                <header>
                    <div className="header">
                        <div onClick={()=>location.reload(true)}className="logo-header">
                            <h3 style={{cursor:"pointer"}} className="todo-logo">Todo</h3>
                        </div>
                        <div className="greeting-display">
                            <h2>{greeting}</h2>
                        </div>
                        <div className="time-header">
                            <h3 className="time-current">{currentTime}</h3>
                            <h3 className="current-date">{currentDate}</h3>
                        </div>
                    </div>
                </header>
                <section>
                    <Form textInput={textInput} setTextInput={setTextInput} todosList={todosList} setTodosList={setTodosList} optionView={optionView} windowWidth={windowWidth} setOptionView={setOptionView} currentTime={currentTime} currentDate={currentDate} />
                    {(optionFilter.length > 0) ? <Todolist todosList={todosList} setTodosList={setTodosList} optionFilter={optionFilter} windowWidth={windowWidth} /> : <div className="None-todo"><h3>List is Empty...</h3></div>}
                </section>
                <footer>
                  {/* <h3>Width : {windowWidth}</h3>
                    <h3>Height : {windowHeight}</h3> */}
                    <div className="footer">
                    <h2>All &copy; Rights Reserved <sup>2020-{year}</sup></h2>
                    </div>
                </footer>
            </TotalTodoListContext.Provider>
        </div>
    );
}

export default App;