import React, { useState, useRef } from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()
    const [error, setError] = useState('')

    function handleAddTodo(e) {
        setError('')
        const name = todoNameRef.current.value
        if (name === '') return setError('Error: Cannot add empty input')
        todoNameRef.current.value = null
        return setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
        })
    }

    return (
        <>
            <input ref={todoNameRef} type="text" />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button>Clear Complete</button>
            <div>{error}<br/>{todos.length} left to do</div><br />
            <div></div>
            <TodoList todos={todos} />
        </>
    )
}

export default App;
