import { useState } from 'react';
import {SearchBarProps} from '@/types/search-bar.interface';


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="relative">
            <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search todos..."
            className="border p-2 mb-4 w-full pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
            <span className="absolute right-3 top-3 text-gray-500">
            🔍
            </span>
        </div>
    );
};

export default SearchBar;