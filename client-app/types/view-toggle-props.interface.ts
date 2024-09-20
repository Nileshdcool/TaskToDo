export interface ViewToggleProps {
    viewMode: 'currentView' | 'tableView';
    onToggle: (mode: 'currentView' | 'tableView') => void;
}