import { useState } from 'react';

const emptyTask = { title: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' };

export default function TaskForm({ initialValues = emptyTask, onSubmit, submitLabel = 'Create task' }) {
  const [values, setValues] = useState({ ...emptyTask, ...initialValues });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function change(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!values.title.trim()) nextErrors.title = 'Enter a task title.';
    else if (values.title.trim().length < 3) nextErrors.title = 'Use at least 3 characters.';
    if (values.dueDate && values.dueDate < '2000-01-01') nextErrors.dueDate = 'Choose a valid due date.';
    setErrors(nextErrors);
    setSubmitError('');
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      await onSubmit({ ...values, title: values.title.trim(), description: values.description.trim() });
    } catch (error) {
      setSubmitError(error.message || 'Could not save this task. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="task-form" onSubmit={submit} noValidate>
      <div className="form-field">
        <label htmlFor="title">Task title <span className="required">*</span></label>
        <input id="title" name="title" value={values.title} onChange={change} placeholder="e.g. Prepare sprint demo" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} autoFocus />
        {errors.title && <span className="field-error" id="title-error">{errors.title}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="description">Description <span className="optional">(optional)</span></label>
        <textarea id="description" name="description" value={values.description} onChange={change} placeholder="Add details or next steps..." rows="4" />
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={values.priority} onChange={change}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={values.status} onChange={change}>
            <option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="dueDate">Due date <span className="optional">(optional)</span></label>
        <input id="dueDate" type="date" name="dueDate" value={values.dueDate} onChange={change} aria-invalid={Boolean(errors.dueDate)} />
        {errors.dueDate && <span className="field-error">{errors.dueDate}</span>}
      </div>
      {submitError && <div className="form-alert" role="alert">{submitError}</div>}
      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  );
}
