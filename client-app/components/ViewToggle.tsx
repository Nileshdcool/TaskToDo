import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faTable } from '@fortawesome/free-solid-svg-icons';
import { ViewToggleProps } from '@/types/view-toggle-props.interface';

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
    return (
        <div className="flex gap-4">
            <FontAwesomeIcon 
                onClick={() => onToggle('currentView')} 
                icon={faAddressCard} 
                className={`h-8 w-8 cursor-pointer ${viewMode === 'currentView' ? 'text-blue-500' : 'hover:text-blue-500'} transition-colors duration-200`} 
            />
            <FontAwesomeIcon 
                onClick={() => onToggle('tableView')} 
                icon={faTable} 
                className={`h-8 w-8 cursor-pointer ${viewMode === 'tableView' ? 'text-blue-500' : 'hover:text-blue-500'} transition-colors duration-200`} 
            />
        </div>
    );
};

export default ViewToggle;