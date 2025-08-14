import { useState } from 'react'
import styled from 'styled-components'
import type { Todo } from '../types/todo'
import './TodoList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { 
    faPenToSquare as faPenToSquareRegular, 
    faTrashCan as faTrashCanRegular 
} from '@fortawesome/free-regular-svg-icons'
import { Droppable, Draggable } from '@hello-pangea/dnd'

type TodoListProps = {
    todos: Todo[]
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (id: string, newText: string) => void
}

const CheckboxWrap = styled.label`
    display: flex;
    flex-flow: row wrap;
    width: 87%;
    cursor: pointer;

    @media (max-width: 800px) {
        width: 79%;
    }
`

const InputCheckbox = styled.input`
    display: none;
`

const CustomCheckbox = styled.span`
    align-self: center;
    width: 16px;
    height: 16px;
    border: 1px solid #1e3a8a;
    border-radius: 50%;
    position: relative;

    ${InputCheckbox}:checked + & {
        background-color: #9ca3af;
        border-color: #9ca3af;
    }

    ${InputCheckbox}:checked + &::after {
        content: '';
        position: absolute;
        top: 1px;
        left: 5px;
        width: 4px;
        height: 9px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    @media (max-width: 800px) {
        width: 12px;
        height: 12px;

        ${InputCheckbox}:checked + &::after {
            width: 2px;
            height: 7px;
            left: 4.5px;
        }
    }
`

const InputText = styled.span`
    align-self: center;
    font-size: 1rem;
    margin-left: 5px;

    @media (max-width: 800px) {
        font-size: .8125rem;
    }

    &.completed {
        color: #9ca3af;
        opacity: 0.6;
        text-decoration: line-through;
    }
`

const ModifyDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 87%;
    cursor: pointer;

    @media (max-width: 800px) {
        width: 79%;
    }
`

const ModifyInput = styled.input`
    min-width: 450px;
    border: 1px solid #162c6b;
    border-radius: 5px;
    margin-left: 5px;
    padding-left: 3px;
    box-sizing: border-box;

    @media (max-width: 800px) {
        min-width: 60%;
    }
`

const DoneBtn = styled.button`
    font-size: .875rem;
    color: #1e3a8a;
    border: 1px solid #1e3a8a;
    border-radius: 5px;
    margin-left: 5px;
    padding: 2px 5px;
    box-sizing: border-box;
    transition: background-color .2s ease, color .2s ease, opacity .2s ease;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
        background-color: #1e3a8a;
        color: #fff;
    }

    @media (max-width: 800px) {
        font-size: .75rem;
    }
`



const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    return (
        <Droppable droppableId="todoList">
            {(provided) => (
                <ul className='todo-list' ref={provided.innerRef} {...provided.droppableProps}>
                    {todos.map((todo, index) => (
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                            {(provided) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                >
                                    <div className='todo-list__order'>
                                        <button 
                                            className='change-order'
                                            {...provided.dragHandleProps}
                                        >
                                            <FontAwesomeIcon icon={faBars} />
                                        </button>
                                    </div>

                                    {editingId === todo.id ? (
                                        <ModifyDiv>
                                            <ModifyInput
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                            />
                                            <DoneBtn onClick={() => {
                                                onEdit(todo.id, editText);
                                                setEditingId(null);
                                            }}>저장</DoneBtn>
                                        </ModifyDiv>
                                    ) : (
                                        <CheckboxWrap>
                                            <InputCheckbox
                                                type='checkbox'
                                                checked={todo.completed}
                                                onChange={() => onToggle(todo.id)}
                                            />
                                            <CustomCheckbox/>
                                            <InputText className={todo.completed ? 'completed' : ''}>{todo.text}</InputText>
                                        </CheckboxWrap>
                                    )}
                                    <div className='todo-list__btn'>
                                        <button className='modify' onClick={() => {
                                            setEditingId(todo.id);
                                            setEditText(todo.text);
                                        }}>
                                            <FontAwesomeIcon icon={faPenToSquareRegular} />
                                        </button>
                                        <button className='delete' onClick={() => onDelete(todo.id)}><FontAwesomeIcon icon={faTrashCanRegular} /></button>
                                    </div>
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    )
}

export default TodoList