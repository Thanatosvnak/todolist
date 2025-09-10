import { useState } from 'react'
import './index.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Todo List</h1>
          <p className="text-center text-gray-600 mb-6">Quản lý công việc của bạn</p>
          
          <div className="flex mb-6">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Thêm công việc mới..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg"
              onClick={handleAddTodo}
            >
              Thêm
            </button>
          </div>
          
          <ul>
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
              >
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-blue-600 mr-3" 
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>

          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-6">Không có công việc nào. Hãy thêm mới!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App