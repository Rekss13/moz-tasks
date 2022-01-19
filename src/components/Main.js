import React, {useContext, useState, useRef, useEffect} from "react";
import {nanoid} from "nanoid";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";
import usePrevious from "../utils/usePrevious";
import ThemeContext from "../context/ThemeContext";
import AppTheme from "../AppTheme";

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Complite: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Main = (props) => {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState(FILTER_NAMES[0]);
    const theme = useContext(ThemeContext)[0];

    const currentTheme = AppTheme[theme];

    const addTask = (name) => {
        const newTask = { id: "todo-"+nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }
    const toggleTaskCompleted = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) return {...task, completed: !task.completed};
            return task;
        });
        setTasks(updatedTasks);
    }
    const deleteTask = (id) => {
        const remainingTasks = tasks.filter(task => task.id !== id);
        setTasks(remainingTasks);
    }
    const editTask = (id, newName) => {
        const editedTask = tasks.map(task => {
            if (task.id === id) return {...task, name: newName};
            return task;
        });
        setTasks(editedTask);
    }

    const filterList= FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));
    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));
    const tasksNoun = taskList.length > 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);
    
    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) listHeadingRef.current.focus();
    }, [tasks.length, prevTaskLength]);

    return(
        <main style = {{
            backgroundColor: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.textColor}`,
        }}>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
            <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading" >
                {taskList}
            </ul>
        </main>
    );
}

export default Main;