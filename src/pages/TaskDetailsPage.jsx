import { Link, useParams } from 'react-router-dom';
import { useTasks } from '../state/TaskContext';
import TaskStatus from '../components/TaskStatus';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const { tasks, loading, error } = useTasks();
  const task = tasks.find((item) => String(item.id) === String(taskId));

  if (loading) return <div className="page-loading">Loading task details…</div>;
  if (error) return <div className="empty-state"><h2>Unable to load task</h2><Link to="/">Back to dashboard</Link></div>;
  if (!task) return <div className="empty-state"><h2>Task not found</h2><Link to="/">Back to dashboard</Link></div>;

  return (
    <section className="details-page">
      <Link to="/" className="back-link">← Back to dashboard</Link>
      <div className="details-panel">
        <div className="details-top"><span className="eyebrow">TASK DETAILS</span><TaskStatus status={task.status} /></div>
        <h1>{task.title}</h1>
        <p className="details-description">{task.description || 'No description added.'}</p>
        <div className="details-grid">
          <div><span>Priority</span><strong>{task.priority}</strong></div>
          <div><span>Due date</span><strong>{formatDate(task.dueDate)}</strong></div>
          <div><span>Status</span><strong>{task.status}</strong></div>
          <div><span>Created</span><strong>{formatCreated(task.createdAt)}</strong></div>
        </div>
        <div className="details-actions"><Link className="button button-primary" to={`/tasks/${task.id}/edit`}>Edit task</Link><Link className="button button-outline" to="/">Back to tasks</Link></div>
      </div>
    </section>
  );
}

function formatDate(value) {
  if (!value) return 'Not set';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(date);
}
function formatCreated(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(date);
}
