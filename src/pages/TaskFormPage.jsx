import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../state/TaskContext';
import TaskForm from '../components/TaskForm';

export default function TaskFormPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, error, createTask, updateTask } = useTasks();
  const isEditing = Boolean(taskId);
  const task = tasks.find((item) => String(item.id) === String(taskId));

  async function handleSubmit(values) {
    if (isEditing) await updateTask(taskId, values);
    else await createTask(values);
    navigate('/');
  }

  if (loading && isEditing) return <div className="page-loading">Loading task details…</div>;
  if (error) return <div className="form-page"><Link to="/" className="back-link">← Back to dashboard</Link><div className="form-panel"><h2>Task API unavailable</h2><p>Start the API server and return to this page.</p></div></div>;
  if (isEditing && !task) return <div className="form-page"><Link to="/" className="back-link">← Back to dashboard</Link><div className="form-panel"><h2>Task not found</h2><p>This task may have been deleted.</p></div></div>;

  return (
    <section className="form-page">
      <Link to="/" className="back-link">← Back to dashboard</Link>
      <div className="form-intro"><p className="eyebrow">{isEditing ? 'UPDATE TASK' : 'MAKE IT HAPPEN'}</p><h1>{isEditing ? 'Edit task' : 'Create a task'}<span className="heading-period">.</span></h1><p>{isEditing ? 'Make changes and keep the details up to date.' : 'Break your next step into something clear and actionable.'}</p></div>
      <div className="form-panel">
        <div className="form-panel-heading"><div><h2>Task details</h2><p>Fields marked with * are required.</p></div><span className="form-step">01 <span>/ 01</span></span></div>
        <TaskForm key={task?.id || 'new'} initialValues={task || undefined} onSubmit={handleSubmit} submitLabel={isEditing ? 'Save changes' : 'Create task'} />
      </div>
    </section>
  );
}
