import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import {v4 as uuid} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()
    const [error, setError] = useState('')

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        setError('')
        const name = todoNameRef.current.value
        if (name === '') return setError('Error: Cannot add empty input')
        todoNameRef.current.value = null
        return setTodos(prevTodos => {
            return [...prevTodos, {id: uuid(), name: name, complete: false}]
        })
    }

    function handleClearTodos() {
        let newTodos = todos.filter(todo => !todo.complete)
        return setTodos(newTodos)
    }

    return (
        <>
            <input ref={todoNameRef} type="text" />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Complete</button>
            <div>{error}<br/>{todos.filter(todo => !todo.complete).length} left to do</div><br />
            <div></div>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
        </>
    )
}

export default App;
