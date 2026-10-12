import { Link } from 'react-router-dom';
import TaskStatus from './TaskStatus';

export default function TaskCard({ task, onDelete }) {
  return (
    <article className="task-card">
      <div className="task-card-main">
        <div className="task-title-line">
          <h3><Link to={`/tasks/${task.id}`}>{task.title}</Link></h3>
          <TaskStatus status={task.status} />
        </div>
        <p className="task-description">{task.description || 'No description added.'}</p>
        <div className="task-meta">
          <span className={`priority priority-${task.priority.toLowerCase()}`}><span className="priority-dot" />{task.priority} priority</span>
          <span className="meta-item"><span aria-hidden="true">◷</span> Due {formatDate(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-actions">
        <Link className="icon-button" to={`/tasks/${task.id}/edit`} aria-label={`Edit ${task.title}`} title="Edit task">✎</Link>
        <button className="icon-button danger-hover" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} title="Delete task">⌫</button>
      </div>
    </article>
  );
}

function formatDate(value) {
  if (!value) return 'No date';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}
