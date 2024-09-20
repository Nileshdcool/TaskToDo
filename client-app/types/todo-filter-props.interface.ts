import { Tab } from '../enums/tab.enums';

export interface TodoFiltersProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    viewMode: 'currentView' | 'tableView';
    onToggleView: (mode: 'currentView' | 'tableView') => void;
}