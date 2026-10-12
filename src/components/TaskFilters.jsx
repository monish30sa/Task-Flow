export default function TaskFilters({ search, onSearch, status, onStatus, priority, onPriority }) {
  return (
    <div className="filters">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search tasks..." aria-label="Search tasks" />
        {search && <button type="button" className="clear-search" onClick={() => onSearch('')} aria-label="Clear search">×</button>}
      </label>
      <label className="filter-select"><span className="sr-only">Filter by status</span>
        <select value={status} onChange={(event) => onStatus(event.target.value)}>
          <option value="All">All statuses</option><option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
      </label>
      <label className="filter-select"><span className="sr-only">Filter by priority</span>
        <select value={priority} onChange={(event) => onPriority(event.target.value)}>
          <option value="All">All priorities</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
      </label>
    </div>
  );
}
