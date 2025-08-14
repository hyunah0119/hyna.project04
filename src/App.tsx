import { useState, useEffect, useMemo } from 'react'
import type { Todo } from './types/todo'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Filter from './components/Filter'
import './App.scss'

dayjs.locale('ko')

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isLoaded, setIsLoaded] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      setTodos(parsed);
    }
    setIsLoaded(true);
  }, []);

  // 로컬 스토리지 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // 날짜  
  const handlePrevDate = () => {
    setCurrentDate(prev => prev.subtract(1, 'day'))
  }

  const handleNextDate = () => {
    setCurrentDate(prev => prev.add(1, 'day'))
  }

  const handleResetDate = () => {
    setCurrentDate(dayjs())
  }

  const isToday = currentDate.isSame(dayjs(), 'day')

  // 입력
  const handleAddTodo = (text: string, date: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      date,
      order: todos.length
    }

    setTodos(prev => [...prev, newTodo])
  }

  // list
  const handleToggle = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // 삭제
  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  // 수정
  const handleEdit = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, text: newText} : todo
      )
    )
  }

  // 드래그 앤 드롭
  const handleDropEnd = (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;

      const updated = [...todos];
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);

      setTodos(updated);
  }

  // 필터링
  const filteredTodos = useMemo(() => {
    console.log('받은 todos props:', todos);
    return todos
      .filter(todo => todo.date === currentDate.format('YYYY-MM-DD'))
      .filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
      });
  }, [todos, currentDate, filter]);

  return (
    <>
      <div className="wrap">
        <div className="todo">
          <h3 className='todo-title'>Todo List</h3>
            <div className='todo-content'>
              {/* 오늘 날짜 출력 */}
              <div className='todo-today'>
                <button onClick={handlePrevDate}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <div className='today'>
                  <p className='today-txt'>{currentDate.format('YY.MM.DD (ddd)')}</p>
                  <button
                    className='today-btn'
                    onClick={handleResetDate}
                    disabled={isToday}
                  >오늘</button>
                </div>
                <button onClick={handleNextDate}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
              
              {/* AddTodo 컴포넌트 */}
              <AddTodo
                currentDate={currentDate}
                onAddTodo={handleAddTodo}
              />

              {/* FilterBar 컴포넌트 */}
              <Filter 
                currentFilter={filter}
                onFilterChange={setFilter}
              />

              {/* TodoList 컴포넌트 */}
              {isLoaded && (
                <DragDropContext onDragEnd={handleDropEnd}>
                  <TodoList
                    todos={filteredTodos}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </DragDropContext>
              )}
            </div>
        </div>
      </div>
    </>
  )
}

export default App
