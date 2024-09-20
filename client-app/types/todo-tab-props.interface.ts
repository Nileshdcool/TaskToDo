import { Tab } from "@/enums/tab.enums";

export interface TodoTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}