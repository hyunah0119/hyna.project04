import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import '../styles/common.scss'
import './AddTodo.scss'
import type { Dayjs } from "dayjs"

type AddTodoProps = {
    currentDate: Dayjs;
    onAddTodo: (text: string, date: string) => void;
}

const AddTodo = ({currentDate, onAddTodo}: AddTodoProps) => {
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = () => {
        if (!inputValue.trim()) return  //빈값 방지
        onAddTodo(inputValue, currentDate.format('YYYY-MM-DD'))
        setInputValue('')   //입력창 초기화
    }

    return (
        <>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="오늘 할 일 작성란"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
                <button onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
            </div>
        </>
    )
}

export default AddTodo
