import TodoTabs from "./TodoTabs";
import ViewToggle from "./ViewToggle";
import { TodoFiltersProps } from '@/types/todo-filter-props.interface';

const TodoFilters: React.FC<TodoFiltersProps> = ({ activeTab, onTabChange, viewMode, onToggleView }) => {
    return (
        <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
            <TodoTabs activeTab={activeTab} onTabChange={onTabChange} />
            <ViewToggle viewMode={viewMode} onToggle={onToggleView} />
        </div>
    );
};

export default TodoFilters;