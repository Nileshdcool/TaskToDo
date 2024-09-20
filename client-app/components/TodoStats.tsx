import Lottie from 'react-lottie';
import happyAnimationData from '../public/animations/happy.json';
import sadAnimationData from '../public/animations/sad.json';
import { TodoStatsProps } from '@/types/todo-state-props.interface';

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
        <div className="bg-blue-100 p-4 mb-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Todo Stats</h2>
            {todos.length === 0 ? (
            <div className="flex items-center space-x-2">
            <Lottie options={defaultOptions(happyAnimationData)} height={50} width={50} />
            <p className="text-md">No todos to display</p>
            </div>
            ) : (
            <div className="flex items-center space-x-2">
            {incompleteTodosCount === 0 ? (
            <Lottie options={defaultOptions(happyAnimationData)} height={50} width={50} />
            ) : (
            <Lottie options={defaultOptions(sadAnimationData)} height={50} width={50} />
            )}
            <p className="text-md">{incompleteTodosCount} items left to complete</p>
            </div>
            )}
        </div>
    );
};

export default TodoStats;