import React from "react";
import './Filter.scss'

type FilterType = 'all' | 'completed' | 'incomplete';

interface FilterProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void 
}

const Filter: React.FC<FilterProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="todo-filter">
            <label>
                <input 
                    type="radio" 
                    name="filter"
                    value="all"
                    checked={currentFilter === 'all'}
                    onChange={() => onFilterChange('all')}
                />
                <span>전체</span>
            </label>
            <label>
                <input 
                    type="radio" 
                    name="filter"
                    value="completed"
                    checked={currentFilter === 'completed'}
                    onChange={() => onFilterChange('completed')}
                />
                <span>완료</span>
            </label>
            <label>
                <input 
                    type="radio" 
                    name="filter"
                    value="incomplete"
                    checked={currentFilter === 'incomplete'}
                    onChange={() => onFilterChange('incomplete')}
                />
                <span>미완료</span>
            </label>
        </div>
    )
}

export default Filter;
