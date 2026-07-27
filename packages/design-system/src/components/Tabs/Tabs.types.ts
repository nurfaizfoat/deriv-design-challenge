export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  /** Available tabs. */
  tabs: TabItem[];
  /** The id of the currently active tab. */
  activeTab: string;
  /** Called when a tab is clicked. */
  onChange: (tabId: string) => void;
  className?: string;
}
