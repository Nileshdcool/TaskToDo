interface TodoTabsProps {
    activeTab: 'all' | 'completed' | 'nonCompleted';
    onTabChange: (tab: 'all' | 'completed' | 'nonCompleted') => void;
}

const TodoTabs: React.FC<TodoTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => onTabChange('all')}
                className={`p-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-400 transition-colors duration-200`}
            >
                All
            </button>
            <button
                onClick={() => onTabChange('nonCompleted')}
                className={`p-2 ${activeTab === 'nonCompleted' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-400 transition-colors duration-200`}
            >
                Non-Completed
            </button>
            <button
                onClick={() => onTabChange('completed')}
                className={`p-2 ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-400 transition-colors duration-200`}
            >
                Completed
            </button>
        </div>
    );
};

export default TodoTabs;