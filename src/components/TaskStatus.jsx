const statusClass = {
  'Pending': 'pending',
  'In Progress': 'progress',
  'Completed': 'completed'
};

export default function TaskStatus({ status }) {
  return <span className={`status-pill ${statusClass[status] || 'pending'}`}><span className="status-dot" />{status}</span>;
}
