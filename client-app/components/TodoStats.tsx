import { Todo } from '@/types/todo.interface';
import Lottie from 'react-lottie';
import happyAnimationData from '../public/animations/happy.json';
import sadAnimationData from '../public/animations/sad.json';

interface TodoStatsProps {
    todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
    const incompleteTodosCount = todos.filter(todo => !todo.isComplete).length;

    const defaultOptions = (animationData: any) => ({
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

    return (
        <div className="bg-blue-100 p-6 mb-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Todo Stats</h2>
            {todos.length === 0 ? (
            <div className="flex items-center space-x-4">
                <Lottie options={defaultOptions(happyAnimationData)} height={70} width={70} />
                <p className="text-lg">No todos to display</p>
            </div>
            ) : (
            <div className="flex items-center space-x-4">
                {incompleteTodosCount === 0 ? (
                <Lottie options={defaultOptions(happyAnimationData)} height={70} width={70} />
                ) : (
                <Lottie options={defaultOptions(sadAnimationData)} height={70} width={70} />
                )}
                <p className="text-lg">{incompleteTodosCount} items left to complete</p>
            </div>
            )}
        </div>
    );
};

export default TodoStats;