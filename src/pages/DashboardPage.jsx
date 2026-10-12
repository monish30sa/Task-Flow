import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import { useTasks } from '../state/TaskContext';

export default function DashboardPage() {
  const { tasks, loading, error, deleteTask } = useTasks();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [notice, setNotice] = useState('');

  const counts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'Pending').length,
    progress: tasks.filter((task) => task.status === 'In Progress').length,
    completed: tasks.filter((task) => task.status === 'Completed').length
  }), [tasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = `${task.title} ${task.description || ''}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (status === 'All' || task.status === status) && (priority === 'All' || task.priority === priority);
  }), [tasks, search, status, priority]);

  async function handleDelete(task) {
    if (!window.confirm(`Delete "${task.title}"? This cannot be undone.`)) return;
    try {
      await deleteTask(task.id);
      setNotice(`“${task.title}” was deleted.`);
      window.setTimeout(() => setNotice(''), 3000);
    } catch {
      setNotice('The task could not be deleted. Check that the API is running.');
    }
  }

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Good work starts with a plan<span className="heading-period">.</span></h1>
          <p className="page-subtitle">Keep your priorities clear and your progress moving.</p>
        </div>
        <Link to="/tasks/new" className="button button-primary"><span className="button-plus">+</span> New task</Link>
      </section>

      <section className="stats-grid" aria-label="Task summary">
        <StatCard label="Total tasks" value={counts.total} detail="Across your workspace" icon="▤" tone="blue" />
        <StatCard label="In progress" value={counts.progress} detail="Work underway" icon="◷" tone="purple" />
        <StatCard label="Pending" value={counts.pending} detail="Ready to get started" icon="○" tone="amber" />
        <StatCard label="Completed" value={counts.completed} detail="Nicely done" icon="✓" tone="green" />
      </section>

      <section className="tasks-section">
        <div className="section-heading">
          <div><h2>Your tasks</h2><p>Everything you need to move forward.</p></div>
          <span className="task-count">{filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}</span>
        </div>
        <TaskFilters search={search} onSearch={setSearch} status={status} onStatus={setStatus} priority={priority} onPriority={setPriority} />
        {notice && <div className="notice" role="status">{notice}</div>}
        {loading ? <div className="empty-state"><div className="empty-icon">◌</div><h3>Loading tasks…</h3><p>Your workspace will be ready in a moment.</p></div>
          : error ? <div className="empty-state"><div className="empty-icon">!</div><h3>Tasks are unavailable</h3><p>Start the local API with <code>npm run dev</code>, then try again.</p></div>
          : filteredTasks.length ? <div className="task-list">{filteredTasks.map((task) => <TaskCard key={task.id} task={task} onDelete={handleDelete} />)}</div>
          : <div className="empty-state"><div className="empty-icon">✓</div><h3>{tasks.length ? 'No matching tasks' : 'A fresh start'}</h3><p>{tasks.length ? 'Try changing your search or filters.' : 'Create your first task and make a little progress.'}</p>{!tasks.length && <Link to="/tasks/new" className="button button-primary">Create your first task</Link>}</div>}
      </section>
    </>
  );
}
